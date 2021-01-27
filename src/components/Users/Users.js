import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./users.scss";
import Loader from "../Loader/Loader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        // handle success
        setUsers(response.data);
        setLoader(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <section className="user-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>List of Users</h1>
          <div className="user-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Sl no.</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Blog Posts</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.company.name}</td>
                    <td>
                      <Link to={`/posts?userId=${user.id}`}>My Posts</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Users;
