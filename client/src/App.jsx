import { useState } from 'react'
import './App.css'


const user = {
  id: "",
  name: "",
  email: "",
  status: "",
  role: "",
  created: "",
  updated: "",
}

const UserList = [
  {
    id: "1",
    name: "Ginarr",
    email: "ginahale10@email.com",
    status: "ACTIVE",
    role: "Duck",
    created: "06/01/26",
    updated: "07/01/26",
  }, 
  {
    id: "2",
    name: "Johnny",
    email: "johncapybara@email.com",
    status: "SUSPENDED",
    role: "Capybara",
    created: "07/01/26",
    updated: "07/01/26",
  }
]


function Website() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Garden users log</h1>
        <ButtonBar setOpen={setOpen} />
        <Table />
        {open && <AddUser setOpen={setOpen} />}

    </>
  )
}


function ValidateUser({user}) {
  {/** FE: make sure there is a name, email, and status given*/}

  {/** Send to BE */}

  {/** Confirm from Gina, then add user to the UserList*/}

}


function AddUser({ setOpen }) {

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    status: "",
    role: "",
    created: "",
    updated: "",
  })

  return (
    <div className='AddUserContainer'>
      <div className="AddUserForm">
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
          <button className='submitButton' onClick={() => setOpen(false)}>  
            submit
          </button>
        </div>
      </div>

      {/** if you click on outside nothing happens - the states are reset and nothing is added */}
    </div>
  )
}



function ButtonBar({ setOpen }) {
  return (

    /* Potentially a counter here */

    <div className="buttonContainer">
      <button id="addUser" onClick={() => setOpen(open => !open)}>Add user</button>
    </div>    
  )
}


function Table() {

  return (
    <div class="UserTable">
      <div class="HeaderRow">
          <div class="header">
            ID
          </div>
          <div class="header">
            Name
          </div>
          <div class="header">
            Email
          </div>
          <div class="header">
            Status 
          </div>
          <div class="header">
            Role
          </div>
          <div class="header">
            Created At
          </div>
          <div class="header">
            Updated At
          </div>
      </div>

    {UserList.map(user => (
      <div class="UserRow">
        <div class="cell">
          {user.id}            
        </div>
        <div class="cell">
          {user.name}            
        </div>
        <div class="cell">
          {user.email}            
        </div>
        <div class="cell">
          {user.status}            
        </div>
        <div class="cell">
          {user.role}            
        </div>
        <div class="cell">
          {user.created}            
        </div>
        <div class="cell">
          {user.updated}            
        </div>
      </div>
    ))}
    </div>
  )
}

export default Website
