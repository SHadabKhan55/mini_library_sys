
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    // Book States
    const [book, setBook] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    // Logout Function
    async function handleLogout() {
        try {

            const res = await axios.post(
                "http://localhost:7000/api/auth/logout",
                {},
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {
                navigate("/login")
            }

        } catch (error) {

            console.log(error?.response?.data?.message)

            alert(
                error?.response?.data?.message || "Logout failed"
            )
        }
    }


    // Get Books API
    async function getBook() {

        try {

            setLoading(true)

            const res = await axios.get(
                `http://localhost:7000/api/librarian/book?page=${page}&search=${encodeURIComponent(search)}`,
                {
                    withCredentials: true
                }
            )

            setBook(res.data.book)
            setTotalPages(res.data.totalPages)

        } catch (error) {

            console.log(error?.response?.data?.message)

            alert(
                error?.response?.data?.message || "Failed to fetch books"
            )

        } finally {

            setLoading(false)

        }
    }


    // Borrow Book API
    async function handleBorrow(bookId) {

        try {

            const res = await axios.post(
                "http://localhost:7000/api/librarian/borrow",
                {
                    bookId
                },
                {
                    withCredentials: true
                }
            )

            alert(res.data.message)

            // Refresh book list after borrowing
            await getBook()

        } catch (error) {

            console.log(error?.response?.data?.message)

            alert(
                error?.response?.data?.message || "Failed to borrow book"
            )
        }
    }


    // Fetch Books when Page or Search Changes
    useEffect(() => {

        getBook()

    }, [page, search])


    return (

        <div>

            {/* Dashboard Header */}

            <button onClick={handleLogout}>
                Logout
            </button>

            <h1>Welcome Student</h1>


            {/* Book Section */}

            <h2>Available Books</h2>


            {/* Search Input */}

            <input
                type="text"
                placeholder="Search book..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
            />


            {/* Books Table */}

            <table border="1" cellPadding="10" cellSpacing="0">

                <thead>

                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    {loading ? (

                        <tr>
                            <td colSpan="7">
                                Loading books...
                            </td>
                        </tr>

                    ) : book.length > 0 ? (

                        book.map((item, index) => (

                            <tr key={item._id}>

                                <td>
                                    {(page - 1) * 5 + index + 1}
                                </td>

                                <td>{item.title}</td>

                                <td>{item.author}</td>

                                <td>{item.price}</td>

                                <td>{item.quantity}</td>

                                <td>
                                    {item.category?.name || "N/A"}
                                </td>

                                <td>

                                    <button
                                        onClick={() => handleBorrow(item._id)}
                                        disabled={item.quantity <= 0}
                                    >
                                        {item.quantity <= 0
                                            ? "Unavailable"
                                            : "Borrow Book"}
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="7">
                                No books found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>


            {/* Pagination */}

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}
            >

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1 || loading}
                >
                    Previous
                </button>


                <span>
                    Page {page} of {totalPages}
                </span>


                <button
                    onClick={() => setPage(page + 1)}
                    disabled={
                        page === totalPages ||
                        loading ||
                        totalPages === 0
                    }
                >
                    Next
                </button>

            </div>

        </div>

    )
}

export default Dashboard
