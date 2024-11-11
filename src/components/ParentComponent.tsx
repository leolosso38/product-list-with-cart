import { useState } from "react";
import { productos } from "../Productos";
import Carrito from "./Carrito";
import Card from "./Card";

// Definición de la interfaz para los artículos del carrito
type ArticuloCarrito = {
  id: number;
  titulo: string;
  cantidad: number;
  precio: number;
};

function ParentComponent() {
  // Estado para almacenar los artículos en el carrito y el total
  const [articulosCarrito, setArticulosCarrito] = useState<ArticuloCarrito[]>(
    []
  ); // Lista de artículos en el carrito
  const [total, setTotal] = useState<number>(0); // Total acumulado de la compra

  const agregarAlCarrito = (
    articulo: { id: number; titulo: string; precio: number },
    cantidad: number
  ) => {
    setArticulosCarrito((prev) => {
      const articuloExistente = prev.find((item) => item.id === articulo.id);

      if (articuloExistente) {
        // Si el artículo ya existe, actualizamos la cantidad
        articuloExistente.cantidad += cantidad;
      } else {
        // Si no existe, lo agregamos al carrito
        prev.push({ ...articulo, cantidad });
      }

      // Recalculamos el total
      const nuevoTotal = prev.reduce(
        (acumulador, item) => acumulador + item.precio * item.cantidad,
        0
      );
      setTotal(nuevoTotal);

      return [...prev];
    });
  };

  // Función para eliminar un artículo del carrito
  const eliminarDelCarrito = (id: number) => {
    setArticulosCarrito((prev) => {
      // Filtramos el artículo que queremos eliminar
      const articulosActualizados = prev.filter(
        (articuloCarrito) => articuloCarrito.id !== id
      );

      // Recalculamos el total basado en los artículos restantes
      const nuevoTotal = articulosActualizados.reduce(
        (acumulador, articulo) =>
          acumulador + articulo.precio * articulo.cantidad,
        0
      );

      setTotal(nuevoTotal); // Actualizamos el total
      return articulosActualizados;
    });
  };

  return (
    <div className="container">
      {/* Renderizamos el carrito de compras */}
      <Carrito
        articulos={articulosCarrito}
        total={total}
        eliminarDelCarrito={eliminarDelCarrito}
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
              onAddToCart={(cantidad: number) =>
                agregarAlCarrito(
                  {
                    id: id,
                    titulo: titulo,
                    precio: price,
                  },
                  cantidad
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParentComponent;
