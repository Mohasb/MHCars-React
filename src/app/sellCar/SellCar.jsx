import { useEffect, useState } from "react";
import Car from "../../Components/car3d/Car";
import "./style.scss";
import { Button } from "@mui/material";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import SellIcon from "@mui/icons-material/Sell";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ContactModal from "../../Components/modals/ContactModal";
import WebGL from "three/addons/capabilities/WebGL.js";

import intro from "/src/assets/IntroVideo.mp4";

const SellCar = () => {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(false);
  const [noWebgl, setNoWebgl] = useState(false);

  const handleShowRoom = (carGlb) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/show-room", { state: { car: carGlb } });
  };
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  useEffect(() => {
    if (!WebGL.isWebGLAvailable()) {
      setNoWebgl(true);
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById("errorGl").appendChild(warning);
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      {noWebgl ? (
        <div className="errorGl"></div>
      ) : (
        <div className="sell-car">
          <div className="header-sell-car">
            <div className="video-container">
              <video id="background-video" autoPlay controls>
                <source src={intro} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="about">
              <h2 className="title">NUESTROS COCHES</h2>
              <p className="text">
                Somos un concesionario de automóviles de Alta gama situado en
                Benidorm. Todos los coches que vendemos están
                totalmente revisados, no aceptamos vehículos que no pasen
                nuestras exaustivas revisiones, de este modo podemos ofrecerte
                vehículos de calidad y con total tranquilidad.
              </p>
            </div>
          </div>
          <div className="container-3dcars">
            <p className="title">bmw m4 competition coupé</p>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col car">
                <Car model={"m4.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>
                      Equipamientos de diseño y dinamismo de conducción del BMW
                      M4.
                    </p>
                    <p>
                      En el nuevo BMW M4 , todo está diseñado para experimentar
                      el ADN del mundo de la competición sin concesiones en el
                      día a día. El mejor BMW M4 con homologación para circular
                      por la vía pública de todos los tiempos Reducción del peso
                      de hasta 100 kg en comparación con el BMW M4 Competition
                      Coupé Motor de gasolina de 6 cilindros en línea BMW M
                      TwinPower Turbo de 405 kW (551 CV) de elevadas
                      prestaciones Neumáticos Ultra Track específicos para el
                      vehículo Diseño exclusivo
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>405 (551)/6.250</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>650/2.750–5.950</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>3,7</p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.794 / 1.887 / 1.393 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4 </p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("m4.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <p className="title">Chevrolet corvette stingray</p>
            <div className="row row-cols-1 row-cols-md-2 ">
              <div className="col car">
                <Car model={"corvette.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion2"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos2"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion2"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>UNA BESTIA BAJO EL CAPÓ</p>
                    <p>
                      Durante 70 años y ocho generaciones, Chevrolet Corvette ha
                      definido lo que es posible para los automóviles.
                      entusiastas de todo el mundo y ayudó a incorporar muchas
                      nuevas tecnologías automotrices que tomamos por sentado
                      hoy. Pero quizás su mayor contribución ha sido a nuestra
                      psique colectiva. porque cuando se trata de máxima
                      libertad, es difícil superar la euforia de un Corvette,
                      corriendo a lo largo de los puntos líneas blancas hacia lo
                      que sea que esté al otro lado del horizonte. Todo se suma
                      a que Corvette es la placa de identificación de automóvil
                      de pasajeros producida continuamente más larga en historia
                      mundial. Hoy lo celebramos con la magnífica Edición 70
                      Aniversario, así como con la primer Corvette Z06 con motor
                      central, que anuncia un nuevo nivel de desempeño similar
                      al de un auto de carreras combinado con una comodidad
                      sorprendente.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos2"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>495 (551)/6.150</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>529 Nm/2.750–5.950</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>3,2</p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.794 / 1.887 / 1.393 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4 </p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("corvette.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <p className="title">BENTLEY CONTINENTAL GT </p>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col car">
                <Car model={"bentley.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion3"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos3"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion3"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>BEYOND THE LUXURY GRAND TOURER</p>
                    <p>
                      El Continental GT es el gran turismo más exquisitamente
                      diseñado. Con una gran cantidad de detalles hechos a mano,
                      es reconocible al instante como un automóvil apto para
                      llevar el nombre de los carroceros automotrices más
                      renombrados del mundo. Sin embargo, también es un Bentley,
                      y eso significa el rendimiento de Bentley. La tecnología
                      avanzada del motor ofrece una aceleración sin esfuerzo y
                      velocidades máximas increíbles para un automóvil tan
                      cómodo y lujoso. Mientras tanto, los sistemas de chasis
                      controlados por computadora hacen que la conducción
                      dinámica sea más segura, fácil y emocionante. Un verdadero
                      buque insignia de lujo, el Continental GT Mulliner es todo
                      lo que debe ser un gran turismo, y más.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos3"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>485 kW</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>900 Nm @ 1500-5000 RPM</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>3.6 </p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.850 / 2.187 / 1.405 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4</p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("bentley.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <p className="title">porche carrera gt</p>
            <div className="row row-cols-1 row-cols-md-2 ">
              <div className="col car">
                <Car model={"porsche.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion4"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos4"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion4"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>Un bálsamo para el alma de su clásico</p>
                    <p>
                      Diez años después de dejar de producirse, el Carrera GT
                      entra a formar parte de la familia Classic. La estética y
                      altura del tipo 980, fabricado a partir de 2003, ya
                      delataban su genética deportiva. Su diseño desvelaba un
                      parentesco estilístico con los vehículos de serie, aunque
                      combinado con referencias a los legendarios vehículos de
                      competición Porsche.Fabricado como una serie exclusiva de
                      1.270 unidades, el Carrera GT contaba con un motor de diez
                      cilindros con lubricación por cárter seco. La cilindrada
                      del motor aspirado V10 de 5,5 litros, concebido para
                      competir, se aumentó a 5,7 litros para la serie.Con una
                      potencia de 450 kW/612 CV a 8.000 rpm y una velocidad
                      máxima superior a los 330 km/h, el Carrera GT marcó nuevas
                      pautas. Las fuerzas de tracción se tomaron de una caja de
                      cambios manual de 6 velocidades.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos4"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>405 (551)/6.250</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>650/2.750–5.950</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>3,7</p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.794 / 1.887 / 1.393 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4 </p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("porsche.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <p className="title">Mclaren MP4-12C Ultimate</p>
            <div className="row row-cols-1 row-cols-md-2 ">
              <div className="col car">
                <Car model={"mclaren.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion5"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos5"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion5"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>
                      El primer coche de producción totalmente desarrollado por
                      McLaren desde el mítico F1
                    </p>
                    <p>
                      El MP4-12C se basa en el superdeportivo McLaren del mismo
                      nombre, producido entre 2010 y 2014. Es el primer vehículo
                      producido íntegramente por McLaren desde la F1, que
                      finalizó la producción en 1998. El automóvil está equipado
                      con el McLaren M838T 3.8L motor V8 de doble turbo, que
                      genera 600 PS (592 hp), que luego se incrementó a 625 PS
                      (616 hp) en 2012, y todo el vehículo utiliza fibra de
                      carbono para reducir el peso a un peso en vacío de 1434 kg
                      (3161 lb) . También utiliza un diseño convencional de 2
                      plazas en comparación con el diseño irregular de 3
                      asientos de la F1 (1 en el centro, dos detrás a cada
                      lado).
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos5"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>405 (551)/6.250</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>650/2.750–5.950</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>3,7</p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.794 / 1.887 / 1.393 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4 </p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("mclaren.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            <p className="title">Lamborguini aventador svj</p>
            <div className="row row-cols-1 row-cols-md-2 ">
              <div className="col car">
                <Car model={"aventador.glb"} />
              </div>
              <div className="col container-info">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="presentacion-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#presentacion6"
                      type="button"
                      role="tab"
                      aria-controls="presentacion"
                      aria-selected="true"
                    >
                      PRESENTACIÓN
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="datos-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#datos6"
                      type="button"
                      role="tab"
                      aria-controls="datos"
                      aria-selected="false"
                    >
                      DATOS TÉCNICOS
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active presentation"
                    id="presentacion6"
                    role="tabpanel"
                    aria-labelledby="presentacion-tab"
                  >
                    <p>Real emotions shape the future</p>
                    <p>
                      Lamborghini sabe perfectamente cómo afrontar los desafíos
                      y por eso ha creado el Aventador SVJ. Para fusionar una
                      tecnología de vanguardia con un diseño excepcional, sin
                      transigir en nada. En un futuro gobernado por la
                      tecnología se están perdiendo las emociones reales, pero
                      en el futuro que estamos diseñando están siempre en primer
                      plano, porque siempre es el ser humano quien conduce.{" "}
                      <br /> A la impecable dinámica del vehículo y a las
                      prestaciones del nuevo motor aspirado se suma la
                      excelencia del diseño, donde materiales de alta gama y
                      exclusivos entran en simbiosis con una carrocería
                      ultraligera.
                    </p>
                  </div>
                  <div
                    className="tab-pane fade mt4"
                    id="datos6"
                    role="tabpanel"
                    aria-labelledby="datos-tab"
                  >
                    <div className="details">
                      <p>Potencia en kW (CV)/rpm:</p>
                      <p>566 (770)/6.250</p>
                    </div>
                    <div className="details">
                      <p>Par máximo en Nm/rpm:</p>
                      <p>650/2.750–5.950</p>
                    </div>
                    <div className="details">
                      <p>Aceleración 0–100 km/h en s:</p>
                      <p>2.8</p>
                    </div>
                    <div className="details">
                      <p>Consumo de combustible (promedio) en l/100 km:</p>
                      <p>9,9–10,0</p>
                    </div>
                    <div className="details">
                      <p>Longitud/Anchura/Altura</p>
                      <p>4.794 / 1.887 / 1.393 </p>
                    </div>
                    <div className="details">
                      <p>Cilindro/Válvulas por cilindro</p>
                      <p>6 / 4 </p>
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleShowRoom("aventador.glb");
                      }}
                      sx={{ margin: "auto" }}
                    >
                      ShowRoom &nbsp;
                      <ThreeDRotationIcon color="secondary" />
                    </Button>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        setOpenContact(true);
                      }}
                      sx={{ margin: "auto" }}
                    >
                      Reservar &nbsp;
                      <SellIcon color="secondary" />
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
            {openContact && (
              <ContactModal
                openContact={openContact}
                setOpenContact={setOpenContact}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SellCar;
