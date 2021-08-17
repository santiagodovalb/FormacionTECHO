import React from 'react';


const LoginUser = () => {

    return (
      <>
        <a href="/api/auth/google">
          <button id="Google" className="btn btn-danger mb-3">
            Ingresar con Google
          </button>
        </a>
        <br />
        <a href="/api/auth/facebook">
          <button id="Facebook" className="btn btn-primary ">
            Ingresar con Facebook
          </button>
        </a>
      </>
    );

}

export default LoginUser;