import React, { useState } from 'react'

const GroceryItemComponent = ({item, handleEditItem, handleDeleteItem}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newItem, setNewItem] = useState(item.name);
    const [error, setError] = useState("");

    const onEdit = () => {
        if(newItem){
            handleEditItem(item.id, newItem);
            setIsEditing(false);
            setError("")
        }else{
            setError("grocery items must not be empty")
        }
       
    }

  return (
   <>
    <li>
        {isEditing ? (
        <input type='text'
        value={newItem} 
        onChange={(event) => setNewItem(event.target.value)}
        />
        ):(<span>{item.name}</span>)}

        <div>
            <button onClick={() => {isEditing ? onEdit() : setIsEditing(true)}} className='btn-edit'>
                {isEditing ? "Save" : "Edit"}
            </button>
            <button onClick={() => handleDeleteItem(item.id)} className='btn-delete'>Delete</button>
        </div>
    </li>
    {error ?<p className='errors'>{error}</p>: null}
   </>
  )
}

export default GroceryItemComponent