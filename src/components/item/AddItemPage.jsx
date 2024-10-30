import { useState, useEffect, useContext } from "react"
import { ClientContext } from "../../context/clientContext"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const MAX_IMAGES = 8

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






	const [images, setImages] = useState([]);

	const handleImageUpload = (event) => {
	event.preventDefault()
	event.stopPropagation()
	const files = Array.from(event.target.files);
	const newImages = files.map((file) => URL.createObjectURL(file));
	setImages((prevImages) => [...prevImages, ...newImages].slice(0, MAX_IMAGES)); // Limit to 8 images
	};

	const removeImage = (indexToRemove) => {
	setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
	};

	function onRemoveImageClick(e, index){
		e.stopPropagation()
		e.preventDefault()
		removeImage(index + 1)
	}

	return (
	<div className="form-container">
		<form className="ad-form">
		<div className="form-left">
			<label>
			Заглавие
			<input type="text" placeholder="име на обява" />
			</label>

			<label>
			Категория
			<select>
				<option value="">категория</option>
			</select>
			</label>

			<label>
			Описание
			<textarea placeholder="описание"></textarea>
			</label>

			<label>
			Местоположение
			<select>
				<option value="">град</option>
			</select>
			</label>
		</div>

		<div className="form-right">
			<h3>Снимки и Клипoве</h3>

			{/* Main Image Upload */}
			<div className="main-image-upload" onClick={() => document.getElementById('file-input').click()}>
			{images[0] ? (
				<>
				<img src={images[0]} alt="Main Uploaded" />
				<button className="delete-btn" onClick={(e) => e.preventDefault()}>
					<div className="delete-btn-icon-container" onClick={(e) => onRemoveImageClick(e, -1)}>
						<i className="fa-solid fa-trash"></i>
					</div>
				</button>
				</>
			) : (
				<div className="placeholder">Главна Снимка</div>
			)}
			</div>

			{/* Hidden File Input */}
			<input
			type="file"
			id="file-input"
			accept="image/*"
			multiple
			onChange={handleImageUpload}
			style={{ display: 'none' }}
			/>

			{/* Thumbnails Grid */}
			<div className="thumbnail-grid">
			{Array.from({ length: MAX_IMAGES - 1 }).map((_, index) => (
				<div
				key={index + 1}
				className="thumbnail"
				onClick={() => document.getElementById('file-input').click()}
				>
				{images[index + 1] ? (
					<>
					<img src={images[index + 1]} alt={`Uploaded ${index + 1}`} />
					<button className="delete-btn" onClick={(e) => e.preventDefault()}>
						<div className="delete-btn-icon-container" onClick={(e) => onRemoveImageClick(e, index)}>
							<i className="fa-solid fa-trash"></i>
						</div>
					</button>
					</>
				) : (
					<div className="placeholder">+</div>
				)}
				</div>
			))}
			</div>

			<label>
			Търсиш или Предлагаш
			<select>
				<option value="">Търся</option>
			</select>
			</label>
		</div>
		</form>
		<button className="submit-btn">Създай Обява</button>
	</div>
	);
}

export default AddItemPage