import { useState } from "react";
import { productos } from "./Productos"; // Asegúrate de que la ruta sea correcta
import Carrito from "./Carrito"; // Asegúrate de que la ruta sea correcta
import Card from "./Card"; // Asegúrate de que la ruta sea correcta

// Definición de la interfaz para los artículos del carrito
interface ArticuloCarrito {
  id: number;
  titulo: string;
  cantidad: number;
  precio: number;
}

function ComponentePrincipal() {
  const [articulosCarrito, setArticulosCarrito] = useState<ArticuloCarrito[]>(
    []
  );
  const [total, setTotal] = useState<number>(0); // Total inicializado a 0

  // Función para agregar un artículo al carrito
  const agregarAlCarrito = (
    articulo: { id: number; titulo: string; precio: number },
    cantidad: number
  ) => {
    setArticulosCarrito((prev) => {
      // Verificar si el artículo ya está en el carrito
      const articuloExistente = prev.find((item) => item.id === articulo.id);
      const nuevaCantidad = articuloExistente
        ? articuloExistente.cantidad + cantidad
        : cantidad;

      // Calcular el nuevo total correctamente
      const nuevoTotal = prev.reduce(
        (acumulador, articuloCarrito) =>
          acumulador + articuloCarrito.precio * articuloCarrito.cantidad,
        0
      );
      setTotal(nuevoTotal);

      // Si el artículo ya está en el carrito, actualizar la cantidad
      if (articuloExistente) {
        return prev.map((item) =>
          item.id === articulo.id ? { ...item, cantidad: nuevaCantidad } : item
        );
      } else {
        // Si no está, agregarlo al carrito
        return [...prev, { ...articulo, cantidad: nuevaCantidad }];
      }
    });
  };

  // Función para eliminar un artículo del carrito
  const eliminarDelCarrito = (id: number) => {
    setArticulosCarrito((prev) => {
      const articulosActualizados = prev.filter(
        (articuloCarrito) => articuloCarrito.id !== id
      );

      // Recalcular el total basado en los artículos restantes
      const nuevoTotal = articulosActualizados.reduce(
        (acumulador, articulo) =>
          acumulador + articulo.precio * articulo.cantidad,
        0
      );

      setTotal(nuevoTotal);
      return articulosActualizados;
    });
  };

  return (
    <div className="container">
      <Carrito
        articulos={articulosCarrito}
        total={total}
        eliminarDelCarrito={eliminarDelCarrito}
      />
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="card-contenedor col-md-3 mb-1">
            <Card
              imagen={producto.src}
              titulo={producto.titulo}
              subtitulo={producto.subtitle}
              precio={producto.price}
              onAddToCart={(cantidad: number) =>
                agregarAlCarrito(
                  {
                    id: producto.id,
                    titulo: producto.titulo,
                    precio: producto.price,
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

export default ComponentePrincipal;
