import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header.jsx'
import './App.css';

function App() {

    let [itemList, setItemList] = useState([]);

    useEffect(() => {
    
        getItems()

    }, [])

    const getItems = () => {
        axios.get('/list')
        .then(function (response) {
            console.log(response.data)
            setItemList( response.data )
            }).catch( function (error) {
                console.log( 'error in GET', error)
            })
    };








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
