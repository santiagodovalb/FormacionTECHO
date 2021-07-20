import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setUser } from "../../redux/user";
import axios from "axios";
import Card from "../../components/Card";
import localPeru from "../../assets/sedes/lima-peru.png";
import "./style.css";

const Sede = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const sedesPrueba = useSelector((state) => state.sedes);
  const [form, setForm] = useState({});
  const [sedes, setSedes] = useState([]);
  const [selectSede, setSelectSede] = useState("");
  const [stateIcon, setStateIcon] = useState({
    key: "",
    style: "btn bi bi-check-circle-fill check-style",
  });

  const countCard = 3;

  useEffect(() => {
    if (!sedes.length) setSedes([...sedesPrueba]);
    setStateIcon({
      ...stateIcon,
      key: selectSede,
    });
  }, [form, selectSede, sedes]);

  const onChange = (e) => {
    const { target } = e;
    setForm({ ...form, [target.name]: target.value });
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (form.search && form.search.length)
      setSedes(
        sedesPrueba.filter(
          (sede) =>
            sede.nombre.toLowerCase().indexOf(form.search.toLowerCase()) >= 0
        )
      );
    else {
      setSedes(sedesPrueba);
      setStateIcon({
        ...stateIcon,
        key: "",
      });
    }
  };

  const onSaveSede = () => {
    console.log("Sede", selectSede);
    axios
      .put(`/api/users/${user.id}`, { sedeId: selectSede })
      .then((res) => res.data)
      .then((user) => {
        console.log("USER", user[1][0]);
        dispatch(setUser(user[1][0]));
      })
      .then(() => history.push("/user"))
      .catch((err) => err);
  };

  const CardTemplate = ({ ele, setState, stateIcon }) => {
    return (
      <Card
        keyU={`${ele.id}`}
        img={localPeru}
        button={{
          text: `${ele.nombre}`,
          styles: "button-style light-blue fs-4",
        }}
        icon="btn bi bi-circle-fill uncheck-style"
        setState={setState}
        stateIcon={stateIcon}
      />
    );
  };

  const buildSlides = ([...sedes], countCard) => {
    const sizeItems = sedes.length;
    const items = parseInt(sizeItems / countCard);
    const diff = sizeItems % countCard;
    const slides = [];

    if (items && diff) {
      let slideIndex = 0;
      while (slideIndex <= items) {
        slides.push(
          <button
            key={`slide-${slideIndex}`}
            type="button"
            data-bs-target="#carouselSedes"
            data-bs-slide-to={`${slideIndex}`}
            aria-label={`Slide ${slideIndex + 1}`}
            className={slideIndex ? "" : "active"}
            aria-current={slideIndex ? "" : "true"}
          ></button>
        );
        slideIndex++;
      }
    }
    return slides;
  };

  const buildCorousel = ([...sedes], countCards) => {
    const sizeItems = sedes.length;
    const items = parseInt(sizeItems / countCards);
    const diff = sizeItems % countCards;
    let auxItems = items;
    let auxDiff = diff;
    let index = 0;
    const corousel = [];

    // while (auxItems > 0 && items) {
    //   const items = [];
    //   let countAux = 0;
    //   while (countAux < countCards) {
    //     console.log("Entro while: ", index, countAux, auxItems);
    //     items.push(
    //       <CardTemplate
    //         key={`tem-${index}`}
    //         ele={sedes[index]}
    //         setState={setSelectSede}
    //         stateIcon={stateIcon}
    //       />
    //     );
    //     index++;
    //     countAux++;
    //   }

    //   const item = (
    //     <div
    //       key={`item-${index}`}
    //       className={index ? "carousel-item" : "carousel-item active"}
    //     >
    //       <div className="cards-wrapper">{items}</div>
    //     </div>
    //   );
    //   --auxItems;

    //   corousel.push(item);
    // }

    while (auxItems > 0 && items) {
      const item = (
        <div
          key={`item-${index}`}
          className={index ? "carousel-item" : "carousel-item active"}
        >
          <div className="cards-wrapper">
            {[index, index + 1, index + 2].map((ele) => {
              return (
                <CardTemplate
                  ele={sedes[ele]}
                  setState={setSelectSede}
                  stateIcon={stateIcon}
                />
              );
            })}
          </div>
        </div>
      );

      corousel.push(item);
      index = index + countCards;
      --auxItems;
    }

    if (diff && index < sizeItems) {
      const diffItems = [];

      while (!auxItems && auxDiff > 0 && diff && index < sizeItems) {
        diffItems.push(
          <CardTemplate
            ele={sedes[index]}
            setState={setSelectSede}
            stateIcon={stateIcon}
          />
        );
        index = index + 1;
        --auxDiff;
      }

      const item = (
        <div
          key={`item-${index}`}
          className={index ? "carousel-item" : "carousel-item active"}
        >
          <div className="cards-wrapper">{diffItems}</div>
        </div>
      );

      corousel.push(item);
    }
    return corousel;
  };

  useEffect(() => {
    if (!sedes.length) setSedes([...sedesPrueba]);
    setStateIcon({
      ...stateIcon,
      key: selectSede,
    });
  }, [form, selectSede, sedes]);

  return (
    <div>
      <div className="row justify-content-center align-items-center">
        <div>
          <h1 className="p-5 fs-1 title">
            <strong>Elige tu sede</strong>
          </h1>
        </div>
        <div className="row justify-content-center align-items-center">
          <form
            className="d-flex col-auto text-center"
            onChange={onChange}
            onSubmit={onSearch}
          >
            <input
              type="text"
              name="search"
              className="form-control me-2 fs-3"
              placeholder="Buscar sede"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        {/* <div className="row justify-content-center align-items-center mt-5">
          {sedes?.map((sede, index) => {  return(
            
            <Card
              keyU={`${sede.id}`}
              img={localPeru}
              button={{
                text: `${sede.nombre}`,
                styles: "button-style light-blue fs-4",
              }}
              icon="btn bi bi-circle-fill uncheck-style"
              setState={setSelectSede}
              stateIcon={stateIcon}
            />
            )})}
        </div> */}
        <div
          id="carouselSedes"
          className="carousel slide m-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {sedes.length && buildSlides(sedes, countCard)}
          </div>
          <div className="carousel-inner">
            {sedes.length && buildCorousel(sedes, countCard)}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselSedes"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="" style={{ color: "white" }}>
              Previous
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselSedes"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="col-auto">
          <button
            className="mb-3 mt-3 p-4 fs-3 button-style green"
            onClick={onSaveSede}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sede;
