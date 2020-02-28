import React from "react";
import { AuthContext } from "../App";
import Card from "./Card";
import AddSong from "./AddSong";
import { SongContext } from "./SongContext";
import withSongContext from "./withSongContext";

export const Home = () => {
  const { state: authState } = React.useContext(AuthContext);
  const { state, dispatch } = React.useContext(SongContext);
  const [isAddSongModalVisible, setAddSongModalVisibility] = React.useState(false);

  const toggleAddSong = () => {
    setAddSongModalVisibility(!isAddSongModalVisible);
  }

  React.useEffect(() => {
    dispatch({
      type: "FETCH_SONGS_REQUEST"
    });
    fetch("https://hookedbe.herokuapp.com/api/songs", {
      headers: {
        Authorization: `Bearer ${authState.token}`
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
        dispatch({
          type: "FETCH_SONGS_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_SONGS_FAILURE"
        });
      });
  }, [authState.token]);

  return (

      <React.Fragment>
      <button className="toggle-button" onClick={toggleAddSong}>ADD SONG</button>
      <AddSong onClose={toggleAddSong} show={isAddSongModalVisible} />
      <div className="home">
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.songs.length > 0 &&
              state.songs.map(song => (
                <Card key={song.id.toString()} song={song} />
              ))}
          </>
        )}
      </div>
    </React.Fragment>
    
  );
};

export default withSongContext(Home);
