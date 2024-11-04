import { useState } from "react";

interface CardProps {
  id: number;
  image: string;
  titulo: string;
  subtitle: string;
  price: number;
  onAddTocart: (cantidad: number) => void;
}

function Card({ id, image, titulo, subtitle, price, onAddTocart }: CardProps) {
  const [inCart, setInCart] = useState(false);
  const [cantidad, setCantidad] = useState(1); // Comienza en 1

  const sumarCarrito = () => {
    setInCart(true);
    setCantidad(1); // Inicializa la cantidad en 1 cuando se agrega al carrito
    onAddTocart(1); // Inicializa la cantidad en el carrito
  };
  // item: { id: number; titulo: string; price: number; amount: number },
  // quantity: number
  const incrementar = () => {
    setCantidad((prev) => {
      const newQuantity = prev + 1;
      console.log("Cantidad Incrementada: ", newQuantity);
      onAddTocart(id, newQuantity);
      return newQuantity;
    });
  };

  const decremento = () => {
    setCantidad((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        console.log("Cantidad Decrementada: ", newQuantity);
        onAddTocart(newQuantity);
        return newQuantity;
      } else {
        setInCart(false);
        onAddTocart(0);
        console.log("Producto Eliminado del Carrito");
        return 1;
      }
    });
  };

  return (
    <div className="card">
      <img className="card-imagen" src={image} alt="producto" />
      {inCart ? (
        <div>
          <button className="btn-cart-decremento" onClick={decremento}>
            -
          </button>
          <span>{cantidad}</span>
          <button className="btn-cart-incremento" onClick={incrementar}>
            +
          </button>
        </div>
      ) : (
        <button className="btn-cart" onClick={sumarCarrito}>
          Add to Cart
        </button>
      )}

      <div className="card-body">
        <h5 className="card-subtitle">{subtitle}</h5>
        <h5 className="card-title">{titulo}</h5>
        <h5 className="card-price">$ {price.toFixed(2)}</h5>
      </div>
    </div>
  );
}

export default Card;
