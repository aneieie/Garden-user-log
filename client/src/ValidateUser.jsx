import GetUsers from './GetUsers';
import axios from 'axios';

const URL = "http://localhost:3000/user";


export default async function ValidateUser(user, setOpen, setErrorMsg, mode, setUpdate, userIndex, filterInfo, setUserList) {
    const name = user.name;
    const email = user.email;
    const status = user.status;
    let userState = true;

    async function SendAddedUser() {
      /* Construct added user */
      const newUser = {};

      if (user.role != "") {
        newUser.role = user.role;
      }
      
      newUser.name = user.name;
      newUser.email = user.email;
      newUser.status = user.status;


      /* Send added user */
      try {
        const {data} = await axios.post(URL + '/create', {
          data: newUser,
        });
      } catch (error) {
        /* Check this */
        setErrorMsg(error.message);
        userState = false;
      }
    }

    async function SendUpdatedUser() {

      const updatedUser = {};

      /* Constructing updated user */
      if (user.role != "") {
        updatedUser.role = user.role;
      }
      updatedUser.id = user.id;
      updatedUser.name = user.name;
      updatedUser.email = user.email;
      updatedUser.status = user.status;

        try{
            const {data} = await axios.post(URL + `/${user.id}`, {
                data: updatedUser,
            });
        } catch (error) {
            /* Check this */
            setErrorMsg(error.message);
            userState = false;
        }
    }


    /* FE: make sure there is a name, email, and status given */
    if (name === "" || email === "" || status === "") {
      userState = false;
    }

    
    if (userState) {
      if (mode === "add"){
  
        /* Add a new user to user list */
        /* Post user */
        SendAddedUser();

        /* Post filter - gets the users */
        const newUsers = await GetUsers(filterInfo);
        setUserList(newUsers);      
        if (userState) {
            setOpen(false);
        }

      } else if (mode === "update") {

        /* Send the updated user info to gina with the id - POST UPDATE */
        SendUpdatedUser();

        /* Refresh the page - resend the filter with - POST FILTER AXIOS */
        const newUsers = await GetUsers(filterInfo);
        setUserList(newUsers);

        if (userState) {
            setUpdate(false);
        }
      }

    }  else {
      setErrorMsg("Please fill in all required fields (*)");
    }
}