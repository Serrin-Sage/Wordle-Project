import React from 'react'

function Header() {
  function refreshPage() {
      window.location.reload(false);
    }
  return (
    <div className="header">
        <div className='left-container'>

        </div>
        <div className='middle-container'>
            <h1 className="title">Wordle Project</h1>
        </div>
        <div className="right-container">
          <button onClick={refreshPage} className="reset-button">New Word</button>
        </div>
    </div>
  )
}

export default Header