import { useState } from "react"
import "./UploadForm.css";
export default function UploadForm({toggle, userID}) {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState(null);
    const setFile = (e) => {
        console.log(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        }
    }
    const handlePriceInput = (e) => {
        if (e.target.value == null)
          e.target.value = 0;
        e.target.value = e.target.value.replace(/\D/g,'');
        setPrice(Number(e.target.value));
        console.log(description);
    }
    async function upload(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/product/upload", {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authentication': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
                Name: name,
                Description: description,
                Price: price,
                Image: image,
                UserID: userID
            })
          })
    }
    return (
        <div className="upload-form-container">
            <div onClick={toggle} className="overlay"></div>
            <form className="upload-form" onSubmit={upload}>
                <a className="close" onClick={toggle}>X</a>
                <h2 className="title">Upload Product</h2>
                <label className="upload-form-name-title">Name</label>
                <input className="upload-form-name" onChange={(e)=>{setName(e.target.value)}} type="text" />
                <label className="upload-form-description-title">Description</label>
                <textarea className="upload-form-description" onChange={(e)=>{setDescription(e.target.value)}} maxLength="128" rows="8" type="text" />
                <label className="upload-form-price-title">Price</label>
                <input className="upload-form-price" onChange={handlePriceInput} type="text" />
                <label className="upload-form-image-title">Image</label>
                <input className="upload-form-image" onChange={setFile} type="file" accept=".jpg" />
                <button className="upload" type="submit">Upload</button>
            </form>
        </div>

    )
}