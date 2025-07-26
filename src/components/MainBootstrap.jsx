import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col xs={12} md={4} lg={4}>
          <Image
            src="https://images.unsplash.com/photo-1660721671073-e139688fa3cf?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
