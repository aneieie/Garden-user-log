async function ChangePage (mode, filterInfo, setFilterInfo, setUserList) {
  /* PLACEHOLDER */
  const maxPageIndex = 20;

  if (mode === P) {
    /* Send Gina the request for the previous page */
    /* POST FILTER WITH DECREMENTED PAGE COUNT */ 
    if (filterInfo.pageNum > 0) {
      setFilterInfo(filterInfo => {return { ...filterInfo, pageNum: filterInfo.pageNum - 1 }});
    }

  } else {
    /* Next Page */
    /* INCREMENT PAGE COUNT */
    if (filterInfo.pageNum < maxPageNum) {
      setFilterInfo(filterInfo => {return {...filterInfo, pageNum: filterInfo.pageNum - 1}})
    }
    
  }
  /* Refresh table with previous users in the UserList ONEFFECT?*/
    const newUsers = await GetUsers(filterInfo);
    setUserList(newUsers);
}

export default function FlipPage ({ filterInfo, setFilterInfo, setUserList }) {
  return (
    <div className='PageFlipContainer'>
        <div id='PrevPageIcon' onClick={() => ChangePage("P", filterInfo, setFilterInfo, setUserList)}>🥕</div>
        <div id='PrevPage' onClick={() => ChangePage("P", filterInfo, setFilterInfo, setUserList)}>prev</div>
        <div id='NextPage' onClick={() => ChangePage("N", filterInfo, setFilterInfo, setUserList)}>next</div>
        <div id='NextPageIcon' onClick={() => ChangePage("N", filterInfo, setFilterInfo, setUserList)}>🥕</div>        
    </div>
  )
}