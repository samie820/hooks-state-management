import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem("user-token"),
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    case "LOGOUT":
      localStorage.removeItem("user-token");
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className="App">
        {/* <Login /> */}
        <Home />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
