import { useState,useEffect } from 'react'
import Navbar from './component/Navbar'
import { v4 as uuidv4 } from 'uuid'; 

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLs = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(items=>{
      return items.id!=id
    });
    setTodos(newTodos)
    saveToLs()
  }
  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(items=>{
      return items.id!=id
    });
    setTodos(newTodos)
    saveToLs()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
    saveToLs()
  }
  const handleCheckBox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(items=>{
      return items.id===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos) 
    saveToLs()
  }
  const toggleFinished=()=>{
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar/>
      <div className="container md:mx-auto my-5 rounded-xl p-5 bg-violet-400 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask-Manage your Todos at one Place</h1>
        <div className='addTodo my-5 flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex gap-2">
          <input onChange={handleChange} value={todo} type='text' className=' w-full rounded-lg p-1'></input>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-indigo-500 hover:bg-blue-600 p-3 disabled:bg-violet-800 py-1 text-white rounded-lg font-bold'>Save</button>
          </div>
          </div>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
          <h2 className='text-xl font-bold'>Your TodoList</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
            {todos.map(items=>{
              return (showFinished || !items.isCompleted) && <div key={items.id} className="todo flex md:w-full my-3 justify-between">
                <div className='flex gap-5'>
                <input name={items.id} onChange={handleCheckBox} type="checkbox" value={items.isCompleted} id=""></input>
                <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
                </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,items.id)}} className='bg-indigo-500 hover:bg-blue-600 p-3 py-1 text-white rounded-lg mx-3 font-bold'>Edit</button>
                <button onClick={(e)=>{handleDelete(e, items.id)}}  className='bg-indigo-500 hover:bg-blue-600 p-3 py-1 text-white rounded-lg mx-3 font-bold'>Delete</button>
              </div>
              </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
