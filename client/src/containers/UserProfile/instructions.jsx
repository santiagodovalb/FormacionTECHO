import { useSelector } from "react-redux";

function Instructions() {

  const user = useSelector((state) => state.user);

  return (
    <div>
      {!user.rolId && ""}
      {user.rolId === 1 && 
      <div>
            <ul>
                <li>En Crear Gestor vas a poder generar un nuevo usuario con rol Gestor.</li>
                <li>En Gestionar Bloques podés crear, eliminar y editar bloques y módulos.</li>
                <li>Para ver y eliminar los usuarios que hay registrado en la plataforma podés ir a Gestionar Usuarios.</li>
                <li>Si querés crear o eliminar una sede, andá a Gestionar Sedes.</li>
                <li>Por último, para eliminar o crear nuevos roles, visitá Gestionar Roles.</li>
            </ul>
      </div>}
      {user.rolId === 2 && 
      <div>
        <ul>
            <li>En Ver Voluntarios vas a poder ver todos los voluntarios correspondientes a tu sede y asignarles un rol.</li>
            <li>En Gestionar Entregas, podrás ver todas las entregas de tus voluntarios y completarlas.</li>
            <li>Podés cambiar tu contraseña haciendo click en "cambiar contraseña".</li>
        </ul>
      </div>}
      {((user.rolId && user.rolId > 2) || user.rolId === null) && (
        <div>
            <ul>
                <li>En Mis Bloques encontrarás todos tus bloques de formación.</li>
                <li>Dentro de ellos, se encuentran los módulos correspondientes a cada uno.</li>
                <li>Al finalizar un módulo, marcalo como completado.</li>
                <li>Una vez completados todos, se te habilitará la entrega del bloque.</li>
                <li>Para dar un bloque como finalizado, tenés que esperar a que tu gestor complete la entrega.</li>
            </ul>
        </div> 
      )}
    </div>
  );
}

export default Instructions;

