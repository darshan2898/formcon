import React from "react";
import { useGlobalContext } from "../../context/context";

const FormLayout = () => {
  const {
    titleInput,
    setTitleInput,
    setBodyInput,
    bodyInput,
    postFormData,
    isAlert,
  } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
        postFormData();
      }}
    >
      <div className="avatar">
        <div className="circle"></div>
      </div>
      <div className="common">
        <label htmlFor="title">
          {isAlert.status ? (
            <span>{isAlert.msg}</span>
          ) : (
            `
          title`
          )}
          <span style={{ marginLeft: "0.2em" }}>*</span>
        </label>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => {
            setTitleInput(e.target.value);
          }}
        />
      </div>
      <div className="common">
        <label htmlFor="body">
          body <span>*</span>
        </label>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="5"
          value={bodyInput}
          onChange={(e) => {
            setBodyInput(e.target.value);
          }}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormLayout;
