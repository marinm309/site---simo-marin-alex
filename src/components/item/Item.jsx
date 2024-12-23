import { useState, useEffect, useContext, useRef } from 'react';
import '/src/styles/item.css';
import { Link } from "react-router-dom";
import { ClientContext } from "../../context/clientContext";
import Cookies from "js-cookie";

function Item(props){

    const [ isLiked, setIsLiked ] = useState(props.favorite)
    const profileInfo = useContext(ClientContext).profileInfo
    const client = useContext(ClientContext).client
    const csrfToken = Cookies.get("csrftoken")
    const { triggerLikeBubble } = useContext(ClientContext)

    // const handleToggleFavorite = (e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     props.onToggleFavorite()
    //     console.log(isLiked)
    //     triggerLikeBubble(isLiked ? 'removed' : 'added', isLiked ? 'Премахнато от любими' : 'Добавено в любими')
    // };

    function toggleLike(e) {
        e.preventDefault();
        e.stopPropagation();

        props.handleToggleFavorite && props.handleToggleFavorite()
    
        if (isLiked) {
            client.delete(`products/favorite/${props.slug}`, {
                headers: { "X-CSRFToken": csrfToken }
            })
            .then(() => {
                setIsLiked(false)
                triggerLikeBubble('removed', 'Премахнато от любими')
            })
            .catch((err) => console.error('Failed to unlike', err))
        } else {
            client.post(`products/favorite/${props.slug}`, {
                product: props.id,
                user: profileInfo.data.user.user_id,
            }, {
                headers: { "X-CSRFToken": csrfToken }
            })
            .then(() => {
                setIsLiked(true)
                triggerLikeBubble('added', 'Добавено в любими')
            })
            .catch((err) => console.error('Failed to like', err));
        }
    }

    return(
        <>
            <li className="single-item">
                <Link to={`/i/${props.slug}`}>
                    <div className="single-item-top">
                        <img src={props.image} className="single-item-img" alt="Item" />

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
                        <p>{props.last_updated !== props.created_at ? 'Обновено' : ''} {props.last_updated}</p>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default Item;
