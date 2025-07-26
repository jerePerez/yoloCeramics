import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col xs={12} md={4} lg={4}>
          <Image
            src="../public/imagenes/llamita.jpg"
            alt="Imagen ilustrativa"
            fluid
            rounded
          />
        </Col>
        <Col xs={12} md={8} lg={8}>
          <h2>Un toque de estilo</h2>
          <p>
            En nuestra tienda, cada pieza cuenta una historia. Nos especializamos en crear productos únicos de cerámica hechos a mano, fusionando tradición y diseño contemporáneo. Cada creación es un reflejo de dedicación, pasión y arte. Explorá nuestra colección y llevá a tu hogar el encanto y la calidez de lo hecho a mano. Descubrí el arte que transforma espacios y conecta con la esencia de la cerámica artesanal.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;
