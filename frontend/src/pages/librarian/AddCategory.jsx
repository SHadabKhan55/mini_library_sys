
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AddCategory = () => {

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({
    name: "",
    description: ""
  });

  // Fetch all categories
  async function getCategories() {
    try {
      setFetchLoading(true);

      const res = await axios.get(
        "http://localhost:7000/api/librarian/categories",
        {
          withCredentials: true
        }
      );

      setCategories(res.data.data);

    } catch (error) {
      console.log(error);

      if (error.response?.status === 404) {
        setCategories([]);
      } else {
        alert(
          error.response?.data?.message ||
          "Categories fetch nahi ho sakin"
        );
      }
    } finally {
      setFetchLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

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

      // Refresh categories after adding
      await getCategories();

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error. Please try again.");
      }
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

      setCategories(
        categories.filter((item) => item._id !== id)
      );

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error. Please try again.");
      }
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
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description || "N/A"}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <NavLink to={`/lib-dashboard/edit-categories/${item._id}`}>
                    <button>
                      Edit
                    </button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default AddCategory;
