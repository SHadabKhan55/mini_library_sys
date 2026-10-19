import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    // Existing category fetch karna
    async function getCategory() {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:7000/api/librarian/categories/${id}`,
                { withCredentials: true }
            );

            setCategory({
                name: res.data.data.name,
                description: res.data.data.description || ""
            });

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Category fetch nahi ho saki."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategory();
    }, [id]);

    // Input fields handle karna
    function handleChange(e) {
        const { name, value } = e.target;

        setCategory({
            ...category,
            [name]: value
        });
    }

    // Category update karna
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.put(
                `http://localhost:7000/api/librarian/categories/${id}`,
                category,
                { withCredentials: true }
            );

            alert(res.data.message || "Category updated successfully!");

            navigate("/lib-dashboard/categories");

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Category update nahi ho saki."
            );
        } finally {
            setLoading(false);
        }
    }

    if (loading && !category.name && !category.description) {
        return <p>Loading category...</p>;
    }

    return (
        <div>
            <h2>Edit Category</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name</label>
                    <br />

                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Description</label>
                    <br />

                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <br />

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Category"}
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
