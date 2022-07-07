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
        // console.log({name: itemName, quantity: itemQuantity, unit: itemUnit})
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
    }

    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
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
            </main>
            <ul>
                {itemList.map((item) => {
                return (<li key={item.id}>Name: {item.name}, Quantity: {item.quantity}, Unit: {item.unit}</li>)
                })}
            </ul>

        </div>
    );
}

export default App;
