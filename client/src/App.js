import { useState, useEffect } from "react";
import Sections from "./sections";
import Footer from "./Footer";
import Item from "./item";
import axios from "axios";
import "./App.css";

function App() {
  const [category, setCategory] = useState([]);
  const [product, setProducts] = useState([]);

  const [value, setValue] = useState(1);

  let handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((result) => {
        setCategory(result.data);
        setValue(result.data[0].id);
      })
      .then(() => {});
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/api/products",
        {
          value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setProducts(res.data);
      });
  }, [value]);

  let deleteItem = (id) => {
    axios
      .post("http://localhost:4000/api/deleteItem", {
        id,
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <select
        style={{ width: 100, height: 30, marginTop: 100 }}
        onChange={handleChange}
        value={value}
      >
        <Sections categories={category} />
      </select>
      <header className="App-header">
        <div style={{ marginTop: 100 }}>
          {product.map((item) => {
            return <Item item={item} deleteItem={deleteItem} />;
          })}
        </div>
      </header>
      <Footer categories={category} />
    </div>
  );
}

export default App;
