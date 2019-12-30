import React, { useState, useEffect } from "react";
import { b64encode } from "../utils/madmurphy";

const LoginForm = props => {
  const { onSubmit } = props;
  const [formInit, setFormInit] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    if (!formInit) {
      setFormInit(true);
      console.log("Login Form invoked ");
    }
  }, [formInit]);

  const handleFormChange = ({ currentTarget: input }) => {
    const clone = { ...credentials };
    clone[input.name] = input.value;
    setCredentials(clone);
  };

  const b64Submit = e => {
    e.preventDefault();
    if (
      e.currentTarget.username.value.length < 1 ||
      e.currentTarget.password.value.length < 3
    )
      return;
    onSubmit({
      username: e.currentTarget.username.value,
      password: b64encode(e.currentTarget.password.value)
    });
  };

  const usernameInput = (
    <input
      id="username"
      name="username"
      className="form-control"
      type="text"
      value={credentials.username}
      onChange={handleFormChange}
    />
  );

  const passwordInput = (
    <input
      id="password"
      name="password"
      className="form-control"
      type="password"
      value={credentials.password}
      onChange={handleFormChange}
    />
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={b64Submit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          {usernameInput}
        </div>
        <div className="form-group">
          <label htmlFor="password">Pasword</label>
          {passwordInput}
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
