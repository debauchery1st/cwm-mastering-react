import React, { useState } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "@hapi/joi";

const GenericForm = ({
  onSubmit,
  inputfields,
  formtitle,
  buttonlabel,
  divclass,
  state
}) => {
  const [genericState, setGenericState] = useState(
    !state
      ? {
          data: {},
          errors: {}
        }
      : state
  );
  const _schema = {}; // Joi schema object parameters.
  inputfields &&
    Object.keys(inputfields).forEach(name => {
      if (Object.keys(inputfields[name]).includes("rules"))
        _schema[name] = inputfields[name].rules;
      !genericState.data[name] && (genericState.data[name] = "");
    });
  const schema = Joi.object(_schema);
  //const noSnakes = arr => arr.filter(n => !n.startsWith("_"));
  const validate = () => {
    const options = { abortEarly: false };
    const { error: err } = schema.validate(genericState.data, options);
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
    return err && err.details[0].path[0] === name
      ? err.details[0].message
      : false;
  };

  // useEffect(() => {
  //   const cloned = { ...genericState };
  //   console.log("UseEffect", cloned);
  // }, [genericState]);

  const handleInputChange = ({ currentTarget: input }) => {
    const name = input.name;
    const value = input.value;
    const cloned = { ...genericState };
    const errorMessage = validateProperty({ name, value });
    cloned.data[name] = value;
    errorMessage
      ? (cloned.errors[name] = errorMessage)
      : delete cloned.errors[name];
    setGenericState(cloned);
  };

  const handleSelectChanged = (name, value) => {
    // console.log(name, value);
    const cloned = { ...genericState };
    cloned.data[name] = value;
    setGenericState(cloned);
  };

  const renderButton = text => (
    <button
      disabled={Object.keys(validate()).length > 0}
      className="btn btn-primary"
    >
      {text}
    </button>
  );
  // debugger;
  const inputComponents = Object.keys(inputfields).map(field =>
    inputfields[field].type === "select" ? (
      <Select
        key={field}
        label={inputfields[field].label}
        options={inputfields[field].options}
        onChange={value => handleSelectChanged(field, value)}
      />
    ) : (
      <Input
        key={field}
        name={field}
        value={genericState.data[field]}
        label={inputfields[field].label}
        type={inputfields[field].type}
        onChange={handleInputChange}
        error={genericState.errors[field]}
      />
    )
  );
  const handleSubmit = e => {
    e.preventDefault();
    const cloned = { ...genericState };
    onSubmit(cloned);
  };
  return (
    <div className={divclass || `generic-form-${formtitle}`}>
      <h1>{formtitle}</h1>
      <form onSubmit={handleSubmit}>
        {inputComponents}
        {renderButton(buttonlabel)}
      </form>
    </div>
  );
};

export default GenericForm;
