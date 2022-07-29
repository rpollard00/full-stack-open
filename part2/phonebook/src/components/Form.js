import React from 'react'

const Form = (props) => {
  return (
    <form>
      <Input label="name" onChangeHandler={props.nameFieldHandler} value={props.contactName} />
      <Input label="phone" onChangeHandler={props.phoneFieldHandler} value={props.phoneNumber} />
      <Button type="submit" text="add" onClickHandler={props.contactHandler} />
    </form>
  )
}

const Input = ({label, onChangeHandler, value}) => {
  return (
    <div>
    {label}
    <input 
      onChange={onChangeHandler}
      value={value}>
    </input>
    </div>
  )
}

const Button = ({onClickHandler, type, text}) => {
  return (
      <button onClick={onClickHandler} type={type}>{text}</button>
  )
}


export default Form