import React from 'react'

const Filter = ({ searchWord, handleSearchWord }) => {
  return (
    <div>filter shown with: 
        <input  value={searchWord} 
        onChange={handleSearchWord} 
        />
    </div>
  )
}

export default Filter