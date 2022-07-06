import {useState,useEffect} from 'react';
import React from 'react'
import axios from 'axios';
import UserComp from './UserComp';
import TodosNpostsComp from './TodosNpostsComp';
function FatherComp()
{
    const [todos,setTodos] = useState("")
    const [posts,setPosts] = useState("")
    const [users,setUsers] = useState("")
    const [searchContent,setSearchContent] = useState("")
    const [selectedUser,SetSelectedUser] = useState("")
useEffect(()=>
{
    async function fetchData() {
        let users = await axios.get('https://jsonplaceholder.typicode.com/users');
        users = users.data; //id
        let todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
        todos = todos.data; //userId
        let posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        posts = posts.data; //userId

        // users = users.map(user=>{
        //    let UserTodo = todos.filter(todo=> user.id === todo.userId)
        //    UserTodo.length = 10;
        //    let UserPosts = posts.filter(post=> user.id === post.userId)
        //    UserPosts.length = 10;
        //    return user = {...user, todos: UserTodo, posts: UserPosts}
        // })
        setUsers(users)
        setTodos(todos)
        setPosts(posts)
      }
      fetchData();
},[])
return(
<>
<div className="searchDiv">
Search: <input type="search" onInput={(e)=>setSearchContent(e.target.value.trim())} />
</div>
<div className="usersDiv">
{
    users && users.filter(user=>{
        if (!searchContent)
        return user;
        else if(user.name.toLowerCase().includes(searchContent) || user.email.toLowerCase().includes(searchContent))
            return user;
    }).map(user=>{return <React.Fragment key={user.id}>
        <div style={{border : todos.filter(t=>t.userId === user.id).every(task=>task.completed === true) ? "1px solid green" : "1px solid red", backgroundColor : selectedUser === user.id ? "#FED8B1" : "" }}>
            <UserComp data={user} idcallback={(id) => {SetSelectedUser(id)}} deletecallback={idFromUserComp=>{
                setUsers(users.filter(u=>u.id !== idFromUserComp))
                }}/>
            </div>
            <br/>
            </React.Fragment>
    })
}
</div>
{
    selectedUser && <TodosNpostsComp todos={todos.filter(t=>t.userId === selectedUser)} posts={posts.filter(p=>p.userId === selectedUser)} callback={(todoz,postz)=>{
         setTodos([...todos.filter(t=>t.userId !== selectedUser),...todoz])
         setPosts([...posts.filter(p=>p.userId !== selectedUser),...postz])}} />
}
</>)
}

export default FatherComp;