import React, { useEffect, useState } from 'react'
const DeleteCard = ({setRemove,id}) => {
  return (
    <div><p>do you wanna delete this habit </p>
    <button onClick={()=>{console.log(id)}}>yes</button>
    <button onClick={()=>{setRemove(false)}}>no</button></div>
  )
}

export default DeleteCard