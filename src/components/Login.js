import React from "react";
import logo from "../logo.svg";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true
    });
    fetch("http://localhost:8000/api/login", {
      method: "post",
      body: {
        email: data.email,
        password: data.password
      }
    })
      .then(res => {
        if (res.ok) {
          return res;
        }
        throw res;
      })
      .then(resJson => {
        setData({
          ...data,
          isSubmitting: false
        });
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>

            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>

            {data.errorMessage && <span className="form-error">{data.errorMessage}</span>}

            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                <img className="spinner" src={logo} alt="loading icon" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
