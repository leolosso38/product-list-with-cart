type OrderProps = {
    articulos: { titulo: string; cantidad: number; precio: number }[];
    total: number;
    reiniciarCarrito: () => void;  // Función para reiniciar el carrito
};

function Order({ articulos, total, reiniciarCarrito }: OrderProps) {
    return (
        <div className="order-container">
            <div className="card shadow-sm">
                <div className="order-header">
                    <h3 >Orden Confirmada</h3>
                </div>
                <div className="order-body">
                    <p>¡Gracias por tu compra!</p>
                    {articulos.map(({ titulo, cantidad, precio }, index) => (
                        <div key={index}>
                            <strong>{titulo}</strong>
                            <p>{cantidad} &times; @{precio.toFixed(2)}</p>
                        </div>
                    ))}
                    <span className="carrito badge bg-secondary rounded-pill">
                        ${total.toFixed(2)}
                    </span>
                </div>
                <button className="btn-cart btn btn-danger btn-sm btn-order" onClick={reiniciarCarrito}>
                    Empezar una nueva orden
                </button>
            </div>
        </div>
    );
}

export default Order;
