export default function PhonebookListItem({ personObj, deleteButton }) {
  return (
    <li>
      <strong>{personObj.name}</strong> - {personObj.number}&nbsp; &nbsp;
      <button type="button" value={personObj.id} onClick={deleteButton}>Delete</button>
    </li>
    
  )
}