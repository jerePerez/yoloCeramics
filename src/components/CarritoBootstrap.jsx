import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";
import Row from 'react-bootstrap/Row';
import Swal from "sweetalert2";

function CarritoBootstrap() {
    const { user } = useContext(AuthContext);
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad,
        0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionDisparadora2() {
        Swal.fire({
            title: '¿Vaciar carrito?',
            text: 'Todos los productos serán eliminados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
                Swal.fire('¡Carrito vaciado!', '', 'success');
            }
        });
    }

    function handleFinalizarCompra() {
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total a pagar: ${total.toFixed(2)} $`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
                Swal.fire('¡Gracias por tu compra!', 'Tu pedido ha sido confirmado.', 'success');
                // Podés redirigir al usuario si querés, por ejemplo:
                // navigate("/gracias");
            }
        });
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Container className="my-4">
            <h2 className="mb-3">Carrito de compras</h2>
            <Button variant="warning" className="mb-4" onClick={funcionDisparadora2}>
                Vaciar carrito
            </Button>
            <Row xs={1} md={1} lg={1} >
                {productosCarrito.length > 0 ? (
                    productosCarrito.map((producto) => (
                        <CarritoCardBootstrap
                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={funcionDisparadora}
                        />
                    ))
                ) : (
                    <p>Carrito vacío</p>
                )}
            </Row>
            {total > 0 && (
                <>
                    <h4 className="mt-4 text-end">Total a pagar: {total.toFixed(2)} $</h4>
                    <div className="text-end mt-3">
                        <Button variant="success" onClick={handleFinalizarCompra}>
                            Finalizar compra
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
}

export default CarritoBootstrap;
