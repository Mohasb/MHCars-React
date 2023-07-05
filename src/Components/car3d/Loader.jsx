import Logo from "/src/assets/MHIcon.svg";

export default function Loader() {
  return (
    <div className="container-loader">
      <div id="loader-wrapper">
        <div className="loader">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="subline"></div>
          <div className="loader-circle-1">
            <div className="loader-circle-2"></div>
          </div>
          <div className="needle"></div>
          <div className="loading">
            <img className="logo-loading" src={Logo} alt="Icon loading" />
          </div>
        </div>
      </div>
    </div>
  );
}
