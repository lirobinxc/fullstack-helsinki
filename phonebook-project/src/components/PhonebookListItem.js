import React from 'react'

export default function PhonebookListItem({ personObj, deleteButton }) {
  return (
    <li className="person">
      <strong>{personObj.name}</strong> - {personObj.number}&nbsp; &nbsp;
      <button type="button" value={personObj.id} onClick={deleteButton}>Delete</button>
    </li>
    
  )
}