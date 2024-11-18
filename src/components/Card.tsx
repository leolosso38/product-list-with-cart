import { useState, useEffect } from "react";

// Definimos la interfaz para las props que recibirá el componente Card
interface CardProps {
  imagen: string; // Ruta de la imagen del producto
  titulo: string; // Título del producto
  subtitulo: string; // Subtítulo o descripción corta del producto
  precio: number; // Precio del producto
  reiniciar: boolean;
  onAddToCart: (cantidad: number) => void; // Callback para manejar la cantidad del artículo en el carrito
}

function Card({ imagen, titulo, subtitulo, precio, onAddToCart, reiniciar }: CardProps) {
  // Estado para verificar si el producto está en el carrito
  const [enCarrito, setEnCarrito] = useState(false);
  // Estado para gestionar la cantidad de producto que se va a agregar al carrito



  const [cantidad, setCantidad] = useState(1);
  useEffect(() => {
    if (reiniciar) {
      setEnCarrito(false);
      setCantidad(1);
    }
  }, [reiniciar]);
  // Función que se ejecuta cuando el usuario agrega el artículo al carrito
  const agregarAlCarrito = () => {
    setEnCarrito(true); // Marcamos que el producto está en el carrito
    onAddToCart(1); // Llamamos al callback con la cantidad 1 para agregar el artículo al carrito
  };

  // Función para incrementar la cantidad de artículos del producto
  const incrementar = () => {
    setCantidad(cantidad + 1); // Aumentamos la cantidad en 1
    onAddToCart(cantidad + 1); // Llamamos al callback con la nueva cantidad
  };

  // Función para disminuir la cantidad de artículos del producto
  const disminuir = () => {
    // Aseguramos que la cantidad no sea menor a 1
    const nuevaCantidad = Math.max(cantidad - 1, 1);
    setCantidad(nuevaCantidad); // Actualizamos el estado de la cantidad
    onAddToCart(nuevaCantidad); // Llamamos al callback con la nueva cantidad

    // Si la cantidad llega a 1, quitamos el producto del carrito
    if (nuevaCantidad === 1) {
      setEnCarrito(false); // Marcamos que ya no está en el carrito
      onAddToCart(0); // Llamamos al callback con 0 para quitar el producto del carrito
    }
  };


  return (
    <div className="card">
      {/* Mostramos la imagen del producto */}
      <img className="card-imagen" src={imagen} alt="producto" />

      {/* Si el producto está en el carrito, mostramos los botones para incrementar o disminuir la cantidad */}
      {enCarrito ? (
        <div className="card-botones">
          {/* Botón para disminuir la cantidad */}
          <button
            className="btn-cart-decremento btn btn-outline-danger btn-sm"
            onClick={disminuir}
          >
            -
          </button>
          {/* Muestra la cantidad actual del producto */}
          <span className="cantidad">{cantidad}</span>
          {/* Botón para incrementar la cantidad */}
          <button
            className="btn-cart-incremento btn btn-outline-danger btn-sm"
            onClick={incrementar}
          >
            +
          </button>
        </div>
      ) : (
        // Si el producto no está en el carrito, mostramos el botón para agregarlo
        <button
          className="btn-cart btn btn-danger btn-sm"
          onClick={agregarAlCarrito}
        >
          Agregar al Carrito
        </button>
      )}

      {/* Información adicional del producto */}
      <div className="card-body">
        <h5 className="card-subtitulo">{subtitulo}</h5>
        <h5 className="card-titulo">{titulo}</h5>
        <h5 className="card-precio">$ {precio.toFixed(2)}</h5>
      </div>
    </div>
  );
}

export default Card;