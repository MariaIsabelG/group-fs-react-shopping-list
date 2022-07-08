import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {

    let [itemList, setItemList] = useState([]);
    let [itemName, setItemName] = useState('');
    let [itemQuantity, setItemQuantity] = useState('');
    let [itemUnit, setItemUnit] = useState('');

    useEffect(() => {
        getItems()
    }, [])

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     addItem();
    // }

    //Get request
    const getItems = () => {
        axios.get('/list')
        .then((response) => {
            console.log(response.data)
            setItemList( response.data )
        }).catch((error) => {
            console.log( 'error in GET', error)
        })
    };

    //Post request and click event
    const addItem = (event) => {
        // to stop form reloading
        event.preventDefault();
        axios.post('/list', {name: itemName, quantity: itemQuantity, unit: itemUnit})
        .then((response) => {
            console.log('Response from server:', response);
            //Get items
            getItems();
        })
        .catch((error) => {
            console.log('Error in POST', error);
            alert('Unable to add item at this time. Please try again later.');
        });
        setItemName('');
        setItemQuantity('');
        setItemUnit('');
    };

    //delete function
    const deleteItem = (item) =>{
    // console.log('Here is the item.id', item)
    axios.delete(
    `/list/${item}`
    ).then(()=> {
    getItems()
    }).catch(function(error) {
    alert('Something went wrong in the DELETE /list :(', error)
    })
    };

    // clear function
    const clearList = () => {
        console.log('clicked clearList')
        axios.delete(`/list`)
        .then(() => {
        getItems()
        }).catch((error) => {
        alert('Something went wrong in the CLEAR /list', error)
        })
    };

    // update PUT request
    const purchasedItem = (item) => {
    
    axios.put(
    `/list/${item}`
    ).then((response) => {
    getItems();
    console.log('Item is purchased:', item);
    }).catch(function(error){
    alert('Something went wrong in the PUT /list :(')
    })
    };

// reset PUT request
    const resetList = () => {
    
    axios.put('/list')
    .then((response) => {
    getItems();
    console.log('Item is purchased');
    }).catch(function(error){
    alert('Something went wrong in the PUT reset /list :(')
    })
    };



    return (
        <div className="App">
            <Header />
            <main>
            <h2>Add an Item:</h2>
            <form onSubmit={addItem}>
                <label htmlFor="name-input">Item:</label>
                    <input id="name-input" onChange={e => setItemName(e.target.value)} value={itemName}/>
                <label htmlFor="quantity-input">Quantity:</label>
                    <input id="quantity-input" onChange={e => setItemQuantity(e.target.value)} value={itemQuantity}/>
                <label htmlFor="unit-input">Unit:</label>
                    <input id="unit-input" onChange={e => setItemUnit(e.target.value)} value={itemUnit}/>
                <button type="onSubmit">Submit</button>
            </form> 
            <button className = "button reset" onClick={() => resetList(itemList)}>Reset List</button>
            <button className = "button clear" onClick={() => clearList(itemList)}>Clear List</button>
            </main>
            <div className = "stack-containers">
                <div>
                    {itemList.map((item) => {
                    return (<h5 key={item.id}>Name: {item.name}, Quantity: {item.quantity}, Unit: {item.unit}
                        {item.purchased ? <p>Purchased!</p> :
                        <>
                        <button data-id = {item.id} className = "button delete" onClick={() => deleteItem(item.id)}>Delete</button> 
                        <button data-id={item.id} className = "button completed" onClick={() => purchasedItem(item.id)} >Purchased</button>
                        </>
                        }
                        </h5>)
                    })}
                </div>
            </div>
        </div>
    )
};


  //end delete function

export default App;