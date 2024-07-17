import React, {useEffect, useState} from 'react';
import axios from 'axios';

// https://randomuser.me/api

const Counter = () => {
    const [count, setCounter] = useState(0);
    const [randomUserData, setRandomUserData] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    const fetchData = () => {
        return fetch('https://randomuser.me/api/?results=5')
    .then(response =>response.json())
    .then((data) => {
        console.log(data);
        setRandomUserData(JSON.stringify(data, null, 2));
        setUserInfo(data.results);
    }).catch(error => console.log(error));
}

    useEffect(() => {
        fetchData()
    },[]);

  return (
    <div>
        <h2>Counter</h2>
        <p>{count}</p>
        <button onClick={() => setCounter(count + 1)}>Increment</button>
        <pre>{randomUserData}</pre>
        {userInfo.map((user, index) => {
            return (
                <li key={index}>
                    Name: {user.name.first} {user.name.last}
                    Image: <img src={user.picture.large} alt={user.name.first} />
                </li>
            )
        })}
    </div>
  )
}

export default Counter;