import { useState } from 'react';

export default function Post() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);

  async function postProduct() {
  }

  const handleSubmit = () => {
    postProduct();
  }
  const handleFileInput = (e) => {
  }
  const handleNameInput = (e) => {
    setName(e.target.value);
  }
  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  }
  const handlePriceInput = (e) => {
    setPrice(e.target.value);
    console.log(image)
  }
  return (
    <div>
      <h2>Submit product</h2>
      <p>Insert product image</p>
      <input onDrop={handleFileInput} onChange={handleFileInput} type="file" accept="image/jpg" />
      <p>Insert product name</p>
      <input type="text" onChange={handleNameInput} />
      <p>Insert product description</p>
      <input type="text" onChange={handleDescriptionInput} />
      <p>Insert product price</p>
      <input type="text" onChange={handlePriceInput} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
