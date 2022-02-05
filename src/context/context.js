import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const url = "https://jsonplaceholder.typicode.com/users";

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [userAddress, setUserAddress] = useState({ id: "", address: "" });
  const [isId, setIsId] = useState("");
  const [mapStatus, setMapStatus] = useState(true);

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [formData, setFormData] = useState({ id: "", title: "", body: "" });
  const [isAlert, setIsAlert] = useState({ status: false, msg: "" });

  const getUsersList = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setUsersList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    if (isId) {
      setIsAlert({ status: false });
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${isId}`
        );
        const result = await response.json();
        const { id, address } = result;
        setUserAddress({ id, address });
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getUserData();
  }, [isId]);

  useEffect(() => {
    getUsersList();
  }, []);

  const handleMapLayout = (status) => {
    if (users) {
      setMapStatus(status);
    } else {
      setIsAlert({
        status: true,
        msg: "please select any user",
      });
    }
  };

  const postFormData = () => {
    if (titleInput && bodyInput) {
      if (titleInput.length >= 3) {
        setFormData({ id: isId, title: titleInput, body: bodyInput });
        setIsAlert({ status: false });
      } else {
        setIsAlert({
          status: true,
          msg: "title should be more than 2 character's",
        });
      }
    } else {
      setIsAlert({
        status: true,
        msg: "* marks fields are mandatory",
      });
    }
  };

  console.log(formData);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        usersList,
        setUserAddress,
        setIsId,
        mapStatus,
        setMapStatus,
        handleMapLayout,
        titleInput,
        setTitleInput,
        setBodyInput,
        bodyInput,
        postFormData,
        isAlert,
        setIsAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// API KEY :- AIzaSyAfzq5JkcevzvCJIbIuuTde5PpmmBKIuMI
