import React, {useState} from "react";
import DeleteSong from "./DeleteSong";
import UpdateSong from "./UpdateSong";

export const Card = ({ song }) => {
    const [isDeleteModalVisible, setDeleteModal] = useState(false);
    const [isUpdateModalVisible, setUpdateModal] = useState(false);


    const toggleDeleteModal = () => {
      setDeleteModal(!isDeleteModalVisible);
    }

    const toggleUpdateModal = () => {
      setUpdateModal(!isUpdateModalVisible);
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
