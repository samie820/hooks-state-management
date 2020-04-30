import React from "react";
import { AuthContext } from "../App";
import Home from "./Home";
 

export const SongContext = React.createContext();

const initialState = {
  songs: [],
  isFetching: false,
  hasError: false,
  isSongSubmitting: false,
  songHasError: false,
  isSongDeleted: false,
  isLoadingRequest: false
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
    case "DELETE_SONG_REQUEST":
      return {
        ...state,
        isLoadingRequest: true,
      }
    case "DELETE_SONG_SUCCESS":
        console.log(action.payload) 
      return {
        ...state,
        isLoadingRequest: false,
        isSongDeleted: true,
        songs: state.songs.filter(s => s.id !== action.payload.id)
      }
    case "DELETE_SONG_FAILURE":
      return {
        ...state,
        isLoadingRequest: false,
        isSongDeleted: false,
        message: action.payload && action.payload.message || "An error occured while deleting. Try again."
      }
    case "UPDATE_SONG_REQUEST":
      return {
        ...state,
        isSongSubmitting: true,
        songHasError: false,
      }
    case "UPDATE_SONG_SUCCESS":
        window.location.reload();
      return {
        ...state,
        isSongSubmitting: false
      }
    case "UPDATE_SONG_FAILURE":
      return {
        ...state,
        isSongSubmitting: false,
        songHasError: true,
      }
    default:
      return state;
  }
};

export const Provider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <React.Fragment>
        <SongContext.Provider value={{
        state,
        dispatch
        }}>
       {props.children}
        </SongContext.Provider>
    </React.Fragment>
  );
};

