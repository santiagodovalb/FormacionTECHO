import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { listNavbars } from "./../../utils";

function Links() {
  const user = useSelector((state) => state.user);
  const location = useLocation().pathname;

  const findNavbar = (array, key) =>
    array.find((navbar) => navbar.rolId === key);

  const buildNavbar = (array, rolId) => {
    const navbar = findNavbar(array, rolId);
    return navbar.list.map((ele) => (
      <li className="nav-item">
        <Link to={`${ele.link}`} key={rolId}>
          <strong>
            <h6
              className={
                ele.link === location
                  ? `nav-link link-light text-decoration-underline fs-4`
                  : `nav-link link-light fs-5`
              }
            >
              {ele.name}
            </h6>
          </strong>
        </Link>
      </li>
    ));
  };

  return <div>{user.rolId && buildNavbar(listNavbars, user.rolId)} </div>;
}

export default Links;
