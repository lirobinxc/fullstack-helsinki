export default function PhonebookListItem({ personObj, deleteButton }) {
  return (
    <li className="person">
      <strong>{personObj.name}</strong> - {personObj.number}&nbsp; &nbsp;
      <button type="button" value={personObj._id} onClick={deleteButton}>Delete</button>
    </li>
    
  )
}