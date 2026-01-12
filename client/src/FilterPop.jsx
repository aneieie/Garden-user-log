import { useState } from 'react'

export default function FilterPop () {
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className='withFilter'>
      Filter by status:
      <div className='statusContainer'>
          <button className={`statusButton ${statusFilter == "ACTIVE" && "clickedFilt"}`} 
            onClick={() => setStatusFilter("ACTIVE")}> 
            ACTIVE
          </button>
          <button className={`statusButton ${statusFilter == "INACTIVE" && "clickedFilt"}`} 
           onClick={() => setStatusFilter("INACTIVE")}>  
            INACTIVE
          </button >
          <button className={`statusButton ${statusFilter == "SUSPENDED" && "clickedFilt"}`} onClick={() => 
            setStatusFilter("SUSPENDED")}> 
            SUSPENDED
          </button>
        </div>
      Filter by date:
      <div className='DateContainer'>
        <div id='startDate'>
          <label className='dateLabel'>from:</label>        
          <input type='date' onChange={e => setStartDate(e.target.value)} value={startDate} />
        </div>
        <div id='endDate'>
          <label className='dateLabel'>to:</label>
          <input type='date' onChange={e => setEndDate(e.target.value)} value={endDate} />
        </div>
      </div>     
      <button>confirm</button>
    </div>
  )
}