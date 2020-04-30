import React, {useContext} from 'react';
import { SongContext } from "./SongContext";
import { AuthContext } from "../App";


const DeleteSong = (props) => {
    const { song, onClose } = props;
    const { state , dispatch } = useContext(SongContext);
    const { state: authState } = useContext(AuthContext);

    const onSubmit = () => {
        dispatch({
            type: "DELETE_SONG_REQUEST"
        })
        fetch(`https://hookedbe.herokuapp.com/api/songs/${song.id}`,{
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${authState.token}`,
            "Content-Type": `application/json`
            },
        })
        .then((res) => {
            if (res.status === 200) {
                dispatch({
                    type: "DELETE_SONG_SUCCESS",
                    payload: song
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: "DELETE_SONG_FAILURE",
                payload: error
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
                        DELETE SONG
                        </h1>
                    </div>
                        <span>Are you sure you want to delete {song.name}?</span>
                        <div className="form-action clearfix">
                            <button
                            type="button"
                            id="overlay-confirm-button"
                            className="button button-primary"
                            onClick={onSubmit}
                            disabled={state.isLoadingRequest}
                            >
                                Ok
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
                    </div>
                </div>
            </div>
    </div>
    )
}

export default DeleteSong;