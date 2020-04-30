import React, {useState} from "react";
import DeleteSong from "./DeleteSong";
import UpdateSong from "./UpdateSong";

export const Card = ({ song }) => {
    const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
    const [isUpdateModalVisible, setUpdateModalVisibility] = useState(false);


    const toggleDeleteModal = () => {
      setDeleteModalVisibility(prevDeleteModalVisibility => !prevDeleteModalVisibility);
    }

    const toggleUpdateModal = () => {
      setUpdateModalVisibility(prevUpdateModalVisibility => !prevUpdateModalVisibility);
    }

  return (
    <>
    <div className="card">
      <img
        src={song.albumArt}
        alt=""
      />
      <div className="content">
        <h2>{song.name}</h2>
        <span>BY: {song.artist}</span>
        <span style={{marginTop: "2%"}}>
          <button id="edit" onClick={toggleUpdateModal}>EDIT</button>
          <button id="delete" onClick={toggleDeleteModal}>DELETE</button>
        </span>
      </div>
    </div>

    {isUpdateModalVisible && 
      <UpdateSong song={song} onClose={toggleUpdateModal} />
    }

    {isDeleteModalVisible && 
      <DeleteSong song={song} onClose={toggleDeleteModal} />
    }
    </>
  );
};

export default Card;
