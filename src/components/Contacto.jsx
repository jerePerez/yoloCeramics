function Contacto() {

    return (
        <div class="container my-5" id="contacto" data-aos="fade-up">
            <h2 class="fw-bold text-dark mb-4 text-center">Contacto</h2>
            <form id="contact-form" action="https://formspree.io/f/meoklrly" method="POST" class="row g-3">
                <div class="col-md-6">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Tu nombre completo"
                        required />
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="email" name="email" placeholder="nombre@ejemplo.com"
                        required />
                </div>
                <div class="col-md-6">
                    <label for="telefono" class="form-label">Celular</label>
                    <input type="tel" class="form-control" id="telefono" name="telefono" placeholder="+54 11 1234 5678" />
                </div>
                <div class="col-12">
                    <label for="mensaje" class="form-label">Mensaje</label>
                    <textarea class="form-control" id="mensaje" name="mensaje" rows="4"
                        placeholder="Contanos cómo podemos ayudarte" required></textarea>
                </div>
                <div class="col-12 text-center">
                    <button type="submit" class="btn btn-danger rounded-pill px-5">Enviar</button>
                </div>
                <div id="form-message" class="mt-3 text-center d-none">
                    <div class="alert alert-success" role="alert">
                        ¡Gracias! Tu mensaje fue enviado correctamente. Nos pondremos en contacto pronto.
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Contacto;