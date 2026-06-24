export default function Product({ product }) {
  return (
    <div>
      <h2>{product.id} : {product.name}</h2>
      <p>Price : {product.price}</p>
    </div>
  )
}
