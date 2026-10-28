
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

const AddBook = () => {
    const navigate = useNavigate()

    const [book, setBook] = useState({
        title: "",
        author: "",
        price: "",
        quantity: "",
        category: "",
    })

    const [categories, setCategories] = useState([])

    async function getCategories() {
        try {
            const res = await axios.get(
                "http://localhost:7000/api/librarian/categories?limit=all",
                { withCredentials: true }
            )

            setCategories(res.data.categories)
        } catch (error) {
            console.log(error?.response?.data?.message)
            alert("Failed to fetch categories")
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    function handleChange(e) {
        const { name, value } = e.target

        setBook({
            ...book,
            [name]: value
        })
    }
    function handleSelectCategory(e) {
        setBook({
            ...book,
            category:e ? e.value : ""
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await axios.post(
                "http://localhost:7000/api/librarian/add-book",
                {
                    ...book,
                    price: Number(book.price),
                    quantity: Number(book.quantity)
                },
                { withCredentials: true }
            )

            navigate("/lib-dashboard/book")

        } catch (error) {
            console.log(error?.response?.data?.message)
            alert(error?.response?.data?.message || "Failed to add book")
        }
    }

    const categoryOptions = categories.map((category) => ({
        value: category._id,
        label: category.name
    }))
console.log(categoryOptions)
    return (
        <div>
            <h2>Add Book</h2>

            <form onSubmit={handleSubmit}>
                <label>Title</label><br />
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Author</label><br />
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                />
                <br />

                <label>Price</label><br />
                <input
                    type="number"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <br />

                <label>Quantity</label><br />
                <input
                    type="number"
                    name="quantity"
                    value={book.quantity}
                    onChange={handleChange}
                    min="0"
                    required
                />
                <br />

                <label>Category</label><br />

                <Select
                options={categoryOptions}
                placeholder="Search or select category..."
                isClearable={true}
                onChange={handleSelectCategory}
                value={categoryOptions.find(opt => opt.value === book.category) || null}
                />

                <br />

                <button type="submit" disabled={!book.category}>
                    Add Book
                </button>
            </form>
        </div>
    )
}

export default AddBook
