import React, {useState, useEffect} from "react"
import Swal from "sweetalert2"

const AddProduct = () => {
    const [formData, setFormData] = useState({})
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
        const product = new FormData()
        product.append('name', formData.name)
        product.append('description', formData.description)
        product.append('categoryId', formData.categoryId)
        product.append('price', formData.price)
        product.append('image', formData.image)
        fetch("http://localhost:4000/products", {
            method: "POST",
            body: product,
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
                <input type="text" name="name" className="form-control" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label>Image</label>
                <input type="file" name="image" accept="image/*"className="form-control" onChange={handleFile}/>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select className="form-control mb-3" name="categoryId" onChange={onChangeHandler}>
                    <option disabled selected>Select Category</option>
                    {categories.map(category=> (
                        <option key={category._id} value={category._id} >{category.name}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary">Add</button>
        </form>
    )
}

export default AddProduct;