import { useState, useEffect, useContext } from "react"
import { ClientContext } from "../../context/clientContext"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

function AddItemPage(){

    function onAddProduct(e){
        e.preventDefault()
        
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        client.post('/products/', formData, {
            headers: {
                'X-CSRFToken': csrfToken,
            }
        })
        .then(function(res){
            navigate('/profile')
        })
        .catch(function(error){
            setErr(true)
        })
    }

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    };

    const handleImageChange = (e) => {
        let newData = { ...data };
        newData["image"] = e.target.files[0];
        setData(newData);
    };

    const navigate = useNavigate()
    const profileInfo = useContext(ClientContext).profileInfo
    const csrfToken = Cookies.get('csrftoken')
    const client = useContext(ClientContext).client
    const [ err, setErr ] = useState(false)
    const [ data, setData ] = useState({
        title: '',
        description: '',
        price: '',
        address: '',
        category: 0,
        subcategory: 0,
        phone_number: '',
        user: profileInfo.data.user.user_id,
    })

    useEffect(() => {
        client.get('/categories')
        .then(function(res){
            setCategories(res.data)
        })
    }, [])

    useEffect(() => {
        client.get(`/categories/${data.category}`)
        .then(function(res){
            setSubcategories(res.data)
        })
    }, [data.category])

    const [ categories, setCategories ] = useState([])
    const [ subcategories, setSubcategories ] = useState([])

    return(
        <>
            <div className="add-product-container">
            <form onSubmit={onAddProduct}>
    
                <h1><strong>List a product</strong> by filling the form below</h1>
                {err && <h2 style={{'color': 'red'}}>Invalid data</h2>}
                
                <div className="form-group">
                    <label name="title">Title <span></span></label>
                    <input type="text" name="title" className="form-controll" required="required" onChange={handleChange} value={data.title} />
                </div>

                <div className="form-group">
                    <label name="price">Price <span></span></label>
                    <input name="price" type="number" className="form-controll" required="required" onChange={handleChange} value={data.price} />
                </div>

                <div className="form-group">
                    <label name="phone_number">Phone number <span></span></label>
                    <input name="phone_number" type="number" className="form-controll" required="required" onChange={handleChange} value={data.phone_number} />
                </div>

                <div className="form-group">
                    <label name="address">Address <span></span></label>
                    <input name="address" className="form-controll" required="required" onChange={handleChange} value={data.address} />
                </div>

                <div className="form-group">
                    <label name="category">Category <span></span></label>
                    <select name="category" required="required" onChange={handleChange} value={data.category} className="form-controll" >
                        <option disabled value={0}>Изберете категория</option>
                        {categories.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label name="subcategory">Subategory <span></span></label>
                    <select name="subcategory" required="required" onChange={handleChange} value={data.subcategory} className="form-controll" >
                        <option disabled value={0}>Изберете подкатегория</option>
                        {subcategories.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label name="description">Description <span></span></label>
                    <textarea name="description" className="form-controll" required="required" onChange={handleChange} value={data.description} />
                </div>
                
                <div className="form-group file-area">
                    <label name="image">Images <span>Your images should be at least 400x300 wide</span></label>
                    <input type="file" name="image" required="required" onChange={handleImageChange} />
                    <div className="file-dummy">
                    <div className="success">Great, your images are selected. Keep on.</div>
                    <div className="default">Please upload images</div>
                    </div>
                </div>
                
                <div className="form-group">
                    <button type="submit">Upload item</button>
                </div>
            
            </form>
        </div>
        </>
    )
}

export default AddItemPage