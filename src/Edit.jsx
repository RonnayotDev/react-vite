import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Edit(){
    const BASE_URL = 'https://65939d151493b0116068c793.mockapi.io'
    const { id } = useParams()
    const [todos,setTodos] = useState({
        name:''
    })
    const [isLoading , setisLoading] = useState(true)

    async function fetchTodo(id) {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        console.log(response)
        setTodos(response.data)
        setisLoading(false)
    }
    useEffect(() => {
        fetchTodo(id)
    },[id])
    function handleNameChange(event){
        setTodos((prevState) => ({
            ...prevState,
            name: event.target.value
        }))
    }
    async function submitEdit(){
        try{
            setisLoading(true)
            const response = await axios.put(`${BASE_URL}/todos/${id}`,{
                name:todos.name
            })
            console.log(response)
            window.location.href = '/';
            await fetchTodo()
            setisLoading(false)
        }
        catch (error){
            console.log('error',error)
        }
    }
    return(
        <>
            {isLoading && (<div>
                Loading ....
            </div>)}
            {
                !isLoading &&
        <div>
            {todos.name}
            <br/>
            <input type='text' onChange={handleNameChange} value={todos.name}/>
            {todos.status}
            <button onClick={submitEdit}>
                Submit
            </button>
        </div>
            }
        </>
    )
}
