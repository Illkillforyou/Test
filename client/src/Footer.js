import { useState, useEffect } from "react";
import Sections from "./sections";
import Category from "./category";
import axios from "axios";

function Footer({ categories }) {
  const [category, setCategory] = useState(categories);
  const [inputs, setInputs] = useState({ name: "", description: "" });
  const [createCategory, setCreateCategory] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    setCategory(categories);
    setId(categories[0]?.id);
  }, [categories]);

  let handleSubmit = (e) => {
    axios.post(
      "http://localhost:4000/api/addproduct",
      {
        inputs,
        id,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    e.preventDefault();
  };

  let handleCreateCategory = (e) => {
    axios.post(
      "http://localhost:4000/api/addcategory",
      {
        createCategory,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    e.preventDefault();
  };

  let handleInputChange = (event) => {
    let { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  let handleSelect = (e) => {
    setId(e.target.value);
  };
  let handleRemoveCategory = (id) => {
    axios
      .post("http://localhost:4000/api/deleteCategory", {
        id,
      })
      .then(() => {
        setCategory((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="block">
        <div className="editing">
          <div>Создать товар</div>
          <form onSubmit={handleSubmit}>
            <label className="formText">Название</label>
            <input name="name" type="text" onChange={handleInputChange}></input>
            <br />
            <label className="formText">Описание</label>
            <input
              name="description"
              type="text"
              onChange={handleInputChange}
            ></input>
            <br />
            <label className="formText">Категория</label>

            <select onChange={handleSelect} value={id}>
              {<Sections categories={category} />}
            </select>
            <br />
            <input type="submit" value="Создать" />
          </form>
        </div>

        <div className="editing">
          <div>Создать категорию</div>
          <form onSubmit={handleCreateCategory}>
            <label className="formText">Название</label>
            <input
              type="text"
              onChange={(e) => setCreateCategory(e.target.value)}
            ></input>
            <br />
            <input type="submit" value="Создать" />
          </form>
        </div>
        <div className="editing">
          <div>Изменить название категории</div>
          {category.map((item) => {
            return (
              <Category
                item={item}
                handleRemoveCategory={handleRemoveCategory}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
