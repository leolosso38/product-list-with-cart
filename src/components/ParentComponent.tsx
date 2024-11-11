import { useState } from "react";
import { productos } from "../Productos"; // Asegúrate de que la ruta sea correcta
import Carrito from "./Carrito"; // Asegúrate de que la ruta sea correcta
import Card from "./Card"; // Asegúrate de que la ruta sea correcta

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

  // Función para agregar un artículo al carrito
  const agregarAlCarrito = (
    articulo: { id: number; titulo: string; precio: number },
    cantidad: number
  ) => {
    setArticulosCarrito((prev) => {
      const articuloExistente = prev.find((item) => item.id === articulo.id);

      // Si el artículo ya existe, actualizamos la cantidad y recalculamos el total
      if (articuloExistente) {
        // Actualizamos la cantidad del artículo
        const nuevaCantidad = articuloExistente.cantidad + cantidad;

        // Actualizamos el carrito y recalculamos el total
        const nuevosArticulos = prev.map((item) =>
          item.id === articulo.id ? { ...item, cantidad: nuevaCantidad } : item
        );

        // Recalculamos el total basado en la cantidad de items
        const nuevoTotal = nuevosArticulos.reduce(
          (acumulador, item) => acumulador + item.precio * item.cantidad,
          0
        );
        setTotal(nuevoTotal);

        return nuevosArticulos;
      } else {
        // Si el artículo no existe, lo agregamos al carrito
        const nuevosArticulos = [...prev, { ...articulo, cantidad }];

        // Recalculamos el total en el carrito
        const nuevoTotal =
          prev.reduce(
            (acumulador, item) => acumulador + item.precio * item.cantidad,
            0
          ) +
          articulo.precio * cantidad;

        setTotal(nuevoTotal);

        return nuevosArticulos;
      }
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
