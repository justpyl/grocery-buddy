import React, { useRef, useState } from 'react'
import { v4 as uuid} from "uuid";
import GroceryItemComponent from './GroceryItemComponent';
const GroceryComponent = () => {
    const inputRef = useRef();
    const [item, setItem]= useState("");
    const [groceryItems , setGroceryItems] = useState([]);
    const [error, setError] = useState("");

    const handleAddItem = () => {
        if(item){
            setGroceryItems([...groceryItems, {id: uuid(), name: item}])
            setItem("")
            setError("");
        }else{
            setError("Grocery item connot be empty");
            inputRef.current.focus();
        }
       
    }

    const  handleEditItem = (id, newItem) =>{
        const updateGroceryItems = groceryItems.map((item) => {
            if(item.id === id){
                return {...item, name: newItem};
            }
            return item;
        });
        setGroceryItems(updateGroceryItems);
    };
    const handleDeleteItem = (removeId) => {
        const filteredItems = groceryItems.filter((item) => item.id !== removeId);
        setGroceryItems(filteredItems);
    }
    const handleClearItems = () => {
        setGroceryItems([]);
    }

  return (
    <div className='grocery-buddy'>
        <h1>Grocery Buddy</h1>
        <div className='input-section'>
            <div className='input-container'>
                <input  ref={inputRef}type="text" placeholder='Enter Item' value={item} onChange={(event) => setItem(event.target.value)} />
                <button  onClick={handleAddItem} className='btn-add'>add item</button>
            </div>
            <div>{error ? <p className='errors'>{error}</p> :null }</div>
        </div>
        <ul className='grocery-list'>
            {groceryItems.map((item) => <GroceryItemComponent key={item.id} item={item} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem}/>)}
        </ul>
        {groceryItems.length > 0 ? 
        <button onClick={handleClearItems} className='btn-clear'>Clear Item List</button>
        : null};
        </div>
  )
}

export default GroceryComponent