import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "../../../lib/axios";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  useEffect(() => {
    axios
      .get("/api/v1/categories")
      .then((res) => {
        if (res.status === 200) {
          const categoriesWithCheck = res.data.categories.map((category) => ({
            ...category,
            isChecked: false,
          }));
          setCategories(categoriesWithCheck);
        }
      })
      .catch((err) => {});
  }, []);
  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
  };
  const handleCheckAllChange = () => {
    const newStatus = !isAllChecked;
    setIsAllChecked(newStatus);
    const updatedData = categories.map((item) => ({
      ...item,
      isChecked: newStatus,
    }));
    setCategories(updatedData);
  };
  const handleChecked = (id) => {
    const updatedData = categories.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setCategories(updatedData);
    // check check all status after update again
    const allChecked = updatedData.every((item) => item.isChecked);
    setIsAllChecked(allChecked);
  };
  const handleChangeStatus = (id, e) => {
    const model = e.target.dataset.model;
    const updateStatus = categories.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setCategories(updateStatus);
    axios
      .post(`/api/v1/category-update-status/${id}`)
      .then((res) => {
        if(res.status===200){
          
        }
      })
      .catch((err) => {});
  };
  return (
    <div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                name="check_all"
                checked={isAllChecked}
                onChange={handleCheckAllChange}
              />
            </th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Slug</th>
            <th scope="col">Meta Title</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 &&
            categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">
                  <input
                    type="checkbox"
                    name="check"
                    data-id={category.id}
                    data-model="category"
                    onChange={() => handleChecked(category.id)}
                    checked={category.isChecked}
                  />
                </th>
                <td>
                  <img
                    className="thumbnail_img"
                    src={`http://localhost:8000${
                      JSON.parse(category.image)[0]
                    }`}
                    alt=""
                  />
                </td>
                <td>{category.name}</td>
                <td>{category.slug}</td>
                <td>{category.meta_title}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="status"
                      data-id={category.id}
                      data-model="category"
                      // value={category.status}
                      onChange={(e) => handleChangeStatus(category.id, e)}
                      checked={category.status === true ? "checked" : ""}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <Link
                    to={`/admin/category/${category.id}`}
                    className="btn btn-primary mr-1"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={(e) => handleDelete(e, category.id)}
                    className="btn btn-danger"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
