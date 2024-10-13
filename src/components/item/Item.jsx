import { Link } from "react-router-dom"

function Item(){
    return(
        <li className="single-item">
            <Link>
                <img src="product.jpg" className="single-item-img" />

                <div className="single-item-name-price">
                    <h3>Транспорт бус с Падащ борд , Къртене извозване , диамантени отвори</h3>
                    
                </div>

                <p><b>19.99лв</b></p>
                
                <p>гр. Шумен, улица Кирил и Методий 29</p>
                <p>3 Септември 2024</p>
            </Link>
        </li>
    )
}

export default Item