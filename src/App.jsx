import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import './App.css'
function App() {
    const BASE_URL = 'https://65939d151493b0116068c793.mockapi.io'
    const [todos,setTodos] = useState([])
    const [isLoading , setisLoading] = useState(true)
    async function fetchTodo(){
        try{
            const response = await axios.get(`${BASE_URL}/todos`)
            console.log(response)
            setTodos(response.data)
            setisLoading(false)
        }
        catch (error){
            console.log('error',error)
        }
    }
    async function deleteTodo(id) {
        try{
            setisLoading(true)
            const response = await axios.delete(`${BASE_URL}/todos/${id}`)
            console.log(response)
            await fetchTodo()
            setisLoading(false)
        }
        catch (error){
            console.log('error',error)
        }
    }
    useEffect(() => {
        fetchTodo()
    },[])
  return (
    <>
        {
            isLoading && (<div>Loading....</div>)
        }
        { !isLoading &&
        <div>
        {
            todos.map((todo , index) => {
                return(
                    <div key={index} className='container'>
                        {todo.id}
                        {todo.name}
                        {todo.status}
                        <Link to={`todo/${todo.id}`}>
                        <button>Edit</button>
                        </Link><button onClick={async function(){
                            await deleteTodo(todo.id)
                        }}>Delete</button>
                    </div>
                )
            })
        }
        </div>
        }
    </>
  )
}
export default App
