import React from 'react';
import './Input.css';

function Input(props){

//states
  return (
    <form className = 'form' onSubmit ={props.getInput}>
        <input id='input' name = 'zipcode' placeholder= 'Zipcode...' />
        <button>Submit</button>
    </form>

  );
}

export default Input;
