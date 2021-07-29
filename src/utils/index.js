import { BsFiles } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaPen, FaUsers, FaEdit, FaThList } from "react-icons/fa";

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
      {
        link: "/admin-roles",
        name: "Gestionar Roles",
        icon: <FaUsers />,
      },
      { link: "/admin-sedes", name: "Gestionar Sedes", icon: <MdLocationOn /> },
      {
        link: "/admin-roles",
        name: "Gestionar Roles",
        icon: <FaEdit />,
      },
      {
        link: "/admin/dashboard",
        name: "Panel Nacional",
        icon: <FaThList />,
      },
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
      { link: "/gestor/entregas", name: "Gestionar entregas", icon: <FaPen /> },
      {
        link: "/gestor/dashboard",
        name: "Panel de sede",
        icon: <FaThList />,
      },
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
