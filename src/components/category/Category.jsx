import { Link } from "react-router-dom"

function Category(){
    return(
        <li>
            <Link to={'some-category'}>
                <img src="product.jpg" />
                <p>категория<br/>категория</p>
            </Link>
        </li>
    )
}

export default Category