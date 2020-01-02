import React from "react";
import GenericForm from "./common/genericForm";
import Joi from "@hapi/joi";

const inputfields = {
  username: {
    label: "Username",
    rules: Joi.string()
      .alphanum()
      .min(5)
      .max(30)
      .required()
      .label("Username")
  },
  password: {
    label: "Password",
    type: "password",
    rules: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(7)
      .required()
      .label("Password")
  }
};

const LoginForm = ({ onSubmit: liftUp }) => {
  const handleErrors = result => {
    console.log(result.errors);
  };
  const onSubmit = result => {
    result.errors.length > 0 ? handleErrors(result) : liftUp(result);
  };
  return (
    <GenericForm
      inputfields={inputfields}
      onSubmit={onSubmit}
      formtitle="Login"
      buttonlabel="Sign In"
    />
  );
};

export default LoginForm;
