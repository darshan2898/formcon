import React from "react";
import { useGlobalContext } from "../../context/context";
import Loader from "../Loader";
import Notification from "../Notification";

const FormLayout = () => {
  const {
    titleInput,
    setTitleInput,
    setBodyInput,
    bodyInput,
    postFormData,
    isAlert,
    loading,
    notification,
    avatar,
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
        <div className="circle">
          <h1>{avatar}</h1>
        </div>
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
      {loading && <Loader />}
      {notification.status && <Notification />}
    </form>
  );
};

export default FormLayout;
