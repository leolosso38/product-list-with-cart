
import { useState } from "react";
import { productos } from "../Data/Productos";
import Carrito from "./Carrito";
import Card from "./Card";
import Order from "./Order";
import { reiniciarCarrito } from "../Services/reiniciarCarrito"
import { toggleCarrito } from "../Services/toggleCarrito";
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
  const [reiniciarTarjetas, setReiniciarTarjetas] = useState(false);



  // Función para agregar un artículo al carrito

  const agregarAlCarrito = (articulo: { id: number; titulo: string; precio: number }, cantidad: number) => {
    setArticulosCarrito((prev) => {
      const articuloExistente = prev.find((item) => item.id === articulo.id); // Buscamos si el artículo ya existe en el carrito

      if (articuloExistente) {
        // Si la cantidad es 0 o menos, eliminamos el artículo
        if (cantidad <= 0) {
          return prev.filter((item) => item.id !== articulo.id); // Eliminamos el artículo si la cantidad es 0 o negativa
        } else {
          // De lo contrario, actualizamos la cantidad
          articuloExistente.cantidad = cantidad;
        }
      } else if (cantidad > 0) {
        // Si el artículo no está en el carrito y la cantidad es mayor que 0, lo agregamos
        prev.push({ ...articulo, cantidad });
      }

      // Recalcular el total
      const nuevoTotal = recalcularTotal(prev); // Llamamos a la función para recalcular el total
      setTotal(nuevoTotal); // Actualizamos el total con el nuevo valor

      return [...prev]; // Retornamos el carrito actualizado
    });
  };

  // Función para eliminar un artículo del carrito
  const eliminarDelCarrito = (id: number) => {
    setArticulosCarrito((prev) => {
      const articulosActualizados = prev.filter((articuloCarrito) => articuloCarrito.id !== id); // Filtramos el carrito para eliminar el artículo por su id
      const nuevoTotal = recalcularTotal(articulosActualizados); // Recalculamos el total después de la eliminación
      setTotal(nuevoTotal); // Actualizamos el total
      return articulosActualizados; // Retornamos el carrito actualizado
    });
  };

  // Función para recalcular el total
  const recalcularTotal = (articulos: ArticuloCarrito[]): number => {
    // Sumamos el precio de todos los artículos en el carrito multiplicado por su cantidad
    return articulos.reduce((acumulador, articulo) => acumulador + articulo.precio * articulo.cantidad, 0);
  };



  return (
    <div className="container">
      {/* Renderizamos el carrito de compras, pasando los artículos, total, y la función para eliminar */}
      <Carrito
        articulos={articulosCarrito}
        total={total}
        eliminarDelCarrito={eliminarDelCarrito}
        toggleCarrito={() => toggleCarrito(setMostrarCarrito)} //importo la funcion
      />

      {/* Renderizamos las tarjetas de productos */}
      <div className="row">
        {productos.map(({ id, src, titulo, subtitle, price }) => (
          <div key={id} className="card-contenedor col-md-3 mb-1">
            <Card
              imagen={src}
              titulo={titulo}
              subtitulo={subtitle}
              precio={price}
              // Al hacer clic en "Agregar al carrito", actualizamos el carrito con la cantidad seleccionada
              onAddToCart={(cantidad: number) => agregarAlCarrito({ id, titulo, precio: price }, cantidad)}
              reiniciar={reiniciarTarjetas}
            />
          </div>
        ))}
      </div>

      {/* Si el estado mostrarCarrito es true, mostramos el componente Order */}
      <div>{mostrarCarrito && <Order
        articulos={articulosCarrito}
        total={total}
        //reiniciarCarrito={reiniciarCarrito} 
        reiniciarCarrito={() => reiniciarCarrito(setArticulosCarrito, setTotal, setMostrarCarrito, setReiniciarTarjetas)}//llamo a la funcion reiniciar carrito
      />}</div>
    </div>
  );
}

export default ParentComponent;
