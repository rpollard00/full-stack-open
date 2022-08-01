import React from 'react'

const Input = ({label, onChangeHandler, value}) => {
  return (
    <>
    {label}
    <input 
      onChange={onChangeHandler}
      value={value}>
    </input>
    </>
  )
}

const Search = ({searchFieldHandler, searchName}) => {
  return (
    <div>
      <Input label="filter shown with" onChangeHandler={searchFieldHandler} value={searchName} />
    </div>
  )
}

export default Search