import { BsFiles } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaPen, FaUsers, FaEdit, FaThList } from "react-icons/fa";

export const listNavbars = [
  {
    rolId: 1,
    list: [
      {
        link: "/formacion/admin-crear-gestor",
        name: "Crear Gestor",
        icon: <FaEdit />,
      },
      {
        link: "/formacion/admin-bloques",
        name: "Gestionar Bloques",
        icon: <BsFiles />,
      },
      {
        link: "/formacion/admin-usuarios",
        name: "Gestionar Usuarios",
        icon: <FaUsers />,
      },
      { link: "/formacion/admin-sedes", name: "Gestionar Sedes", icon: <MdLocationOn /> },
      {
        link: "/formacion/admin-roles",
        name: "Gestionar Roles",
        icon: <FaEdit />,
      },
      {
        link: "/formacion/admin/dashboard",
        name: "Panel Nacional",
        icon: <FaThList />,
      },
    ],
  },
  {
    rolId: 2,
    list: [
      {
        link: "/formacion/gestor/voluntarios",
        name: "Gestionar voluntarios",
        icon: <FaUsers />,
      },
      { link: "/formacion/gestor/entregas", name: "Gestionar entregas", icon: <FaPen /> },
      {
        link: "/formacion/gestor/dashboard",
        name: "Panel de sede",
        icon: <FaThList />,
      },
    ],
  },
  {
    rolId: 3,
    list: [
      { link: "/formacion/mis-bloques", name: "Mis Bloques", icon: <BsFiles /> },
      { link: "/formacion/mis-entregas", name: "Mis Entregas", icon: <FaPen /> },
      {
        link: "/formacion/sede",
        name: "Elegir o modificar sede",
        icon: <MdLocationOn />,
      },
    ],
  },
];
