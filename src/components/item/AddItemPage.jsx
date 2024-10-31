import { useState, useEffect, useContext, useRef } from "react";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ClientContext } from "../../context/clientContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MAX_IMAGES = 8;

function AddItemPage() {
    const navigate = useNavigate();
    const profileInfo = useContext(ClientContext).profileInfo;
    const csrfToken = Cookies.get("csrftoken");
    const client = useContext(ClientContext).client;

    const [err, setErr] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        address: "",
        category: 0,
        subcategory: 0,
        phone_number: "",
        user: profileInfo.data.user.user_id,
    });
    const [ categories, setCategories ] = useState([]);
    const [ subcategories, setSubcategories ] = useState([]);
    const [ images, setImages ] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        client.get("/categories").then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        client.get(`/categories/${data.category}`).then((res) => setSubcategories(res.data));
    }, [data.category]);

    const handleChange = ({ currentTarget: input }) => {
        let newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
    };

    const handleImageUpload = (event) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            rotation: 0
        }));
        setImages((prevImages) => [...prevImages, ...newImages].slice(0, MAX_IMAGES));
    };

    const removeImage = (e, indexToRemove) => {
		e.preventDefault()
		e.stopPropagation()
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

	const rotateImage = (e, index) => {
		e.preventDefault();
		e.stopPropagation();
	
		const image = images[index];
		if (!image) return;
	
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const img = new Image();
		img.src = image.url;
	
		img.onload = () => {
			const newRotation = 90;
			image.rotation = newRotation;
	
			canvas.width = img.height;
			canvas.height = img.width;
	
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate(newRotation * (Math.PI / 180));
			ctx.drawImage(img, -img.width / 2, -img.height / 2);
			ctx.restore();
	
			canvas.toBlob((blob) => {
				const rotatedFile = new File([blob], "rotated-image.jpg", { type: "image/jpeg" });
				const updatedImages = [...images];
				updatedImages[index] = { file: rotatedFile, url: URL.createObjectURL(rotatedFile), rotation: newRotation };
				setImages(updatedImages);
			}, "image/jpeg");
		};
	};

    const swapImages = (dragIndex, hoverIndex) => {
        const updatedImages = [...images];
        [updatedImages[dragIndex], updatedImages[hoverIndex]] = [updatedImages[hoverIndex], updatedImages[dragIndex]];
        const compactedImages = updatedImages.filter(Boolean);
        while (compactedImages.length < MAX_IMAGES) {
            compactedImages.push(null);
        }
        setImages(compactedImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        images.forEach((image, index) => formData.append(`image_${index}`, image.file));

        client
            .post("/products/", formData, {
                headers: { "X-CSRFToken": csrfToken },
            })
            .then(() => navigate("/profile"))
            .catch(() => setErr(true));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="form-container">
                <form className="ad-form" onSubmit={handleSubmit}>
                    <div className="form-left">
                        <label>Заглавие <input type="text" placeholder="име на обява" /></label>
                        <label>Категория <select><option value="">категория</option></select></label>
                        <label>Описание <textarea placeholder="описание"></textarea></label>
                        <label>Местоположение <select><option value="">град</option></select></label>
                    </div>

                    <div className="form-right">
                        <h3>Снимки и Клипoве</h3>
                        <DraggableImage
                            image={images[0]}
                            index={0}
                            isMainImage={true}
                            moveImage={swapImages}
                            rotateImage={rotateImage}
                            removeImage={removeImage}
                        />

                        <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />

                        <div className="thumbnail-grid">
                            {Array.from({ length: MAX_IMAGES - 1 }).map((_, index) => (
                                <DraggableImage
                                    key={index + 1}
                                    index={index + 1}
                                    image={images[index + 1]}
                                    moveImage={swapImages}
                                    rotateImage={rotateImage}
                                    removeImage={removeImage}
                                />
                            ))}
                        </div>
                        <label>Търсиш или Предлагаш <select><option value="">Търся</option></select></label>
                    </div>
                </form>
                <button className="submit-btn" onClick={handleSubmit}>Създай Обява</button>
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
        </DndProvider>
    );
}

function DraggableImage({ image, index, isMainImage, moveImage, rotateImage, removeImage }) {
    const [{ isDragging }, drag] = useDrag({
        type: "image",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "image",
        hover(item) {
            if (image && (item.index !== index)) {
                moveImage(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={isMainImage ? "main-image-upload" : "thumbnail"}
            style={{
                opacity: isDragging ? 0.3 : 1,
                backgroundColor: image ? "transparent" : "#D94A4A",
            }}
            onClick={() => document.getElementById("file-input").click()}
        >
            {image ? (
                <>
                    <img src={image.url} alt={isMainImage ? "Main Uploaded" : `Uploaded ${index}`} />
                    {isMainImage && <p className="main-image-text">КОРИЦА</p>}
                    <div className={`delete-rotate-container`} style={{display: isDragging ? 'none' : ''}}>
                        <button className="rotate-btn-icon-container" onClick={(e) => rotateImage(e, index)}>
                            <i className="fa-solid fa-rotate"></i>
                        </button>
                        <button className="delete-btn-icon-container" onClick={(e) => removeImage(e, index)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </>
            ) : (
                <div className="placeholder">{isMainImage ? "Главна Снимка" : "+"}</div>
            )}
        </div>
    );
}

export default AddItemPage;
