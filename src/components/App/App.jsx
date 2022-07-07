import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {

    let [itemList, setItemList] = useState([]);

    useEffect(() => {
    
        getItems()

    }, [])
//get request
    const getItems = () => {
        axios.get('/list')
        .then(function (response) {
            console.log(response.data)
            setItemList( response.data )
            }).catch( function (error) {
                console.log( 'error in GET', error)
            })
    };
    //Post request
    function addItem(itemToAdd) {
        axios.post('/list', itemToAdd)
          .then(function (response) {
            console.log('Response from server.', response);
            //get items
            getItems()
          })
          .catch(function (error) {
            console.log('Error in POST', error);
            alert('Unable to add item at this time. Please try again later.');
          });
      }







    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
            </main>
        </div>
    );
}

export default App;
