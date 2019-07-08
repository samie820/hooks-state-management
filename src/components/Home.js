import React from "react";
import { AuthContext } from "../App";
import Card from "./Card";
import AddSong from "./AddSong";

export const SongContext = React.createContext();

const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
  isSongSubmitting: false,
  songHasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SONGS_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_SONGS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        songs: action.payload
      };
    case "FETCH_SONGS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    case "ADD_SONG_REQUEST":
      return {
        ...state,
        isSongSubmitting: true,
        songHasError: false,
      }
    case "ADD_SONG_SUCCESS":
      return {
        ...state,
        isSongSubmitting: false,
        songs: [...state.songs, action.payload]
      }
    case "ADD_SONG_FAILURE":
      return {
        ...state,
        isSongSubmitting: false,
        songHasError: true,
      }
    default:
      return state;
  }
};

export const Home = () => {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
    <SongContext.Provider value={{
      state,
      dispatch
    }}>
      <button className="toggle-button" onClick={toggleAddSong}>ADD SONG</button>
      <AddSong onClose={toggleAddSong} show={isAddSongModalVisible} />
    </SongContext.Provider>
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

export default Home;
