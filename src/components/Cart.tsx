// interface CartItem {
//   id: number;
//   titulo: string;
//   quantity: number;
//   price: number;
// }

// interface CartProps {
//   items: CartItem[];
//   total: number;
// }

// function Cart({ items, total }: CartProps) {
//   return (
//     <div className="card mb-3">
//       <div className="card-header">
//         <h2 className="mb-0">Shopping Cart</h2>
//       </div>
//       <div className="card-body">
//         {items.length === 0 ? (
//           <p className="text-center">Your cart is empty</p>
//         ) : (
//           <ul className="list-group">
//             {items.map((item) => (
//               <li
//                 key={item.id}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   <strong>{item.titulo}</strong> - Quantity: {item.quantity}
//                 </div>
//                 <span className="badge bg-primary rounded-pill">
//                   ${item.price * item.quantity}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//         <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import { IProductos } from "./ParentComponent";

function Cart({ productos }: IProductos[]) {
  const productosSelected = productos.filter(
    (producto) => producto.quantity == 0
  );
  return (
    <div className="card mb-3">
      <div className="card-header">
        <h2 className="mb-0">Shopping Cart</h2>
      </div>
      <div className="card-body">
        {productosSelected.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <p>añadido</p>
        )}
      </div>
      {/* <div className="card-body">
        {productos.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <ul className="list-group">
            {productos.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.titulo}</strong> - Quantity: {item.quantity}
                </div>
                <span className="badge bg-primary rounded-pill">
                  ${item.price * item.quantity}{" "}
                </span>
              </li>
            ))}
          </ul>
        )}
        <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>{" "}
      </div> */}
    </div>
  );
}

export default Cart;
