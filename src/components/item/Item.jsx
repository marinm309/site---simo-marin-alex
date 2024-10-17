import { Link } from "react-router-dom"

function Item(props){

    return(
        <li className="single-item">
            <Link>
                <div className="single-item-top">
                    <img src={props.image} className="single-item-img" />

                    <div className="single-item-name-price">
                        <h3>{props.title}</h3>
                        <p><b>{props.price}лв</b></p>
                    </div>
                </div>
                <div className="single-item-date-address">
                    <p>{props.address}</p>
                    <p>{props.last_updated}</p>
                </div>
            </Link>
        </li>
    )
}

export default Item