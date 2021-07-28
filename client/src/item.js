import { useState, useEffect } from "react";
import axios from "axios";

function Item({ item, deleteItem }) {
  let [data, setData] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
  });
  useEffect(() => {
    setData({
      id: item.id,
      title: item.title,
      description: item.description,
    });
  }, [item]);
  let handleDescription = (e) => {
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  let handleSubmit = () => {
    axios.post(
      "http://localhost:4000/api/updateItem",
      {
        data,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };
  return (
    <div
      key={item.id}
      style={{
        minHeight: 100,
        width: 300,
        border: `2px solid`,
        marginBottom: 20,
      }}
    >
      <button
        style={{ fontSize: 10, float: "left" }}
        onClick={() => deleteItem(item.id)}
      >
        удалить
      </button>
      <input
        type="text"
        name="title"
        value={data.title}
        onChange={handleDescription}
      ></input>
      <button style={{ fontSize: 10, float: "right" }} onClick={handleSubmit}>
        Изменить
      </button>
      <hr />
      <textarea
        name="description"
        value={data.description}
        onChange={handleDescription}
      />
    </div>
  );
}

export default Item;
