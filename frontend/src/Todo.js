import { useEffect, useState } from "react"

export default function Todo(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [editID, setEditID] = useState(-1)

    //edit
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")

    const apiUrl = "http://localhost:8000"

    const handleSubmit =()=>{
        setError("")
        if(title.trim()!=='' && description.trim()!==''){
            fetch(apiUrl+"/todos",{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({title, description})
            }).then((res)=>{
                if(res.ok){
                    //add items to list
                    setTodos([...todos, {title, description}])
                    setTitle("")
                    setDescription("")
                    setMessage("Item added successfully")
                    setTimeout(()=>{
                        setMessage("")
                    },3000)
                }
                else{
                    setError("Unable to create Todo item")
                }
            }).catch(()=>{
                setError("Unable to create Todo item")
            })

            
        }
    }

    useEffect(()=>{
        getItems()
    },[])

    const getItems = () =>{
        fetch(apiUrl+"/todos")
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
            setTodos(res)
        })
    }

    const handleEdit = (item) =>{
        setEditID (item._id); 
        setEditTitle(item.title); 
        setEditDescription(item.description)
    }

    const handleUpdate = () =>{
        setError("")
        if(editTitle.trim()!=='' && editDescription.trim()!==''){
            fetch(apiUrl+"/todos/"+editID,{
                method:"PUT",
                headers:{
                    'Content-Type' : 'application/json',
                },
                body:JSON.stringify({title : editTitle, description : editDescription})
            }).then((res)=>{
                if(res.ok){
                    //update items to list
                    const updatedTodos = todos.map((item) =>{
                        if(item.id === editID){
                            item.title = editTitle
                            item.description = editDescription
                        }
                        return item
                    })


                    setTodos(updatedTodos)
                    setEditTitle("")
                    setEditDescription("")
                    setMessage("Item updated successfully")
                    setTimeout(()=>{
                        setMessage("")
                    },3000)
                    
                    setEditID(-1)
                }
                else{
                    setError("Unable to create Todo item")
                }
            }).catch(()=>{
                setError("Unable to create Todo item")
            })


            
        }
    }

    const handleEditCancle = () =>{
        setEditID(-1)
    }

    const handleDelete = (id) =>{
        if(window.confirm('Are you sure want to delete?')){
            fetch(apiUrl+'/todos/'+id,{
                method: "DELETE"
            })
            .then(()=>{
                const updatedTodos = todos.filter((item) => item._id !==id)
                setTodos(updatedTodos)
            })
        }
    }

    return <>
        <div className="row p-3 bg-success text-light">
            <h1>TODO Project with MERN stack</h1>
        </div>
        <div className="row">
            <h3>Add Items</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} className="form-control" type="text" />
                <input placeholder="description" onChange={(e)=>{setDescription(e.target.value)}} value={description} className="form-control" type="text" />
                <button className="btn btn-dark"  onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>

        <div className="row mt-3">
            <h3>Tasks</h3>
            <div className="col-md-6">
                <ul className="list-group">
                    {
                        todos.map((item)=>
                            <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                                <div className="d-flex flex-column me-2">
                                    {
                                        editID === -1  || editID !== item._id? <>
                                            <span className="fw-bold">{item.title}</span>
                                            <span >{item.description}</span>
                                        </> : <>
                                        <div className="form-group d-flex gap-2">
                                            <input placeholder="text" onChange={(e)=>{setEditTitle(e.target.value)}} value={editTitle} className="form-control" type="text" />
                                            <input placeholder="description" onChange={(e)=>{setEditDescription(e.target.value)}} value={editDescription} className="form-control" type="text" />
                                        </div>
                                        </>
                                    }
                                    
                                </div>
                                <div className="d-flex gap-2">
                                    {editID ===-1 || editID !== item._id ? <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button> : <button className="btn btn-warning" onClick={handleUpdate}>Update</button>}
                                    {editID ===-1 ? <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button> :
                                    <button className="btn btn-danger" onClick={handleEditCancle}>Cancel</button> }
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>

    </>
}
