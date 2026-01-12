import { useState } from 'react'
import './App.css'
import Table from './Table';
import FlipPage from './FlipPage';
import FilterPop from './FilterPop';
import ValidateUser from './ValidateUser';
import GetUsers from './GetUsers';


const URL = "http://localhost:3000/user";


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
  const [filter, setFilter] = useState(false);
  const [filterInfo, setFilterInfo] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    page: 0,
    limit: 10,
  });
  
  const [userList, setUserList] = useState([]);

  return (
    <>
      <Search filterInfo={filterInfo} setFilterInfo={setFilterInfo} setUserList={setUserList} />
      <h1>Garden users log</h1>
        <ButtonBar setOpen={setOpen} setUser={setUser} setErrorMsg={setErrorMsg} setFilter={setFilter} />
        {filter && <FilterPop setFilterInfo={setFilterInfo} filterInfo={filterInfo} 
        setUserList={setUserList} />}
        <Table setUpdate={setUpdate} setUser={setUser} setErrorMsg={setErrorMsg} 
        setUserIndex={setUserIndex} userList={userList}/>
        {open && <AddUser setOpen={setOpen} user={user} setUser={setUser} setErrorMsg={setErrorMsg} errorMsg={errorMsg} 
        setUpdate={setUpdate} userIndex={userIndex} filterInfo={filterInfo} setUserList={setUserList} />}
        {update && <UpdateUser setUpdate={setUpdate} user={user} setUser={setUser} setOpen={setOpen}
        setErrorMsg={setErrorMsg} errorMsg={errorMsg} userIndex={userIndex} filterInfo={filterInfo} setUserList={setUserList} />}
        <FlipPage filterInfo={filterInfo} setFilterInfo={setFilterInfo} setUserList={setUserList} />
    </>
  )
}



function Search ({filterInfo, setFilterInfo, setUserList}) {

  async function handleSearch () {
    /* Reset page count */
    setFilterInfo(filterInfo => {return {...filterInfo, pageNum: 0}});

    /* make UserList the list she sends - use useEffect next time */
    const newUsers = await GetUsers(filterInfo);
    setUserList(newUsers);
  }

  return (
    <div id="SearchBar">
      <input type='text' onChange={e => setFilterInfo(filterInfo => {return {...filterInfo, name: e.target.value}})} value={filterInfo.name} 
      className='SearchTextBox' placeholder='🔍 Search by name' onKeyDown={e => { if
        (e.key === "Enter") handleSearch(); 
      }} />
      <hr />

    </div>
  )
  
}

function UpdateUser({ setUpdate, user , setUser , setOpen, setErrorMsg, errorMsg, userIndex, filterInfo, setUserList}) {
  async function DeleteUser() {
    /* Delete user */
    async function SendDelete() {
      try {
        const {data} = await axios.delete(URL + `/${user.id}`)
      } catch(error) {
        console.log(error);
      }
    }

    /* Get Users again */
    const newUsers = await GetUsers(filterInfo);
    setUserList(newUsers);
    
    
    setUpdate(false);
  }

  return (
    /* Reusing the form and container from AddUser */
    <div className='AddUserContainer'>
      <div className='AddUserForm'>
        {/** Exiting */}
        
        <div className='ExitContainer'>
          {/** Delete button */}
          <button className='DeleteButton' onClick={() => DeleteUser()} >🗑️</button>

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
          <button className='submitButton' onClick={() => ValidateUser(user, setOpen, setErrorMsg, "update", setUpdate, userIndex, filterInfo, setUserList)}>  
            submit changes
          </button>

          <p id='ErrorMsg'> {errorMsg} </p>
        </div>

      </div>
    </div>
  )
}


function AddUser({ setOpen , user , setUser , setErrorMsg, errorMsg, setUpdate, userIndex, filterInfo, setUserList }) {

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
          <button className='submitButton' onClick={() => ValidateUser(user, setOpen, setErrorMsg, "add", setUpdate, userIndex, filterInfo, setUserList)}>  
            submit
          </button>
          <p id='ErrorMsg'> {errorMsg} </p>
        </div>
      </div>

      {/** if you click on outside nothing happens - the states are reset and nothing is added */}

    </div>
  )
}



function ButtonBar({ setOpen, setUser, setErrorMsg, setFilter}) {

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
      <button id="Filter" onClick={() => setFilter(filter => !filter)}>🕸️ Filter 🕸️</button>
      <button id="addUser" onClick={() => handleOpen()}>Add user</button>
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