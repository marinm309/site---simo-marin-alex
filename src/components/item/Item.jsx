import { useState } from 'react'
import '/src/styles/item.css'
import { Link } from "react-router-dom"

function Item(props){

    const [isLiked, setIsLiked] = useState(false)

    function toggleLike(e){
        e.preventDefault()
        e.stopPropagation()
        setIsLiked(prev => !prev)
    }

    return(
        <li className="single-item">
            <Link to={`/i/${props.slug}`}>
                <div className="single-item-top">
                    <img src={props.image} className="single-item-img" />

                    <div className="single-item-name-heart">
                        <h3>{props.title}</h3>
                        <i
                            className={`fa-heart ${isLiked ? 'fa-solid' : 'fa-regular'}`}
                            onClick={toggleLike}
                        ></i>
                    </div>
                    <p className="single-item-top-price"><b>{props.price}лв</b></p>
                </div>
                <div className="single-item-date-address">
                    <p>{props.address}</p>
                    <p>{props.last_updated != props.created_at ? 'Обновено' : ''} {props.last_updated}</p>
                </div>
            </Link>
        </li>
    )
}

export default Item