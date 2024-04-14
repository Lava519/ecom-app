import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Products.css"

export default function Products() {
  const [products, setProducts] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:3000/product/products', {
          method: "get",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
        if (res.status === 200) {
          const data = await res.json();
          if (data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, [])

  const navProduct = (product) => {
    nav(`/product/${product.ProductID}`,{state:{product: product}});
  }

  return (
    <div className="products-container">
      { products && 
        products.map( (product) => {
          return (
          <section className="product" onClick={()=>navProduct(product)} key={product.ProductID}>
            <div className="product-image-container">
              <img className="product-image" src={product.Image} />
            </div>
            <h2 className="product-name">{product.Name}</h2>
            <h2 className="product-price">{`${product.Price}$`}</h2>
          </section>)
        })
      }
    </div>
  )
} 
