import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./postDetails.scss";
import Loader from "../Loader/Loader";

const PostsDetails = () => {
  const [state, setstate] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const loadComments = () => {
    setLoading(true);
    Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(function (response) {
        setComments(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deletePost = () => {
    setLoading(true);
    Axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function (response) {
        history.push(`/posts?userId=${state.userId}`);
        setLoading(false);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(function (response) {
        setstate(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <section className="post-wrapper">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Post Details</h1>
          <div className="post-details-container">
            <h3>{state.title}</h3>
            <p>{state.body}</p>
            <div className="btn-container">
              <button className="comment-btn" onClick={loadComments}>
                Comments
              </button>
              <button className="delete-btn" onClick={deletePost}>
                Delete Post
              </button>
            </div>
          </div>
          <main className="post-details-main-container">
            {comments.length > 0 && <h1>Comments</h1>}
            <div className="card-content-main">
              {comments.map((comment) => (
                <div key={comment.id} className="card-container">
                  <h3>{comment.name}</h3>
                  <h5>{comment.email}</h5>
                  <div className="body-container">{comment.body}</div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}
    </section>
  );
};

export default PostsDetails;
