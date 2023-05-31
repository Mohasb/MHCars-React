import "./style.scss";
import { Link } from "react-router-dom";
import Apple from "../../assets/apple.webp";
import Google from "../../assets/google.webp";
export default function Footer() {
  return (
    <footer className="hero">
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <div className="container flex">
        <div className="container__about">
          <h2>About</h2>
          <p>
            A young software developer, starting his professional life, learning
            the most used languages in this industry, Java, .Net, HTML, CSS and
            JAVASCRIPT.
          </p>
        </div>
        {/* <div className="container-pages flex">
          <div className="container__recentpages">
            <h2>Recient Pages</h2>
            <ul>
              <li>
                <a href="https://brayancountries.netlify.app">Countries</a>
              </li>
              <li>
                <a href="https://portfolio-brayan.netlify.app/">Portfolio</a>
              </li>
              <li>
                <a href="https://cartagena-cooks.netlify.app/">
                  Cartagena-cooks
                </a>
              </li>
              <li>
                <a href="https://work-company.netlify.app/">Work-company</a>
              </li>
            </ul>
          </div>
          <div className="container__more">
            <h2>Recient Pages</h2>
            <ul>
              <li>
                <a href="https://challenge2-bom.netlify.app/">Challenge2</a>
              </li>
              <li>
                <a href="https://challenge3-brayanom.netlify.app/">
                  Challenge3
                </a>
              </li>
              <li>
                <a href="https://dev4-brayanom.netlify.app/">Challenge4</a>
              </li>
              <li>
                <a href="https://cv-brayanom.netlify.app/">Curriculum</a>
              </li>
              <li>
                <a href="https://mentor1-brayanom.netlify.app/">Mentor1</a>
              </li>
            </ul>
          </div>
        </div> */}
        {/* <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Descarga nuestra aplicación </h3>
            <p> Alquiler de calidad a buen precio </p>
            <div className="flex justify-center my-10">
              <Link to={"https://play.google.com/store/games?hl=es_419&gl=US"}>
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
                  <img src={Google} className="w-7 md:w-8" />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Descargar en </p>
                    <p className="text-sm text-gray-200"> Google Play Store </p>
                  </div>
                </div>
              </Link>
              <Link to={"https://www.apple.com/es/store"}>
                <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
                  <img src={Apple} className="w-7 md:w-8" />
                  <div className="text-left ml-3">
                    <p className="text-xs text-gray-200">Descargar en</p>
                    <p className="text-sm text-gray-200">Apple Store</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy; Beautiful Footer, 2021.{" "}
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div> */}
        <div className="mobile">
          <div className=" border rounded">
            <Link to={"https://play.google.com/store/games?hl=es_419&gl=US"}>
              <div className="d-flex">
                <div className="">
                  {" "}
                  <img src={Google} />
                </div>
                <div className="">
                  <p>Descargar en </p>
                  <p> Google Store </p>
                </div>
              </div>
            </Link>
          </div>
          <div className=" border rounded">
            <Link to={"https://www.apple.com/es/store"}>
              <img src={Apple} />
              <p>Descargar en</p>
              <p>Apple Store</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="line__separete"></div>
      <div className="by flex">
        <p>Copyright © 2022 All Rights Reserved by Muhammad Hicho.</p>
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
      </div>
    </footer>
  );
}
