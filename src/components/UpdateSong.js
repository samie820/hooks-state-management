import React, {useContext} from 'react';
import { AuthContext } from '../App';
import { SongContext } from "./SongContext";

const UpdateSong = (props) => {
    const { song, onClose } = props;
    console.log(song)
    const { state: authState } = useContext(AuthContext);
    const { state, dispatch } = useContext(SongContext);

    const [title, setTitle] = React.useState(song.name);
    const [artist, setArtist] = React.useState(song.artist);
    const [imageUrl, setImageUrl] = React.useState(song.albumArt);
    const isButtonDisabled = title === "" || artist === "" || imageUrl === "" || state.isSongSubmitting;


    const onSubmit = () => {
        dispatch({
            type: "UPDATE_SONG_REQUEST"
        })
        const newsong = {
          "title": title,
          "imageUrl": imageUrl,
          "artist": artist,
          "id": song.id
        };
      fetch(`https://hookedbe.herokuapp.com/api/songs/${song.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": `application/json`
          },
          body: JSON.stringify(newsong),
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw res;
            }
          })
          .then(data => {
              console.log(data);
              setArtist("");
              setTitle("");
              setImageUrl("");
              dispatch({
                  type: "UPDATE_SONG_SUCCESS",
                  payload: data
              })
              onClose();
          }).catch(error => {
              dispatch({
                  type: "UPDATE_SONG_FAILURE"
              })
          })
    }


    return (
        <div className="modal" id="modal">
        <div className="modal-table-container">
         <div className="modal-table-cell">
          <div className="modal-overlay small">
               <div className="modal-header">
                 <h1 className="modal-title">
                    UPDATE SONG
                 </h1>
               </div>
               <form className="modal-form">
                 <div className="modal-form-inputs">
 
                 <label htmlFor="title">Title</label>
                     <input
                     id="title"
                     name="title"
                     type="text"
                     value={title}
                     onChange={e => setTitle(e.target.value)}
                     className="text-input"
                     />
 
                 <label htmlFor="artist">Artist</label>
                     <input
                     id="artist"
                     name="artist"
                     type="text"
                     value={artist}
                     onChange={e => setArtist(e.target.value)}
                     className="text-input"
                     />
 
                 <label htmlFor="imageUrl">Image URL</label>
                     <input
                     id="imageUrl"
                     name="imageUrl"
                     type="text"
                     value={imageUrl}
                     onChange={e => setImageUrl(e.target.value)}
                     className="text-input"
                     />
                 </div>
 
 
                 
                 {/* <div className="form-error">
                       <p>
                         {state.songHasError && "Error Creating Song!"}
                       </p>
                 </div> */}
                 <div className="form-action clearfix">
                     <button
                       type="button"
                       id="overlay-confirm-button"
                       className="button button-primary"
                       onClick={onSubmit}
                       disabled={isButtonDisabled}
                     >
                       {state.isSongSubmitting ? "Updating..." : "Update"}
                     </button>
                     <button
                       type="button"
                       id="overlay-cancel-button"
                       className="button button-default small close-overlay pull-right"
                       onClick={onClose}
                     >
                           Cancel
                     </button>
                 </div>
               </form>
         </div>
         </div>
        </div>
       </div>
     
    )
}

export default UpdateSong;