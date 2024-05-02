import React from "react";
import PropTypes from "prop-types";

export const UserInfo = ({ email, name }) => {
  return (
    <>
      <p>Username: {name} </p>
      <p>Email: {email} </p>
    </>
  );
};

UserInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
