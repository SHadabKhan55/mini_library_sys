
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBorrows = () => {

    const [borrows, setBorrows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBorrows();
    }, []);

    const fetchBorrows = async () => {
        try {
            const res = await axios.get(
                "http://localhost:7000/api/librarian/get-borrow",
                { withCredentials: true }
            );

            setBorrows(res.data.data);

        } catch (error) {
            setError(
                error.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const borrowedBooks = borrows.filter(
        (item) => item.status === "borrowed"
    );

    const returnedBooks = borrows.filter(
        (item) => item.status === "returned"
    );

    const outstandingFine = borrowedBooks.reduce(
        (total, item) => total + item.fineAmount,
        0
    );

    const totalFine = borrows.reduce(
        (total, item) => total + item.fineAmount,
        0
    );

    const formatDate = (date) => {
        if (!date) return "Not returned";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (loading) {
        return <h3>Loading your books...</h3>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>

            <h2>My Borrowed Books</h2>
            <p>Manage your borrowed books and track your fines.</p>

            <hr />

            {/* Summary */}

            <h3>Borrowing Summary</h3>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Total Books</th>
                        <th>Currently Borrowed</th>
                        <th>Returned Books</th>
                        <th>Outstanding Fine</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{borrows.length}</td>
                        <td>{borrowedBooks.length}</td>
                        <td>{returnedBooks.length}</td>
                        <td>Rs. {outstandingFine}</td>
                    </tr>
                </tbody>
            </table>

            <hr />

            {/* Borrowing History */}

            <h3>Borrowing History</h3>

            <p>Total Records: {borrows.length}</p>

            {borrows.length === 0 ? (

                <p>No borrowed books found.</p>

            ) : (

                <table border="1" cellPadding="10">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                            <th>Actual Return</th>
                            <th>Status</th>
                            <th>Late Days</th>
                            <th>Fine Per Day</th>
                            <th>Fine Amount</th>
                            <th>Remaining Days</th>
                        </tr>
                    </thead>

                    <tbody>

                        {borrows.map((item, index) => (

                            <tr key={item._id}>

                                <td>{index + 1}</td>

                                <td>
                                    {item.book?.title || "Book unavailable"}
                                </td>

                                <td>
                                    {item.book?.author || "Unknown"}
                                </td>

                                <td>
                                    {formatDate(item.borrowDate)}
                                </td>

                                <td>
                                    {formatDate(item.returnDate)}
                                </td>

                                <td>
                                    {formatDate(item.actualReturnDate)}
                                </td>

                                <td>
                                    {item.status}
                                </td>

                                <td>
                                    {item.lateDays} Days
                                </td>

                                <td>
                                    Rs. {item.finePerDay}
                                </td>

                                <td>
                                    Rs. {item.fineAmount}
                                </td>

                                <td>
                                    {item.status === "borrowed"
                                        ? `${item.daysRemaining} Days`
                                        : "-"
                                    }
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

            <hr />

            {/* Fine Summary */}

            <h3>Fine Summary</h3>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Total Fine (All Records)</th>
                        <th>Outstanding Fine</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Rs. {totalFine}</td>
                        <td>Rs. {outstandingFine}</td>
                    </tr>
                </tbody>

            </table>

        </div>
    );
};

export default MyBorrows;
