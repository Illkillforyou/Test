import { useEffect, useState } from "react";
import axios from "axios";

function Category({ item, handleRemoveCategory }) {
  let [value, setValue] = useState(null);
  let handleCategoryChanger = (e) => {
    axios.post(
      "http://localhost:4000/api/updateCategory",
      {
        id: item.id,
        title: value,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    e.preventDefault();
  };
  useEffect(() => {
    setValue(item.title);
  }, [item]);
  let changeHandler = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleCategoryChanger}>
        <input value={value} onChange={changeHandler} />
        <input type="submit" value="Изменить" />
        <button type="submit" onClick={() => handleRemoveCategory(item.id)}>
          удалить
        </button>
      </form>
    </div>
  );
}

export default Category;
