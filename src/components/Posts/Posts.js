import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Axios from "axios";
import "./posts.scss";
import Loader from "../Loader/Loader";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Posts = (props) => {
  const [usersPosts, setUsersPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const id = query.get("userId");

  useEffect(() => {
    Axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}&skip=0&limit=10`
    )
      .then(function (response) {
        // handle success
        setUsersPosts(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <section className="main-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>My Posts</h1>
          <div className="card-content-main">
            {usersPosts.map((post) => (
              <div key={post.id} className="card-container">
                <h3>{post.title}</h3>
                <div className="view-container">
                  <Link to={`/posts/${post.id}`}>View Posts</Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Posts;
