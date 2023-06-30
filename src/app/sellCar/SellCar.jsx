import CarShow from "../../Components/car3d/CarShow";
import Car from "../../Components/car3d/Car";
import "./style.scss";

const SellCar = () => {
  return (
    <>
      <div id="carContainer" className="container-3dcars">
        <div className="row gx-0">
          <div className="col col-lg-6">
            <Car model={"bmw.glb"} />
          </div>
        </div>
        <div className="row gx-0">
          <div className="col col-lg-6">
            <Car model={"aventador.glb"} />
          </div>
        </div>
        <div className="row gx-0">
          <div className="col col-lg-6">
            <Car model={"m4.glb"} />
          </div>
        </div>
      </div>
      {/* <div className="container-3dcars">
        <CarShow />
      </div> */}
    </>
  );
};

export default SellCar;
