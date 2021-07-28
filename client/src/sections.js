function Sections({ categories }) {
  return (
    <>
      {categories.map((item) => {
        return (
          <option value={item.id} key={item.id}>
            {item.title}
          </option>
        );
      })}
    </>
  );
}
export default Sections;
