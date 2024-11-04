import logoproducto1 from "../assets/images/image-waffle-desktop.jpg";
import logoproducto2 from "../assets/images/image-creme-brulee-desktop.jpg";
import logoproducto3 from "../assets/images/image-macaron-desktop.jpg";
import logoproducto4 from "../assets/images/image-tiramisu-desktop.jpg";
import logoproducto5 from "../assets/images/image-baklava-desktop.jpg";
import logoproducto6 from "../assets/images/image-meringue-desktop.jpg";
import logoproducto7 from "../assets/images/image-cake-desktop.jpg";
import logoproducto8 from "../assets/images/image-brownie-desktop.jpg";
import logoproducto9 from "../assets/images/image-panna-cotta-desktop.jpg";

import Card from "./Card";
import Cart from "./Cart";

export interface IProductos {
  id: number;
  src: string;
  titulo: string;
  subtitle: string;
  price: number;
  quantity: number;
}
export const productos: IProductos[] = [
  {
    id: 1,
    src: logoproducto1,
    titulo: "Waffle with Berries",
    subtitle: "Waffle",
    price: 6.5,
    quantity: 0,
  },
  {
    id: 2,
    src: logoproducto2,
    titulo: "Vanilla Bean Creme Brulée",
    subtitle: "Creme Brulée",
    price: 7.0,
    quantity: 0,
  },
  {
    id: 3,
    src: logoproducto3,
    titulo: "Macaron Mix of Five",
    subtitle: "Macaron",
    price: 8.0,
    quantity: 0,
  },
  {
    id: 4,
    src: logoproducto4,
    titulo: "Clasicc Tiramisu",
    subtitle: "Tiramisu",
    price: 5.5,
    quantity: 0,
  },
  {
    id: 5,
    src: logoproducto5,
    titulo: "Pistachio Baklava",
    subtitle: "Baklava",
    price: 4.0,
    quantity: 0,
  },
  {
    id: 6,
    src: logoproducto6,
    titulo: "Lemon Meringue Pie",
    subtitle: "Pie",
    price: 5.0,
    quantity: 0,
  },
  {
    id: 7,
    src: logoproducto7,
    titulo: "Red Velvet Cake",
    subtitle: "Cake",
    price: 4.5,
    quantity: 0,
  },
  {
    id: 8,
    src: logoproducto8,
    titulo: "Salted Caramel Brownie",
    subtitle: "Brownie",
    price: 5.5,
    quantity: 0,
  },
  {
    id: 9,
    src: logoproducto9,
    titulo: "Vanilla Panna Cotta",
    subtitle: "Panna Cotta",
    price: 6.5,
    quantity: 0,
  },
];

function ParentComponent() {
  // const [cartItems, setCartItems] = useState<
  //   { id: number; titulo: string; quantity: number; price: number }[]
  // >([]);

  // const [total, setTotal] = useState(0);

  const addToCart = (
    item: { id: number; titulo: string; price: number; amount: number },
    quantity: number
  ) => {
    productos.map((producto) => {
      if (producto.id === item.id) {
        producto.quantity = quantity;

        return producto;
      }
      return producto;
    });
    // setCartItems((prev) => {
    //   const existingItem = prev.find((cartItem) => cartItem.id === item.id);
    //   if (existingItem) {
    //     const newQuantity = existingItem.quantity + quantity;
    //     // Actualiza el total al agregar un artículo existente
    //     setTotal((prevTotal) => (prevTotal += item.price * quantity)); //a chequear;
    //     return prev.map((cartItem) =>
    //       cartItem.id === item.id
    //         ? { ...cartItem, quantity: newQuantity }
    //         : cartItem
    //     );
    //     console.log("prev:", prev);
    //   } else {
    //     // Si es un nuevo artículo, suma al total
    //     setTotal((prevTotal) => prevTotal + item.price * quantity);
    //     return [...prev, { ...item, quantity }];
    //   }
    // });
  };

  return (
    <div className="container">
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-md-3 mb-1">
            <Card
              id={producto.id}
              image={producto.src}
              titulo={producto.titulo}
              subtitle={producto.subtitle}
              price={producto.price !== undefined ? producto.price : 0}
              onAddTocart={(cantidad: number) =>
                addToCart(
                  {
                    id: producto.id,
                    titulo: producto.titulo,
                    price: producto.price,
                    amount: producto.quantity,
                  },
                  cantidad
                )
              }
            />
          </div>
        ))}
      </div>
      <Cart productos={productos} />
    </div>
  );
}

export default ParentComponent;
