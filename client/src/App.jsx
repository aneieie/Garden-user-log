import { useState } from 'react'
import './App.css'


const UserList = [
  {
    id: "1",
    name: "Ginarr",
    email: "ginahale10@email.com",
    status: "ACTIVE",
    role: "Duck",
    createdAt: "06/01/26",
    updatedAt: "07/01/26",
    deletedAt: "",
  }, 
  {
    id: "2",
    name: "Johnny",
    email: "johncapybara@email.com",
    status: "SUSPENDED",
    role: "Capybara",
    createdAt: "07/01/26",
    updatedAt: "07/01/26",
    deletedAt: "",
  }
]


function Website() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    status: "",
    role: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [userIndex, setUserIndex] = useState(0);

  return (
    <>
      <h1>Garden users log</h1>
        <ButtonBar setOpen={setOpen} setUser={setUser} setErrorMsg={setErrorMsg} />
        <Table setUpdate={setUpdate} setUser={setUser} setErrorMsg={setErrorMsg} setUserIndex={setUserIndex} />
        {open && <AddUser setOpen={setOpen} user={user} setUser={setUser} setErrorMsg={setErrorMsg} errorMsg={errorMsg} 
        setUpdate={setUpdate} userIndex={userIndex} />}
        {update && <UpdateUser setUpdate={setUpdate} user={user} setUser={setUser} setOpen={setOpen}
        setErrorMsg={setErrorMsg} errorMsg={errorMsg} userIndex={userIndex} />}
    </>
  )
}

function UpdateUser({ setUpdate, user , setUser , setOpen, setErrorMsg, errorMsg, userIndex}) {
  return (
    /* Reusing the form and container from AddUser */
    <div className='AddUserContainer'>
      <div className='AddUserForm'>
        {/** Exiting */}
        <div className='ExitContainer'>
          <button className="ExitButton" onClick={() => setUpdate(false)}>x</button>
        </div>               
        <h2> Update gardener! </h2>

        <label>
          name*:
        </label>
        <input type="text" onChange={e => setUser(user => { return {...user, name: e.target.value}})}
         value={user.name} className='formText'/>
        <hr />

        <label>
          email*:
        </label>
        <input type="text" onChange={e => setUser(user => {return {...user, email: e.target.value}})}
         value={user.email} className='formText'/>
        <hr />
        <label>
        status*:
        </label>

        <div className='statusContainer'>
          <button className={`statusButton ${user.status == "ACTIVE" && "clicked"}`} 
            onClick={() => setUser(user => {return {...user, status: "ACTIVE"}})}> 
            {/** ${} allowed us to use JS inside of a string, if the button is clicked, the status 
             * will become accepted. Then the conditional statement means if the status is accepted,
             * then the class will also become clicked which will turn the bg color green.*/}
            ACTIVE
          </button>
          <button className={`statusButton ${user.status == "INACTIVE" && "clicked"}`} 
           onClick={() => setUser(user => {return {...user, status: "INACTIVE"}})}>  
            INACTIVE
          </button >
          <button className={`statusButton ${user.status == "SUSPENDED" && "clicked"}`} onClick={() => 
            setUser(user => {return {...user, status: "SUSPENDED"}})}> 
            SUSPENDED
          </button>
        </div>
        <hr />

        <label>
          role:
        </label>
        <input type="text" onChange={e => setUser(user => {return{...user, role:e.target.value}})} 
        value={user.role} className='formText'/>
        <hr />

        {/** Get confirmation from Gina - if accepted then proceed, if not then redo */}

        <div className='subButtonContainer'>
          <button className='submitButton' onClick={() => ValidateUser(user, setOpen, setErrorMsg, "update", setUpdate, userIndex)}>  
            submit changes
          </button>
          <p id='ErrorMsg'> {errorMsg} </p>
        </div>

      </div>
    </div>
  )
}

function ValidateUser(user, setOpen, setErrorMsg, mode, setUpdate, userIndex) {
    const name = user.name;
    const email = user.email;
    const status = user.status;
    let userState = true;


    /* FE: make sure there is a name, email, and status given */
    if (name === "" || email === "" || status === "") {
      userState = false;
    }

    /* Send to BE */


    /* Confirmation from Gina, then add user to the UserList*/
    if (userState) {
      if (mode === "add"){
        UserList.push(user);
        setOpen(false);
      }
      if (mode === "update") {
        /* add in changing the user in the list */
        UserList[userIndex].name = user.name;
        UserList[userIndex].email = user.email;
        UserList[userIndex].status = user.status;
        UserList[userIndex].role = user.role;
        setUpdate(false);
      }

    }  else {
      setErrorMsg("Please fill in all required fields (*)");
    }
  }

