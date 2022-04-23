import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostContext } from "../../contexts/PostContext";
import { useContext } from "react";

const ActionButtons = ({ url, _id }) => {
  const { PostSlice, dispatch, deletePost } = useContext(PostContext);

  const handleEditPost = (postId) => {
    dispatch(PostSlice.actions.findPost(_id));
    dispatch(PostSlice.actions.updatePostModal(true));
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button className="post-button">
        <img
          src={editIcon}
          onClick={() => handleEditPost(_id)}
          alt="edit"
          width="24"
          height="24"
        />
      </Button>
      <Button className="post-button">
        <img
          src={deleteIcon}
          onClick={() => deletePost(_id)}
          alt="delete"
          width="24"
          height="24"
        />
      </Button>
    </>
  );
};

export default ActionButtons;
