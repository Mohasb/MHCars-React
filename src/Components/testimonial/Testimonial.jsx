import "./style.scss";
import StarIcon from "@mui/icons-material/Star";

export default function Testimonials() {
  const Stars = () => {
    return (
      <>
        <StarIcon color="primary" />
        <StarIcon color="primary" />
        <StarIcon color="primary" />
        <StarIcon color="primary" />
        <StarIcon color="primary" />
      </>
    );
  };
  return (
    <section className="testimonial text-center">
      <div className="container">
        <div className="heading white-heading">Reseñas</div>
        <div
          id="testimonial4"
          className="carousel slide testimonial4_indicators testimonial4_control_button thumb_scroll_x swipe_x"
          data-bs-ride="carousel"
          data-bs-pause="hover"
          data-bs-interval="10000"
          data-bs-duration="2000"
        >
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <div className="testimonial4_slide">
                <img
                  src="https://i.pravatar.cc/300?img=12"
                  className="img-circle img-responsive"
                />
                <h4>Opinión de Borja Navarro </h4>
                <Stars />
                <p>
                  He alquilado en 2 ocasiones un vehículo. Genial las 2 veces,
                  magnifico estado del vehiculo, transparencia en las
                  condiciones y precios muy competitivos. Ayer alquilé un
                  vehículo a través de mutua, y fue perfecto todo.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial4_slide">
                <img
                  src="https://i.pravatar.cc/300?img=27"
                  className="img-circle img-responsive"
                />
                <h4>Opinión de Andrea Aparicio</h4>
                <Stars />
                <p>
                  Personal servicial en la agencia con habilidades y
                  comportamiento profesional impecable. Nos ofrecieron todas las
                  herramientas y consejos que necesitábamos. Quedamos
                  completamente satisfechos y agradecidos, ¡gracias!
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="testimonial4_slide">
                <img
                  src="https://i.pravatar.cc/300?img=13"
                  className="img-circle img-responsive"
                />
                <h4>Opinión de David Zambrano </h4>
                <Stars />
                <p>
                  Muy buen precio, parecido a otras con malas opiniones
                  publicadas y que se consideran baratas. En mi caso vehículo
                  muy nuevo, con todos los extras, incluido navegador. La
                  atención por parte del personal no pudo ser más rápida y
                  eficiente
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonial4"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonial4"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
