import { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/esm/Spinner";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector } from "react-redux";
import addIcon from "../assets/plus-circle-fill.svg";
import AddPostModal from "../components/posts/AddPostModal";
import SinglePost from "../components/posts/SinglePost";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import { PostContext } from "../contexts/PostContext";

const Dashboard = () => {
  const postsLoading = useSelector((state) => state.posts.postsLoading);
  const posts = useSelector((state) => state.posts.posts);
  const post = useSelector((state) => state.posts.post);
  const { show, message, type } = useSelector(
    (state) => state.posts.isShowToast
  );
  const { username } = useSelector((state) => state.auth.user);

  const { PostSlice, dispatch, getPosts } = useContext(PostContext);

  // Start: Get all posts
  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => dispatch(PostSlice.actions.addPostModal(true))}
            >
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => dispatch(PostSlice.actions.addPostModal(true))}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() =>
          dispatch(
            PostSlice.actions.showToast({
              show: false,
              message: "",
              type: null,
            })
          )
        }
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
