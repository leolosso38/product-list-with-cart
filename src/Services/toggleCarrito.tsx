
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const toggleCarrito = (setMostrarCarrito: SetState<boolean>) => {
    setMostrarCarrito((prevState) => !prevState); // Alterna entre true y false
};