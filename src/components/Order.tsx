// Order.tsx


function Order() {
    return (
        <div className="order-container mt-3">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h3>Orden Confirmada</h3>
                </div>
                <div className="card-body">
                    <p>¡Gracias por tu compra!</p>
                    <p>Los detalles de tu orden han sido enviados.</p>
                </div>
            </div>
        </div>
    );
}

export default Order;  // Esto es importante para exportar el componente
