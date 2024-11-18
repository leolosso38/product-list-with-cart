import { useState } from "react";
import { productos } from "../Data/Productos";
import Carrito from "./Carrito";
import Card from "./Card";
import Order from "./Order";

// Definición de la interfaz para los artículos del carrito
type ArticuloCarrito = {
  id: number;
  titulo: string;
  cantidad: number;
  precio: number;
};

function ParentComponent() {
  // Estado para artículos en el carrito y el total
  const [articulosCarrito, setArticulosCarrito] = useState<ArticuloCarrito[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Función para manejar el clic del botón y alternar la visibilidad del carrito
  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
    console.log("Confirmar orden");
  };

  // Función para agregar un artículo al carrito
  const carrito = (articulo: { id: number; titulo: string; precio: number }, cantidad: number) => {
    setArticulosCarrito((prev) => {
      const articuloExistente = prev.find((item) => item.id === articulo.id);

      if (articuloExistente) {
        // Actualizamos la cantidad si el artículo ya existe
        articuloExistente.cantidad = cantidad + 1;
      } else {
        // Agregamos el artículo si no existe
        prev.push({ ...articulo, cantidad });
      }

      // Recalcular el total
      const nuevoTotal = recalcularTotal(prev);
      setTotal(nuevoTotal);

      return [...prev];
    });
  };

  // Función para eliminar un artículo del carrito
  const eliminarDelCarrito = (id: number) => {
    setArticulosCarrito((prev) => {
      const articulosActualizados = prev.filter((articuloCarrito) => articuloCarrito.id !== id);
      const nuevoTotal = recalcularTotal(articulosActualizados);
      setTotal(nuevoTotal);
      return articulosActualizados;
    });
  };

  // Función  para recalcular el total
  const recalcularTotal = (articulos: ArticuloCarrito[]): number => {
    return articulos.reduce((acumulador, articulo) => acumulador + articulo.precio * articulo.cantidad, 0);
  };
  const reiniciarCarrito = () => {
    setArticulosCarrito([]);
    setTotal(0);
    setMostrarCarrito(false);
  };
  return (
    <div className="container">
      {/* Renderizamos el carrito de compras */}
      <Carrito
        articulos={articulosCarrito}
        total={total}
        eliminarDelCarrito={eliminarDelCarrito}
        toggleCarrito={toggleCarrito}
      />
      <div className="row">
        {productos.map(({ id, src, titulo, subtitle, price }) => (
          <div key={id} className="card-contenedor col-md-3 mb-1">
            {/* Renderizamos las tarjetas de productos */}
            <Card
              imagen={src}
              titulo={titulo}
              subtitulo={subtitle}
              precio={price}
              onAddToCart={(cantidad: number) => carrito({ id, titulo, precio: price }, cantidad)}
            />
          </div>
        ))}
      </div>
      {/* Mostrar el componente Order si el estado mostrarCarrito es true */}
      <div>{mostrarCarrito && <Order
        articulos={articulosCarrito}
        total={total}
        reiniciarCarrito={reiniciarCarrito}  // Pasamos la función para reiniciar el carrito
      />}</div>
    </div>
  );
}

export default ParentComponent;
