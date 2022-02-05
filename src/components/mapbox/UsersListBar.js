import React from "react";
import { useGlobalContext } from "../../context/context";

const UsersListBar = () => {
  const { users, setUsers, usersList, setIsId, handleMapLayout, isAlert } =
    useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();
    handleMapLayout(false);
  };

  return (
    <div className="user_list_bar">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label
          htmlFor="users"
          style={{ color: `${isAlert.status ? `red` : `white`}` }}
        >
          {isAlert.status ? isAlert.msg : `Please Select A User`}
        </label>
        <select
          value={users}
          onChange={(e) => {
            setUsers(e.target.value);
            setIsId(e.target.value);
          }}
        >
          <option value="">click to select user</option>
          {usersList.map((user) => {
            const { id, name } = user;
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          })}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UsersListBar;
