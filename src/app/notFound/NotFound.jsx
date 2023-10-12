import { Link } from "react-router-dom";
import "./style.scss";
import notFound from "../../assets/extras/404.png";
import { useEffect } from "react";

export default function NotFound() {
  const adjustImageSize = () => {
    const img = document.getElementById("not-found-image");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    img.style.maxWidth = `${windowWidth}px`;
    img.style.maxHeight = `${windowHeight}px`;
  };

  useEffect(() => {
    adjustImageSize();
    window.addEventListener("resize", adjustImageSize);
    return () => {
      window.removeEventListener("resize", adjustImageSize);
    };
  }, []);

  return (
    <main>
      <div className="container-404">
        <img
          id="not-found-image"
          className="not-found-image"
          src={notFound}
          alt="not found image"
        />
        <Link className="floating-button" to="/">
          VOLVER
        </Link>
      </div>
    </main>
  );
}
