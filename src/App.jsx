import Navbar from "./components/Navbar"
import { useState , useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdNoteAdd } from "react-icons/md";


function App() {
 const [todo, settodo] = useState("")
 const [todos, settodos] = useState([])
 const [showfinished, setshowfinished] = useState(true)

 useEffect(() => {
     
  let todostring = localStorage.getItem("todos")
  if (todostring) {
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
 }, [])
 

 const savetodosLS = (first) => { 
  localStorage.setItem("todos" , JSON.stringify(todos))
  }

 const Addfunction = ()=>{
  settodos([...todos,{id:uuidv4(),todo,iscompleted:false}])
  settodo("")
  savetodosLS()
 }
 const Editfunction = (id)=>{
   let t = todos.filter(i=>i.id===id)
   settodo(t[0].todo)
   let newtodos = todos.filter(item=>{
    return item.id != id
   })
   settodos(newtodos)
   savetodosLS()
 }
 const Deletefunction = (id)=>{
  console.log(id);
   let newtodos = todos.filter(item=>{
    return item.id != id
   })
   settodos(newtodos)
   savetodosLS()
 }

 const changefunction = (e)=>{
 settodo(e.target.value)
 }
 const checkfunction = (e)=>{
  let id = e.target.name
  let index = todos.findIndex(item=>{
    return item.id === id ;
   })
   let newtodos = [...todos] ;
   newtodos[index].iscompleted =  !newtodos[index].iscompleted ;
   settodos(newtodos) ;
    savetodosLS()
 }
 const checkffunction = ()=>{
  setshowfinished(!showfinished)
 }

  return (
    <>
     <Navbar/>
        <div className=" md:container m-auto max-w-7xl md:w-1/2 bg-slate-500 text-center my-8 rounded-lg md:mx-auto p-10 min-h-[80vh] ">
          <div className="addtodo">
            <h1 className="font-bold text-center text-xl">iTASK - your todos manager</h1>
          <h2 className="text-xl font-bold">Add Todo</h2>
          <div className="flex"> 
          <input  onChange={changefunction} value={todo}  type="text" className=" rounded-lg w-full my-5 "/>
          <button   disabled={todo.length<=3} onClick={Addfunction} className=" bg-slate-800 disabled:bg-slate-600 text-white rounded-md text-sm hover:bg-slate-700 font-bold p-2 m-4 ">< MdNoteAdd /></button>
          </div>
          </div>
          <input onChange={checkffunction} type="checkbox" name="" checked={showfinished} id="" /> show finished
           
            <div className="h-[1px] bg-black opacity-20 w-90% my-5"></div>

          <h2 className="text-xl font-bold">Your Todos</h2>

          {todos.length === 0 && <div className="m-3">No Todos To Display </div>}
  
          <div className="todos">
            {todos.map( item =>{
            
           return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex justify-between  gap-10 my-4  ">
              <div className="flex gap-4">
              <input onChange={checkfunction} type="checkbox" checked={item.iscompleted} name={item.id} id="" />
              <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
            </div>
              <div className="button flex h-full">
                <button onClick={()=>{Editfunction(item.id)}} className=" bg-slate-600 text-white rounded-md text-sm hover:bg-slate-800 font-bold p-3 py-2 mx-1"><FaRegEdit /></button>
                <button onClick={()=>{Deletefunction(item.id)}} className=" bg-slate-600 text-white rounded-md text-sm hover:bg-slate-800 font-bold p-3 py-2 mx-1"><MdDeleteForever /></button>
              </div>
            </div>
              
            }
              

          )}
          </div>
        </div>
     
    </>
  )
}

export default App
