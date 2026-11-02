import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Book = () => {
    const [book, setBook] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    async function getBook() {
        try {
            setLoading(true)

            const res = await axios.get(
                `http://localhost:7000/api/librarian/book?page=${page}&search=${search}`,
                { withCredentials: true }
            )

            setBook(res.data.book)
            setTotalPages(res.data.totalPages)

        } catch (error) {
            console.log(error?.response?.data?.message)
            alert("Failed to fetch books")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBook()
    }, [page, search])

    return (
        <div>
            <NavLink to="/lib-dashboard/add-book">
                <button>Add Book</button>
            </NavLink>

            <h2>Book List</h2>

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

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6">Loading books...</td>
                        </tr>
                    ) : book.length > 0 ? (
                        book.map((item, index) => (
                            <tr key={item._id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.category?.name || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No books found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
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
                    disabled={page === totalPages || loading || totalPages === 0}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Book



// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom'

// const Book = () => {
//     const [book, setBook] = useState([])
//     const [page, setPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(0)
//     const [loading, setLoading] = useState(false)

//     // Search states
//     const [search, setSearch] = useState("")
//     const [debouncedSearch, setDebouncedSearch] = useState("")

//     // Debouncing
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearch(search)
//         }, 1000)
//         return () => clearTimeout(timer)

//     }, [search])

//     // Fetch Books API
//     async function getBook() {
//         try {
//             setLoading(true)

//             const res = await axios.get(
//                 `http://localhost:7000/api/librarian/book?page=${page}&search=${encodeURIComponent(debouncedSearch)}`,
//                 { withCredentials: true }
//             )

//             setBook(res.data.book)
//             setTotalPages(res.data.totalPages)

//         } catch (error) {
//             console.log(error?.response?.data?.message)
//             alert("Failed to fetch books")
//         } finally {
//             setLoading(false)
//         }
//     }

//     // API call when page or debounced search changes
//     useEffect(() => {
//         getBook()
//     }, [page, debouncedSearch])

//     return (
//         <div>
//             <NavLink to="/lib-dashboard/add-book">
//                 <button>Add Book</button>
//             </NavLink>

//             <h2>Book List</h2>

//             {/* Search Input */}
//             <input
//                 type="text"
//                 placeholder="Search book..."
//                 value={search}
//                 onChange={(e) => {
//                     setSearch(e.target.value)
//                     setPage(1)
//                 }}
//             />

//             <table border="1" cellPadding="10" cellSpacing="0">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Title</th>
//                         <th>Author</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Category</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {loading ? (
//                         <tr>
//                             <td colSpan="6">Loading books...</td>
//                         </tr>
//                     ) : book.length > 0 ? (
//                         book.map((item, index) => (
//                             <tr key={item._id}>
//                                 <td>{(page - 1) * 5 + index + 1}</td>
//                                 <td>{item.title}</td>
//                                 <td>{item.author}</td>
//                                 <td>{item.price}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.category?.name || "N/A"}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6">No books found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//             {/* Pagination */}
//             <div style={{
//                 marginTop: "20px",
//                 display: "flex",
//                 gap: "10px",
//                 alignItems: "center"
//             }}>
//                 <button
//                     onClick={() => setPage(page - 1)}
//                     disabled={page === 1 || loading}
//                 >
//                     Previous
//                 </button>

//                 <span>
//                     Page {page} of {totalPages}
//                 </span>

//                 <button
//                     onClick={() => setPage(page + 1)}
//                     disabled={page === totalPages || loading || totalPages === 0}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Book
