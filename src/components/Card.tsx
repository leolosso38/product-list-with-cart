import { useState } from "react";

interface CardProps {
  imagen: string;
  titulo: string;
  subtitulo: string;
  precio: number;
  onAddToCart: (cantidad: number) => void;
}

function Card({ imagen, titulo, subtitulo, precio, onAddToCart }: CardProps) {
  const [enCarrito, setEnCarrito] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  // Función para agregar al carrito
  const agregarAlCarrito = () => {
    setEnCarrito(true);
    onAddToCart(1);
    // Llamada al callback para agregar al carrito
  };

  // Función para incrementar la cantidad
  const incrementar = () => {
    setCantidad((cantidad) => {
      const nuevaCantidad = cantidad + 1;


      return nuevaCantidad;
    });
    onAddToCart(cantidad + 1);
    // Llamamos a `onAddToCart` fuera de `setCantidad`
  };

  // Función para disminuir la cantidad de la tarjeta
  const disminuir = () => {
    setCantidad((cantidad) => {
      const nuevaCantidad = Math.max(cantidad - 1, 1);

      return nuevaCantidad;
    });
    onAddToCart(cantidad - 1);
    // Llamamos a `onAddToCart` fuera de `setCantidad`
    if (cantidad <= 1) {
      setEnCarrito(false);
      onAddToCart(0)


    }
    else {

      onAddToCart(cantidad - 2);
    }
  };

  return (
    <div className="card">
      <img className="card-imagen" src={imagen} alt="producto" />
      {enCarrito ? (
        <div className="card-botones">
          <button
            className="btn-cart-decremento btn btn-outline-danger btn-sm"
            onClick={disminuir}
          >
            -
          </button>
          <span className="cantidad">{cantidad}</span>
          <button
            className="btn-cart-incremento btn btn-outline-danger btn-sm"
            onClick={incrementar}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="btn-cart  btn btn-danger btn-sm"
          onClick={agregarAlCarrito}
        >
          Agregar al Carrito
        </button>
      )}

      <div className="card-body">
        <h5 className="card-subtitulo">{subtitulo}</h5>
        <h5 className="card-titulo">{titulo}</h5>
        <h5 className="card-precio">$ {precio.toFixed(2)}</h5>
      </div>
    </div>
  );
}

export default Card;
