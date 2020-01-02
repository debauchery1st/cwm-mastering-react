import React, { useState, useEffect } from "react";
import { b64decode, b64encode } from "./madmurphy";
import HiLighter from "./hilightJSON";
import "./chillout.css";
/*
  example usage:

  // yourApp.js

  // a slice of state
  const [appState, setAppState] = useState({});

  //  the component handler
  const handleThawedState = thawed => {
    // verify the object, then set the state,  
    setAppState(thawed);
  };

  // component declaration (you can send any object to the component using props)
  const freezerComponent = () => (
    <Chillout contents={{ ...appState }} onSubmit={handleThawedState} />
  );

  // component implementation
  <Route path="/devTools" exact component={freezerComponent} />

*/

const Chillout = props => {
  const { contents, onSubmit } = props;
  const [formInit, setFormInit] = useState(false);

  const [stasis, setStasis] = useState({
    textValue: "",
    objectValue: {}
  });

  useEffect(() => {
    if (!formInit) {
      setFormInit(true);
      console.log("<Chillout />");
    }
  }, [formInit]);

  const freezeContents = () => {
    if (!contents.length > 5) return;
    const cloned = { ...stasis };
    cloned.textValue = b64encode(JSON.stringify(contents));
    cloned.objectValue = contents;
    setStasis(cloned);
  };

  const thawContents = e => {
    e.preventDefault();
    const cloned = { ...stasis };
    const thawed = JSON.parse(b64decode(cloned.textValue));
    if (!thawed) return;
    cloned.objectValue = thawed;
    onSubmit(thawed); // forward the object for further processing.
  };

  const handleFormChange = ({ currentTarget: input }) => {
    const cloned = { ...stasis };
    cloned.textValue = input.value;
    setStasis(cloned);
  };

  const cryoInput = (
    <textarea
      id="stasis"
      name="stasis"
      className="form-control"
      value={stasis.textValue}
      onChange={handleFormChange}
    />
  );
  // const pasteCB = () => {
  //   // react doesn't like this function
  //   navigator.clipboard.readText().then(cb => {
  //     const cloned = { ...stasis };
  //     cloned.textValue = cb.trim();
  //     setStasis(cloned);
  //   });
  // };
  return (
    <div className="chillout-div">
      <h1>Freeze</h1>
      <form onSubmit={thawContents}>
        <div className="form-group">
          <br />
          <button className="btn btn-danger chillout-btn">Thaw</button>
          {/* <button onClick={pasteCB} className="btn btn-primary chillout-btn">
            Paste
          </button> */}
          {cryoInput || ""}
        </div>
      </form>
      <button onClick={freezeContents} className="btn btn-primary chillout-btn">
        Freeze
      </button>
      <button
        onClick={() => navigator.clipboard.writeText(stasis.textValue)}
        className="btn btn-secondary chillout-btn"
      >
        Copy
      </button>
      <div className="alert alert-warning chillout-json-window">
        <HiLighter json={stasis.objectValue} />
      </div>
    </div>
  );
};

export default Chillout;
