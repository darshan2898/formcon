import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const url = "https://jsonplaceholder.typicode.com/users";

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isId, setIsId] = useState("");
  const [mapStatus, setMapStatus] = useState(true);

  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [isAlert, setIsAlert] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState("");
  const [notification, setNotification] = useState({ status: false, msg: "" });

  const [avatar, setAvatar] = useState("");

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
        console.log(address);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const setUpAvatar = () => {
    if (isId) {
      setAvatar(isId);
    }
  };

  useEffect(() => {
    getUserData();
    setUpAvatar();
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
        const newData = { userId: isId, title: titleInput, body: bodyInput };
        const postData = async () => {
          setLoading(true);
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
              method: "POST",
              body: JSON.stringify(newData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          setLoading(false);
          if (result.userId) {
            setNotification({ status: true, msg: "Data Added SuccessFully." });
          } else if (!result.userId) {
            setNotification({
              status: true,
              msg: "oops! something went wrong please try again.",
            });
          }
          console.log();
        };
        postData();
        setIsAlert({ status: false });
      } else {
        setIsAlert({
          status: true,
          msg: "title should be more than 2 character's",
        });
      }
      setTitleInput("");
      setBodyInput("");
    } else {
      setIsAlert({
        status: true,
        msg: "* mark fields are mandatory",
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        usersList,
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
        loading,
        notification,
        setNotification,
        avatar,
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
