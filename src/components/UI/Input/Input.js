import styles from './Input.module.css'
import React, { useRef, useImperativeHandle } from 'react'


const Input = React.forwardRef((props, ref) => {

  const inputRef = useRef()

  const activate = () => {
    inputRef.current.focus()
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  })
  const invalidInput = props.hasErrors ? styles['invalid'] : ''
  return (
    <div className={`${styles['login-control']}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className={invalidInput}
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputRef} />
    </div>
  )
});

export default Input