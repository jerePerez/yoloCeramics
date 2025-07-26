import { Card, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
    function borrarDelCarrito() {
        Swal.fire({
            title: `¿Eliminar "${producto.name}"?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                funcionDisparadora(producto.id);
                Swal.fire("Eliminado", "El producto fue eliminado del carrito.", "success");
            }
        });
    }

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="align-items-center">
                    <Col md={3}>
                        <Card.Img
                            variant="top"
                            src={producto.imagen}
                            style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                        />
                    </Col>
                    <Col md={2}>
                        <Card.Title>{producto.name}</Card.Title>
                        <Card.Text className="text-muted">{producto.description}</Card.Text>
                    </Col>
                    <Col md={1}>
                        <span>Cant: {producto.cantidad}</span>
                    </Col>
                    <Col md={2}>
                        <span>Precio: {producto.price} $</span>
                    </Col>
                    <Col md={2}>
                        <span>Subtotal: {producto.cantidad * producto.price} $</span>
                    </Col>
                    <Col md={2}>
                        <Button variant="danger" onClick={borrarDelCarrito}>
                            X
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default CarritoCardBootstrap;
