import Sidebar from "../../components/SideBar";
import Card from "../../components/Card";
import localPeru from "../../assets/sedes/lima-peru.png";
import "./style.css";

const Sede = () => {
  return (
    <div>
      <Sidebar />
      <div className="row justify-content-center align-items-center">
        <div>
          <h1 className="p-5 fs-1 title">
            <strong>Elige tu sede</strong>
          </h1>
        </div>
        <div className="row justify-content-center align-items-center">
          <form className="d-flex col-auto text-center">
            <input
              className="form-control me-2 fs-3"
              type="search"
              placeholder="Buscar sede"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div className="row justify-content-center align-items-center mt-5">
          {[1, 2, 3, 4, 5].map((ele) => (
            <div class="col-auto ">
              <Card
                img={localPeru}
                button={{
                  text: `Buscar Sede ${ele}`,
                  styles: "button-style light-blue fs-4",
                }}
                icon="btn bi bi-circle-fill check-style"
              />
            </div>
          ))}
        </div>
        <div className="col-auto">
          <button className="mb-3 mt-3 p-4 fs-3 button-style green">
            Guardar
          </button>
        </div>
        {/* <div style={{ width: "100%" }}>
          <div
            style={{
              height: "0",
              paddingBottom: "133.33333333333331%",
              position: "relative",
              width: "100%",
            }}
          >
            <iframe
              allowfullscreen={""}
              frameBorder={"0"}
              height={"100%"}
              src={"https://giphy.com/embed/3cUHdXqaO8g4PkGBzW/video"}
              style={{ left: "0", position: "absolute", top: "0" }}
              width={"100%"}
            ></iframe>
          </div>
        </div> */}
        {/* <div class="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            title="YouTube video"
            allowfullscreen
          ></iframe>
        </div> */}
        {/* <div
          id="carouselExampleIndicators"
          className="carousel slide row"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-50" src={localPeru} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-50"
                src="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-50"
                src="https://www.telediariodigital.net/wp-content/uploads/2014/09/art21-foto3.jpg"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Sede;
