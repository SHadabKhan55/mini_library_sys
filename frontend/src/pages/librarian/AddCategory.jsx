import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    // Fetch categories according to current page
    async function getCategories() {
        try {
            setFetchLoading(true);

            const res = await axios.get(
                `http://localhost:7000/api/librarian/categories?page=${page}`,
                {
                    withCredentials: true
                }
            );

            setCategories(res.data.categories);
            setTotalPages(res.data.totalPages);


        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Categories fetch nahi ho sakin"
            );
        } finally {
            setFetchLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [page]);

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        setCategory({
            ...category,
            [name]: value
        });
    }

    // Add category
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:7000/api/librarian/add-category",
                category,
                {
                    withCredentials: true
                }
            );

            alert(res.data.message);

            setCategory({
                name: "",
                description: ""
            });

            // Newly added category is sorted first by _id
            setPage(1);

            // If already on page 1, useEffect will not run
            if (page === 1) {
                await getCategories();
            }

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Category add nahi ho saki"
            );
        } finally {
            setLoading(false);
        }
    }

    // Delete category
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(
                `http://localhost:7000/api/librarian/categories/${id}`,
                {
                    withCredentials: true
                }
            );

            alert(res.data.message);

            // If last item on a page is deleted, go to previous page
            if (categories.length === 1 && page > 1) {
                setPage(page - 1);
            } else {
                await getCategories();
            }

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Category delete nahi ho saki"
            );
        }
    }

    return (
        <div>
            <h2>Add Category</h2>

            <form onSubmit={handleSubmit}>
                <label>Category Name</label>
                <br />

                <input
                    type="text"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />

                <label>Description</label>
                <br />

                <textarea
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Add Category"}
                </button>
            </form>

            <hr />

            <h2>All Categories</h2>

            {fetchLoading ? (
                <p>Loading categories...</p>
            ) : categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{(page - 1) * 5 + index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description || "N/A"}</td>

                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>

                                        {" "}

                                        <NavLink
                                            to={`/lib-dashboard/edit-categories/${item._id}`}
                                        >
                                            Edit
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <br />

                    <button
                        type="button"
                        disabled={page === 1 || fetchLoading}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    {" "}

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    {" "}

                    <button
                        type="button"
                        disabled={page >= totalPages || fetchLoading}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </>
            )}
        </div>
    );
};

export default AddCategory;
