import { useState } from 'react'
import axios from 'axios';

const URL = "http://localhost:3000/user";


export default function FilterPop ({setFilterInfo, filterInfo, setUserList}) {
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // async function ApplyFilter() {
  //   /* send the filter info AXIOS */
  //   try {
  //     const {data} =  await axios.post(URL, {
  //       data: filterInfo,
  //     });
  //     return data;

  //   } catch (error) {
  //     console.log(error);
  //   }
          
  // }

  async function ApplyFilter() {
    setFilterInfo(filterInfo => {return {...filterInfo, pageNum: 0}});
    const newUsers = GetUsers(filterInfo);
    setUserList(newUsers);
  }

  return (
    <div className='withFilter'>
      Filter by status:
      <div className='statusContainer'>
          <button className={`statusButton ${filterInfo.status == "ACTIVE" && "clickedFilt"}`} 
            onClick={() => setFilterInfo(filterInfo => {return {...filterInfo, status: "ACTIVE"}})}> 
            ACTIVE
          </button>
          <button className={`statusButton ${filterInfo.status == "INACTIVE" && "clickedFilt"}`} 
           onClick={() => setFilterInfo(filterInfo => {return {...filterInfo, status: "INACTIVE"}})}>  
            INACTIVE
          </button >
          <button className={`statusButton ${filterInfo.status == "SUSPENDED" && "clickedFilt"}`} 
          onClick={() => setFilterInfo(filterInfo => {return {...filterInfo, status: "SUSPENDED"}})}> 
            SUSPENDED
          </button>
        </div>
      Filter by date:
      <div className='DateContainer'>
        <div id='startDate'>
          <label className='dateLabel'>from:</label>        
          <input type='date' onChange={e => setFilterInfo(filterInfo => 
            {return {...filterInfo, startDate: e.target.value}})} value={filterInfo.startDate} />
        </div>
        <div id='endDate'>
          <label className='dateLabel'>to:</label>
          <input type='date' onChange={e => setFilterInfo(filterInfo => 
            {return {...filterInfo, endDate: e.target.value}})} value={filterInfo.endDate} />
        </div>
      </div>     
      <button className="confirmButt" onClick={() => ApplyFilter()}>confirm</button>
    </div>
  )
}