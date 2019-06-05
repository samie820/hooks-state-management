import React from "react";
import { AuthContext } from "../App";

export const Header = () => {
  const { dispatch } = React.useContext(AuthContext);
  return (
    <nav id="navigation">
      <h1 href="#" className="logo">
        HOOKED
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: "LOGOUT"
          })
        }
      >
        <h1 href="#">LOGOUT</h1>
      </button>
    </nav>
  );
};

export default Header;
