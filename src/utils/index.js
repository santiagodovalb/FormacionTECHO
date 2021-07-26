import { BsFiles } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export const listNavbars = [
  {
    rolId: 1,
    list: [
      {
        link: "/admin-crear-gestor",
        name: "Crear Gestor",
        icon: <FaEdit />,
      },
      {
        link: "/admin-bloques",
        name: "Gestionar Bloques",
        icon: <BsFiles />,
      },
      {
        link: "/admin-usuarios",
        name: "Gestionar Usuarios",
        icon: <FaUsers />,
      },
      { link: "/admin-sedes", name: "Gestionar Sedes", icon: <MdLocationOn /> },
    ],
  },
  {
    rolId: 2,
    list: [
      {
        link: "/gestor/voluntarios",
        name: "Gestionar voluntarios",
        icon: <FaUsers />,
      },
      {
        link: "/gestor/dashboard",
        name: "Dashboard",
        icon: <FaUsers />,
      },
      { link: "/gestor/entregas", name: "Gestionar entregas", icon: <FaPen /> },
    ],
  },
  {
    rolId: 3,
    list: [
      { link: "/mis-bloques", name: "Mis Bloques", icon: <BsFiles /> },
      { link: "/mis-entregas", name: "Mis Entregas", icon: <FaPen /> },
      {
        link: "/sede",
        name: "Elegir o modificar sede",
        icon: <MdLocationOn />,
      },
    ],
  },
];
