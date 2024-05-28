import { useState } from "react"
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
        <div>
            <div></div>
            <form onSubmit={upload}>
                <a onClick={toggle}>Close</a>
                <h2>Upload Product</h2>
                <label>Name</label>
                <input onChange={(e)=>{setName(e.target.value)}} type="text" />
                <label>Description</label>
                <input onChange={(e)=>{setDescription(e.target.value)}} type="text" />
                <label>Price</label>
                <input onChange={handlePriceInput} type="text" />
                <label>Image</label>
                <input onChange={setFile} type="file" accept=".jpg" />
                <button type="submit">Upload</button>
            </form>
        </div>

    )
}