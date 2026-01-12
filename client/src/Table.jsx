export default function Table( { setUpdate , setUser, setErrorMsg, setUserIndex, userList }) {

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
    const listLength = userList.length;

    /* Can use user.find instead of this function */     
      
    for (let i = 0; i < listLength; i++) {
      if (id === userList[i].id) {
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
          {/* <div className="header">
            ID
          </div> */}
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

    {userList.map(user => (
      <div className="UserRow">
        <div className='cell Update' onClick={ () => EnterUpdate(user, IndexByID(user.id)) }>
          ✏️
        </div>
        {/* <div className="cell">
          {user.id}            
        </div> */}
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