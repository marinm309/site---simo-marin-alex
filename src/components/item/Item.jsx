import { Link } from "react-router-dom"

function Item(){
    return(
        <li className="single-item">
            <Link>
                <img src="product.jpg" className="single-item-img" />

                <div className="single-item-profile-price">

                    <div className="single-item-profile-info">
                        <img src="profile_pic_default.png" className="single-item-profile-img" />
                        <p>Марин Маринов</p>
                    </div>
                    <p>19.99лв</p>

                </div>

                <h3>Име на обявата</h3>
                <p>Описание:</p>
                <p className="single-item-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque recusandae perferendis voluptas voluptatem, repellendus nesciunt a fugit nulla accusamus necessitatibus vitae qui officiis nemo, dolorem quos harum. Impedit, recusandae molestiae?</p>
            </Link>
        </li>
    )
}

export default Item