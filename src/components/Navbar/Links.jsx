import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { listNavbars } from "../../utils/sidebarLinks";

function Links() {
  const user = useSelector((state) => state.user);
  const location = useLocation().pathname;

  const findNavbar = (array, key) =>
    user.rolId === null || user.rolId > 3
      ? array.find((navbar) => navbar.rolId === 3)
      : array.find((navbar) => navbar.rolId === key);

  const buildNavbar = (array, rolId) => {
    const navbar = findNavbar(array, rolId);

    return navbar.list.map((ele, index) => (
      <li className="nav-item" key={`navbar-${rolId}-${index}`}>
        <Link to={`${ele.link}`} key={rolId}>
            <p
              className={
                location.includes(ele.link)
                  ? `nav-link link-light active`
                  : `nav-link link-light`
              }
            >
              {ele.name}
            </p>
        </Link>
      </li>
    ));
  };

  return (
    <div>
      {(user.rolId !== undefined || user.rolId === null) &&
        buildNavbar(listNavbars, user.rolId)}{" "}
    </div>
  );
}

export default Links;