function AddUser({ setOpen , user , setUser , setErrorMsg, errorMsg, setUpdate, userIndex }) {

  return (
    <div className='AddUserContainer'>
      <div className="AddUserForm">
        {/** Exiting */}
        <div className='ExitContainer'>
          <button className="ExitButton" onClick={() => setOpen(false)}>x</button>
        </div>               
        <h2> Add a new gardener! </h2>

        <label>
          name*:
        </label>
        <input type="text" onChange={e => setUser(user => { return {...user, name: e.target.value}})}
         value={user.name} className='formText'/>
        <hr />

        <label>
          email*:
        </label>
        <input type="text" onChange={e => setUser(user => {return {...user, email: e.target.value}})}
         value={user.email} className='formText'/>
        <hr />
        <label>
        status*:
        </label>

        <div className='statusContainer'>
          <button className={`statusButton ${user.status == "ACTIVE" && "clicked"}`} 
            onClick={() => setUser(user => {return {...user, status: "ACTIVE"}})}> 
            {/** ${} allowed us to use JS inside of a string, if the button is clicked, the status 
             * will become accepted. Then the conditional statement means if the status is accepted,
             * then the class will also become clicked which will turn the bg color green.*/}
            ACTIVE
          </button>
          <button className={`statusButton ${user.status == "INACTIVE" && "clicked"}`} 
           onClick={() => setUser(user => {return {...user, status: "INACTIVE"}})}>  
            INACTIVE
          </button >
          <button className={`statusButton ${user.status == "SUSPENDED" && "clicked"}`} onClick={() => 
            setUser(user => {return {...user, status: "SUSPENDED"}})}> 
            SUSPENDED
          </button>
        </div>
        <hr />

        <label>
          role:
        </label>
        <input type="text" onChange={e => setUser(user => {return{...user, role:e.target.value}})} 
        value={user.role} className='formText'/>
        <hr />

        {/** Get confirmation from Gina - if accepted then proceed, if not then redo */}
        <div className='subButtonContainer'>
          <button className='submitButton' onClick={() => ValidateUser(user, setOpen, setErrorMsg, "add", setUpdate, userIndex)}>  
            submit
          </button>
          <p id='ErrorMsg'> {errorMsg} </p>
        </div>
      </div>

      {/** if you click on outside nothing happens - the states are reset and nothing is added */}

    </div>
  )
}



function ButtonBar({ setOpen, setUser, setErrorMsg}) {
  function handleOpen() {
    setErrorMsg("");
    setUser({
      id: "",
      name: "",
      email: "",
      status: "",
      role: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
    });
    setOpen(true);
  }
  return (

    /* Potentially a counter here */

    <div className="buttonContainer">
      <button id="addUser" onClick={() => handleOpen()}>Add user</button>
    </div>    
  )
}


function Table( { setUpdate , setUser, setErrorMsg, setUserIndex }) {

  function EnterUpdate(user, index) {
    /* I would parse in the id and find the user for the id within the list */
    // const user = UserList.find((user) => {
    //   return user.id === id
    // });
    setErrorMsg("");
    setUpdate(true);
    setUser(user);
    setUserIndex(index);
  } 

  function IndexByID(id) {
    const listLength = UserList.length;

    /* Can use user.find instead of this function */     
      
    for (let i = 0; i < listLength; i++) {
      if (id === UserList[i].id) {
        return i;
      }
    }
  }

  return (
    <div className="UserTable">
      <div className="HeaderRow">
          <div className='header'>
            Edit
          </div>
          <div className="header">
            ID
          </div>
          <div className="header">
            Name
          </div>
          <div className="header">
            Email
          </div>
          <div className="header">
            Status 
          </div>
          <div className="header">
            Role
          </div>
          <div className="header">
            Created At
          </div>
          <div className="header">
            Updated At
          </div>
      </div>

    {UserList.map(user => (
      <div className="UserRow">
        <div className='cell Update' onClick={ () => EnterUpdate(user, IndexByID(user.id)) }>
          ✏️
        </div>
        <div className="cell">
          {user.id}            
        </div>
        <div className="cell">
          {user.name}            
        </div>
        <div className="cell">
          {user.email}            
        </div>
        <div className="cell">
          {user.status}            
        </div>
        <div className="cell">
          {user.role}            
        </div>
        <div className="cell">
          {user.createdAt}            
        </div>
        <div className="cell">
          {user.updatedAt}            
        </div>
      </div>
    ))}
    </div>
  )
}

export default Website


// import { useState } from 'react'
// import { users } from './data'
// import { Modal } from './Modal'

// export const Users = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState();

//   const getUserDetail = (id) => {
//     const user = users.find((user) => {
//       return user.id === id
//     })
//     setIsOpen(true)
//     setUser(user)
//   }
//   const updateUser = (user, id) => {
//     // logic
//   }

//   return (

//     <div >
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen} user={user} updateUser={updateUser} />
//       <h1>Hello</h1>
//       <div className='w-10/12 mx-auto'>
//         {users.map((user) => (
//           <ul key={user.id} className='border-2 my-2 p-2'>
//             <li className='cursor-pointer' onClick={() => getUserDetail(user.id)}>Icon edit</li>
//             <li>{user.id}</li>
//             <li>{user.name}</li>
//             <li>{user.email}</li>
//             <li>{user.role}</li>
//           </ul>
//         ))}
//       </div>
//     </div >
//   )
// }