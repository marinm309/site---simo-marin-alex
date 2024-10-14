import { Link } from "react-router-dom"

function Category(props){
    return(
        <li>
            <Link to={props.name}>
                <img src={props.image} />
                <p>{props.name}</p>
            </Link>
        </li>
    )
}

export default Category