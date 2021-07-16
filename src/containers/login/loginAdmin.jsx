import React from 'react';


const LoginAdmin = () => {

    return (
      <>
        <a href="http://localhost:3001/api/auth/google">
          <button id="Google" className="btn btn-danger mb-3">
            Ingresar con Google
          </button>
        </a>
        <br />
        <a href="http://localhost:3001/api/auth/facebook">
          <button id="Facebook" className="btn btn-primary">
            Ingresar con Facebook
          </button>
        </a>
      </>
    );

}

export default LoginAdmin;