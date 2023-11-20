import axios from "axios";
import { useState } from "react";

function LoginX() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          username,
          password,
          role,
        });
        setToken(response.data.token);
        setMessage('Login successful!');
      } catch (error) {
        console.error('Login error:', error);
        setMessage('Login failed!');
      }
    };
  
    const handleSuperAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected/superAdmin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('SuperAdmin error:', error);
        setMessage('Access denied!');
      }
    };
  
    const handleAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Admin error:', error);
        setMessage('Access denied!');
      }
    };
  
    const handleExecutive = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected/executive', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error('Executive error:', error);
        setMessage('Access denied!');
      }
    };
  
    return (
      <div className="App" style={{border:"solid 4px black" ,  width : "40%"  , margin:"auto" , marginTop:"10%"}}>
        <h1>JWT Authentication Demo</h1>
        <div>
          <label>Username:</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           type="text" onChange={(e) => setRole(e.target.value)} />
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogin}>Login</button>
        <hr />
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSuperAdmin}>Super Admin</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleAdmin}>Admin</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleExecutive}>Executive</button>
        </div>
        <div>
          <h2>{message}</h2>
        </div>
      </div>
    );
  }
  

  export default LoginX