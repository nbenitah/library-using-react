import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function User() {
  const { id, userid } = useParams();
  const userId = id ?? userid;
  const [user, setUser] = useState({});

  async function fetchUser() {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    setUser(data);
  }

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  return (
    <div>
      <Link to="/">Go back</Link>
      <p>{user.id}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default User;