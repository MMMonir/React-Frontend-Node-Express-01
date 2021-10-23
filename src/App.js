import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[]);
const handleAddUser = e => {
  const name = nameRef.current.value;
  const email = emailRef.current.value;
  const newUser = {name: name, email: email}
  fetch('http://localhost:5000/users', {
          method : 'post',
          headers : {'content-type' : 'application/json'},
          body: JSON.stringify(newUser) })

  .then(res => res.json())
  .then(data => {
          const addUser = data;
          const newUsers = [...users, addUser];
          setUsers(newUsers) })
  
  nameRef.current.value='';
  email.current.value='';
  e.preventDefault();
}
  
  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} required="Your Name"/>&nbsp;&nbsp;
        <input type="email" ref={emailRef} required="Your Email" />&nbsp;&nbsp;
        <input type="submit" value="Submit" />
      </form>
      <h2>Find users: {users.length}</h2>
      <ul>
        {
          users.map(user => <li key={user.id}>ID: {user.id}, Name: {user.name}, Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
