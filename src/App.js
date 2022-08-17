
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data,setData]=useState([]);
  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [email,setEmail]=useState("");
  const [id,setID]=useState("");


  useEffect(()=>{
const users=async()=>{
   const response= await axios.get('https://62fc66881e6a530698a5da42.mockapi.io/user');
  setData(response.data); 
  }
  users();
  },[]);
 


  const handleSubmit=async(e)=>{
     e.preventDefault();
     if(id){
      const response= await axios.put(`https://62fc66881e6a530698a5da42.mockapi.io/user/${id}`,{
      name,
      age,
      email,
   })
   console.log(data)
   var index=data.findIndex(row=>row.id===response.data.id);
   console.log(index);
   var user=[...data];
   user[index]=response.data;
   setData(user);  

     }
    else{
      const response= await axios.post('https://62fc66881e6a530698a5da42.mockapi.io/user',{
      name,
      age,
      email,
   }) 
   const user=[...data];
   user.push(response.data);
   setData(user);
    } 
  
     }
  const handleUpdate=async(id)=>{
    const selectedData=data.filter(row=>row.id===id)[0];
    setAge(selectedData.age);
    setName(selectedData.name);
    setEmail(selectedData.email);
    setID(selectedData.id)
    
 }

  const handleDelete=async(id)=>{

    // console.log(id);
   await axios.delete(`https://62fc66881e6a530698a5da42.mockapi.io/user/${id}`);
    const user=data.filter(row=>row.id!==id);
    setData(user);
 }
  return (
    <div id="body">
      <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value={name}
        onChange={(e)=>{setName(e.target.value)}}></input><br/>
        <label for="name">Age</label>
        <input type="text" id="age" name="age" value={age}
        onChange={(e)=>{setAge(e.target.value)}}></input><br/>
        <label for="email">Email</label>
        <input type="text" id="email" name="email" value={email}
        onChange={(e)=>{setEmail(e.target.value)}}></input><br/>
        <button type="submit">submit</button>
        <br/><br/>
        
        </form>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th colSpan={2}>Edit/Delete</th>
          </tr>
          {data.map(row=>{
            return( <tr>
             <td>{row.id}</td>
             <td>{row.name}</td>
             <td>{row.age}</td>
             <td>{row.email}</td>
             <td><button type="button" onClick={()=>handleUpdate(row.id)}>edit</button></td>
             <td><button type="button" onClick={()=>handleDelete(row.id)}>delete</button></td>
             </tr>
          )})}
        </table>
    </div>
  );
}

export default App;
