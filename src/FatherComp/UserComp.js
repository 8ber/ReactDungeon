import {useState,useEffect} from 'react';
import axios from 'axios';

function UserComp(props)
{
const [isSelected,SetIsSelected] = useState("")
const [isHover,SetIsHover] = useState(false)
const [data,setData] = useState({id: "", name: "", email: "", todos: [], posts: [], address: {street : "", city : "", zipcode: ""}})

useEffect(()=>{
    props.idcallback(isSelected)
},[isSelected])

useEffect(()=>{
    setData(props.data)
},[])
const putReq = async () =>
{
    let resp = await axios.put(`https://jsonplaceholder.typicode.com/users/${data.id}`);
    console.log(resp.data)
}
const delReq = async () =>
{
    let resp = await axios.delete(`https://jsonplaceholder.typicode.com/users/${data.id}`);
    console.log(resp.data)
    props.deletecallback(data.id)
}
return(
<>

<span onClick={()=>isSelected ? SetIsSelected("") : SetIsSelected(data.id)}>ID: <input type="number" value={data.id} readOnly/>
</span>
<br/>
Name: <input type="text" value={data.name} onChange={e=>{setData({...data,name: e.target.value})}}/> 
<br/>
Email: <input type="email" value={data.email} onChange={e=>{setData({...data,email: e.target.value})}} />
<br/>
{
    isHover && (<>
    Street: <input type="text" value={data.address.street} onChange={e=>{setData({...data,address : {...data.address, street: e.target.value}})}}/><br/>
    City: <input type="text" value={data.address.city} onChange={e=>{setData({...data,address : {...data.address, city: e.target.value}})}}/><br/>
    Zipcode: <input type="text" value={data.address.zipcode} onChange={e=>{setData({...data,address : {...data.address, zipcode: e.target.value}})}}/><br/>
    </>)
}
<button onMouseOver={()=>{SetIsHover(true)}} onClick={()=>{SetIsHover(false)}}>Other Data</button>
<button onClick={putReq}>Update</button>
<button onClick={delReq}>Delete</button>



</>)
}

export default UserComp;