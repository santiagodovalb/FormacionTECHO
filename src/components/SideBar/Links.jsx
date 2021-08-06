import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { listNavbars } from "../../utils/sidebarLinks";
import { BsPlusCircle } from 'react-icons/bs'

function Links() {
  const user = useSelector((state) => state.user);
  const location = useLocation().pathname;

  const findNavbar = (array, key) =>
    user.rolId === null || user.rolId > 3
      ? array.find((navbar) => navbar.rolId === 3)
      : array.find((navbar) => navbar.rolId === key);

  const buildNavbar = (array, rolId) => {
    const navbar = findNavbar(array, rolId);
    if(rolId === 1){
    return (
      <li >
        <strong>
        <h6
          className="btn btn-toggle link-light fs-5 fw-bolder"
          style={{padding: "0px 16px"}}
          data-bs-toggle="collapse"
          data-bs-target="#orders-collapse"
        >
          <BsPlusCircle/> Ver más
        </h6>
        </strong>
        <div className="collapse" id="orders-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            {navbar.list.map((ele, index) => (
              <li className="nav-item" key={`navbar-${rolId}-${index}`}>
                <Link to={`${ele.link}`} key={rolId}>
                  <strong>
                    <h6
                      className={
                        location.includes(ele.link)
                          ? `nav-link link-light fs-5 fw-bolder`
                          : `nav-link link-light`
                      }
                    >
                      {ele.icon} {ele.name}
                    </h6>
                  </strong>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );} else {
      return(
        navbar.list.map((ele, index) => (
        <li className="nav-item" key={`navbar-${rolId}-${index}`}>
          <Link to={`${ele.link}`} key={rolId}>
            <strong>
              <h6
                className={
                  location.includes(ele.link)
                    ? `nav-link link-light fs-5 fw-bolder`
                    : `nav-link link-light`
                }
              >
                {ele.icon} {ele.name}
              </h6>
            </strong>
          </Link>
        </li>
      ))
      );
    }
  };

  return (
    <div>
      {(user.rolId !== undefined || user.rolId === null) &&
        buildNavbar(listNavbars, user.rolId)}{" "}
    </div>
  );
}

export default Links;

