function ChangePage (mode) {
  if (mode === P) {
    /* Send Gina the request for the previous page */

    /* Refresh table with previous users in the UserList */

  } else {
    /* Next Page */

    /* Send Gina the request for the next page users */

    /* Refresh table with next users in the UserList */

  }

}

export default function FlipPage () {
  return (
    <div className='PageFlipContainer'>
        <div id='PrevPageIcon' onClick={() => ChangePage("P")}>🥕</div>
        <div id='PrevPage' onClick={() => ChangePage("P")}>prev</div>
        <div id='NextPage' onClick={() => ChangePage("N")}>next</div>
        <div id='NextPageIcon' onClick={() => ChangePage("N")}>🥕</div>        
    </div>
  )
}