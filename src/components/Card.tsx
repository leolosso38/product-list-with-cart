import { useState, useEffect } from "react";

interface ICardProps {
  imagen: string;
  titulo: string;
  subtitulo: string;
  precio: number;
  onAddToCart: (cantidad: number) => void;
}

function Card({ imagen, titulo, subtitulo, precio, onAddToCart }: ICardProps) {
  const [enCarrito, setEnCarrito] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  // Función para agregar al carrito
  const agregarAlCarrito = () => {
    setEnCarrito(true);
    // Llamamos a `onAddToCart` fuera del ciclo de renderizado
    onAddToCart(cantidad);
  };

  // Función para incrementar la cantidad
  const incrementar = () => {
    setCantidad((cantidadActual) => {
      const nuevaCantidad = cantidadActual + 1;
      return nuevaCantidad;
    });
  };

  // Función para disminuir la cantidad de la tarjeta
  const disminuir = () => {
    setCantidad((cantidadActual) => {
      const nuevaCantidad = Math.max(cantidadActual - 1, 1);
      return nuevaCantidad;
    });
  };

  // Llamamos a `onAddToCart` solo cuando la cantidad cambie
  useEffect(() => {
    if (enCarrito) {
      onAddToCart(cantidad); // Actualiza el carrito con la nueva cantidad
    }
  }, [cantidad, enCarrito]); // Se ejecuta cuando `cantidad` cambie

  return (
    <div className="card">
      <img className="card-imagen" src={imagen} alt="producto" />
      {enCarrito ? (
        <div className="card-botones">
          <button className="btn-cart-decremento" onClick={disminuir}>
            -
          </button>
          <span>{cantidad}</span>
          <button className="btn-cart-incremento" onClick={incrementar}>
            +
          </button>
        </div>
      ) : (
        <button className="btn-cart" onClick={agregarAlCarrito}>
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
