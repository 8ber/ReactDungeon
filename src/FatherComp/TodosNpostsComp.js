import {useState,useEffect} from 'react';
import React from 'react';
function TodosNpostsComp(props)
{
const [todos,setTodos] = useState([])
const [posts,setPosts] = useState([])

useEffect(()=>{
    setPosts(props.posts)
    setTodos(props.todos)
},[])

useEffect(()=>{
    props.callback(todos,posts)
},[todos,posts])

return(<>
<div className="todosDiv">
{
    todos && todos.map((t,i)=>{
        return <React.Fragment key={i}>
            <div style={{border: '1px solid black'}}>
            title: {t.title}<br/>
            completed: {t.completed.toString()}
            {t.completed === false ? 
            <input type="button" value="Mark completed" onClick={()=>
                {
                setTodos([{completed : true, title: t.title, id: t.id, userId: t.userId},...todos.filter(x=>x.id !== t.id)])
            }
        } /> 
            : null}
            </div>
            <br/>
            </React.Fragment>
    })
} 
</div>

<div className="postsDiv">
{
    posts && posts.map((p,i)=>{
        return <React.Fragment key={i}>
            <div style={{border: '1px solid black'}}>
            title: {p.title}<br/>
            body: {p.body}
            </div>
        <br/>
            </React.Fragment>
    })
} 
</div>




</>)
}

export default TodosNpostsComp;