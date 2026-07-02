import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteHabits } from '../redux/features/HabitSlice'
const DeleteCard = ({setRemove,id}) => {
    const dispatch = useDispatch()

    const deleteHandle= async()=>{
        const result = await dispatch(deleteHabits(id))
        if(!result.error){
            setRemove(false)
        }
    }
  return (
    <div><p>do you wanna delete this habit </p>
    <button onClick={deleteHandle}>yes</button>
    <button onClick={()=>{setRemove(false)}}>no</button></div>
  )
}

export default DeleteCard