import React, { useState } from "react";
import Input from "./input";
import Joi from "@hapi/joi";

const GenericForm = ({
  onSubmit: liftUp,
  inputfields,
  formtitle,
  buttonlabel,
  divclass
}) => {
  // this local slice of state prevents re-rendering,
  // which will result in losing focus of the input box; onChange.
  const [localState, setLocalState] = useState({
    data: { username: "", password: "" },
    errors: {}
  });
  const { data, errors } = localState;
  const _schema = {}; // Joi schema object parameters.
  inputfields &&
    Object.keys(inputfields).forEach(
      name => (_schema[name] = inputfields[name].rules)
    );
  const schema = Joi.object(_schema);

  const validate = () => {
    const options = { abortEarly: false };
    const { error: err } = schema.validate(data, options);
    const msgs = {};
    if (err) {
      // fill the message queue with any validation errors
      err.details.forEach(item => (msgs[item.path[0]] = item.message));
    }
    return msgs;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error: err } = schema.validate(obj);
    return err && err.details[0].path[0] === name ? err.details[0].message : "";
  };

  const handleFormChange = ({ currentTarget: input }) => {
    const clonedErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) clonedErrors[input.name] = errorMessage;
    else delete clonedErrors[input.name];
    const clonedData = { ...data };
    clonedData[input.name] = input.value;
    setLocalState({ data: clonedData, errors: clonedErrors });
  };

  const renderInput = field => (
    <Input
      key={field}
      name={field}
      value={localState.data[field]}
      label={inputfields[field].label}
      type={inputfields[field].type || "text"}
      onChange={handleFormChange}
      error={localState.errors[field]}
    />
  );

  const renderButton = text => (
    <button
      disabled={Object.keys(validate()).length > 0}
      className="btn btn-primary"
    >
      {text}
    </button>
  );

  const onSubmit = e => {
    e.preventDefault();
    const cloned = { ...localState };
    liftUp(cloned);
  };
  return (
    <div className={divclass || `generic-form-${formtitle}`}>
      <h1>{formtitle}</h1>
      <form onSubmit={onSubmit}>
        {Object.keys(inputfields).map(field => renderInput(field))}
        {renderButton(buttonlabel)}
      </form>
    </div>
  );
};

export default GenericForm;
