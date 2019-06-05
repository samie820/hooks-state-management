import React from "react";
import { AuthContext } from "../App";

export const Home = () => {
  const { state } = React.useContext(AuthContext);
  React.useEffect(() => {
    fetch("http://localhost:8000/api/songs", {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
      });
  }, []);

  return <div />;
};

export default Home;
