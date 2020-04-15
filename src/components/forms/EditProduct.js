import React, {useEffect,useState} from "react"
import Swal from 'sweetalert2'


const EditProduct = ({product, setEditing}) => {
    
    const [formData, setFormData] = useState(product)
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        fetch("http://localhost:4000/categories", {
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(data=>{            
            setCategories(data)
        })
    }, [formData])

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleFile = (e) => {
        console.log(e.target.files[0])
        setFormData({
            ...formData,
            image: e.target.files[0]
            
        })
        
    }
    console.log(formData)
    const onSubmitHandler = (e) => {
        e.preventDefault()
        const updatedProduct = new FormData()
        updatedProduct.append('name', formData.name)
        updatedProduct.append('description', formData.description)
        updatedProduct.append('categoryId', formData.categoryId)
        updatedProduct.append('price', formData.price)
        if(typeof formData.image === 'object'){
            updatedProduct.append('image', formData.image)
        }
        fetch("http://localhost:4000/products/"+formData._id, {
            method: "PUT",
            body: updatedProduct,
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status === 200){
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                    timer: 1500,
                    showConfirmButton: false
                })
                window.location.href = "/"
            }else{
                Swal.fire({
                    icon: 'error',
                    text: "Please check your inputs",
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        })
    }
    return(
        <form className="mx-auto col-sm-6" onSubmit={onSubmitHandler} encType="multipart/form-data">
            <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" className="form-control" onChange={onChangeHandler} value={formData.name}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" onChange={onChangeHandler} value={formData.description}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" onChange={onChangeHandler} value={formData.price}/>
            </div>
            <div className="form-group">
                <label>Image</label>
                <img src={"http://localhost:4000/"+formData.image} className="img-fluid"/>
                <input type="file" name="image" accept="image/*"className="form-control" onChange={handleFile} />
            </div>
            <div className="form-group">
                <label>Category</label>
                <select className="form-control mb-3" name="categoryId" onChange={onChangeHandler} >
                    
                    {categories.map(category=> (
                        category._id === formData.categoryId? 
                        <option selected key={category._id}value={category._id} selected> {category.name}</option> :
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary">Edit</button>
            <button type="button" className="btn btn-secondary" onClick={()=>setEditing(false)}>Cancel</button>
        </form> 
    )
}

export default EditProduct