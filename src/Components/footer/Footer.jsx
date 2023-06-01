import "./style.scss";
import { Link } from "react-router-dom";
import Apple from "../../assets/app-store-badge.png";
import Google from "../../assets/google-play-badge.png";
export default function Footer() {
  return (
    <footer className="hero">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <div className="superior">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="container__about">
              <h2>About</h2>
              <p>
                A young software developer, starting his professional life,
                learning the most used languages in this industry, Java, .Net,
                HTML, CSS and JAVASCRIPT.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h1>Descarga nuestra app</h1>
            <div className="mobile">
              <Link to={"https://play.google.com/store"}>
                <img src={Google} />
              </Link>
              <Link to={"https://www.apple.com/es/store"}>
                <img src={Apple} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="line__separate"></div>
      <div className="inferior">
        <div className="by flex">
          <div className="icons">
            <a
              href="https://www.instagram.com/"
              className="icon1 icon--instagram"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://twitter.com/?lang=es"
              className="icon1 icon--twitter"
            >
              <i className="ri-twitter-line"></i>
            </a>
            <a href="https://es.linkedin.com/" className="icon1 icon--linkedin">
              <i className="ri-linkedin-line"></i>
            </a>
            <a href="https://github.com/" className="icon1 icon--github">
              <i className="ri-github-line"></i>
            </a>
          </div>
          <p>Copyright © 2023 All Rights Reserved by Muhammad Hicho Haidor.</p>
        </div>
      </div>
    </footer>
  );
}
