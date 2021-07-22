import Card from "../Card";
import "./style.css";

const Carousel = ({ cards, numberCardSlide, select, icon }) => {
  const CardTemplate = ({ ele, setState, stateIcon }) => {
    return (
      <Card
        key={`${ele.id}`}
        id={`${ele.id}`}
        img={`${ele.img}`}
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

    console.log("cards: ", sedes, countCard);

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

  const buildCorousel = ([...cards], countCards, select, icon) => {
    const sizeItems = cards.length;
    const items = parseInt(sizeItems / countCards);
    const diff = sizeItems % countCards;
    let auxItems = items;
    let auxDiff = diff;
    let index = 0;
    const corousel = [];

    while (auxItems > 0) {
      const itemss = [];
      let countAux = 0;
      while (countAux < countCards) {
        console.log("Entro while: ", index, countAux, auxItems);
        itemss.push(
          <CardTemplate
            key={`tem-${index}`}
            ele={cards[index]}
            setState={select}
            stateIcon={icon}
          />
        );
        index++;
        countAux++;
      }

      const item = (
        <div
          key={`item-${index}`}
          className={
            auxItems !== items ? "carousel-item" : "carousel-item active"
          }
        >
          <div className="cards-wrapper">{itemss}</div>
        </div>
      );

      corousel.push(item);
      --auxItems;
    }

    if (diff && index < sizeItems) {
      const diffItems = [];

      while (!auxItems && auxDiff > 0 && diff && index < sizeItems) {
        diffItems.push(
          <CardTemplate
            key={`tem-${index}`}
            ele={cards[index]}
            setState={select}
            stateIcon={icon}
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

  return (
    <div
      id="carouselSedes"
      className="carousel slide m-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {buildSlides(cards, numberCardSlide)}
      </div>
      <div className="carousel-inner">
        {buildCorousel(cards, numberCardSlide, select, icon)}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselSedes"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselSedes"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
