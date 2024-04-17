import React from "react";

export const UserInfo = ({ user }) => (
  <div>
    <h4>User Information</h4>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
  </div>
);
