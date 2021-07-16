import Sidebar from "../../../components/SideBar";
import "./style.css";
import CanchaFutbol from "./../../../assets/volunteer/CanchaFutbol.png";

const VolunteerModuls = () => {
  return (
    <div>
      <Sidebar />
      <div className="container-fluid">
        <div className="row">
          <h1 className="p-5 fs-1 title">
            <strong>Cancha de futbol</strong>
          </h1>
        </div>
        <div className="row">
          <div className="col m-5">
            <img src={CanchaFutbol} className="mx-5 img-style" alt="block" />
            <p className="m-5 fs-5 text-justify-2">
              La situación de pobreza y exclusión que se vive en los
              asentamientos, ha movilizado a más de 1 millón de jóvenes en toda
              América Latina. Únete también y trabajemos juntos para transformar
              esta realidad.
            </p>
          </div>
          <div className="col m-5 px-5 text-justify-2">
            <div className=" fs-4">
              <p>
                <strong>
                  <a href="www.w" className="text-secondary">
                    Proyectos
                  </a>{" "}
                  {">"} Modulos
                </strong>
              </p>
            </div>
            <div className="d-flex flex-column mb-5">
              <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue">
                Modulo 1
              </button>
              <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue">
                Modulo 2
              </button>
              <button className="mb-3 mt-3 p-3 fs-3 button-style light-blue">
                Modulo 3
              </button>
            </div>
            <div className="fs-4 my-3">
              <p>
                <strong>¿Deseas integrarte al proyecto?</strong>
              </p>
              <button className="my-3 p-4 fs-3 button-style green">
                Integrarme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerModuls;
