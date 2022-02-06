import { createContext, useContext, useEffect, useState } from "react";

//CONTEXT CREATION
const AppContext = createContext();

//JSON USERS API
const url = "https://jsonplaceholder.typicode.com/users";

export const AppProvider = ({ children }) => {
  //USERS
  const [users, setUsers] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isId, setIsId] = useState("");
  //MAPS
  const [mapStatus, setMapStatus] = useState(true);
  const [isAddress, setAddress] = useState("");
  //FORM
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  //NOTIFIERS
  const [isAlert, setIsAlert] = useState({ status: false, msg: "" });
  const [loading, setLoading] = useState("");
  const [notification, setNotification] = useState({ status: false, msg: "" });
  const [avatar, setAvatar] = useState("");

  // GETTING USERS LIST FROM API
  const getUsersList = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setUsersList(result);
    } catch (error) {
      console.log(error);
    }
  };

  //GETTING PARTICULAR USERS ADdRESS
  const getUserData = async () => {
    if (isId) {
      setIsAlert({ status: false });
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${isId}`
        );
        const result = await response.json();
        const { id, address } = result;
        //SETTING ADDRESS
        setAddress(address);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  //SETTING UP AVATAR
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

  // MAP LAYOUT HANDLERS
  const handleMapLayout = (status) => {
    if (users) {
      setMapStatus(status);
    } else {
      // ALERT FOR NOT SELECTION : USER
      setIsAlert({
        status: true,
        msg: "please select any user",
      });
    }
  };

  // POSTING FORM DATA ON SUBMIT
  const postFormData = () => {
    // FORM VALIDATIONS
    if (titleInput && bodyInput) {
      // TITLE LENGTH MORE THAN 2 CHARS
      if (titleInput.length >= 3) {
        const newData = { userId: isId, title: titleInput, body: bodyInput };
        // DATA POSTING TO JSON API
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
          // LOADING BEHAVIOR
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

  //PASSED VALUES
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
        isAddress,
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
