import { useEffect, useState } from "react"
import "../styles/Productos.css"
import { useProductosContext } from "../contexts/ProductosContext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import CardProducto from "./Card"
import { FaSearch } from "react-icons/fa";

function ProductosContainer() {
    const { productos, obtenerProductos, filtrarProductos } = useProductosContext();
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        obtenerProductos().then(() => {
            setTimeout(() => {
                setCargando(false);
            }, 2000);
        }).catch(() => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);

    useEffect(() => {
        filtrarProductos(filtro)
    }, [filtro]);

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="loader"></div>
            </div>
        );
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return (
            <Container className="my-4">
                <Helmet>
                    <title>Yolo Ceramics | Mi Tienda</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>

                {/* Input de búsqueda */}
                <div className="input-group mb-4">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                {/* Grilla de productos */}
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {productosActuales.length > 0 ? (
                        productosActuales.map((producto) => (
                            <Col key={producto.id}>
                                <CardProducto producto={producto} />
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No se encontraron productos.</p>
                    )}
                </Row>

                {/* Paginación */}
                <div className="d-flex justify-content-center my-4 flex-wrap">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 mb-2 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </Container>
        )
    }
}

export default ProductosContainer
