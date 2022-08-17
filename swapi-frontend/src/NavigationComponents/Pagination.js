import React from 'react'
import './Pagination.css'


export default function Pagination({gotoNextPage, gotoPrevPage, currentPageNumber, total})  {

    return (<>
        <h2 style={{color: 'white'}}>{total} total characters</h2>
      <div className="pagination">
        {gotoPrevPage && <button id="prev" onClick={gotoPrevPage}>Previous</button>}
        <button id="current">{currentPageNumber}</button>
        {gotoNextPage && <button id="next" onClick={gotoNextPage}>Next</button>}

      </div>
      </>
    )
  }
