// Función para reiniciar el carrito, reseteando los estados a sus valores iniciales
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type ArticuloCarrito = {
  id: number;
  titulo: string;
  cantidad: number;
  precio: number;
};



export const reiniciarCarrito = (
  setArticulosCarrito: SetState<ArticuloCarrito[]>, // Actualiza el carrito
  setTotal: SetState<number>, // Actualiza el total
  setMostrarCarrito: SetState<boolean>, // Muestra u oculta el carrito
  setReiniciarTarjetas: SetState<boolean> // Resetea las tarjetas
) => {
  setArticulosCarrito([]); // Limpiamos el carrito
  setTotal(0); // Reiniciamos el total
  setMostrarCarrito(false); // Ocultamos el carrito
  setReiniciarTarjetas(true); // Restablezco las tarjetas
};