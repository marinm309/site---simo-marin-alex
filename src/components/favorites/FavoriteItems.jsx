import Item from "../item/Item"
import { ClientContext } from "../../context/clientContext"
import { useState, useEffect, useContext } from "react"


function FavoriteItems(){

    const client = useContext(ClientContext).client
    const [ items, setItems ] = useState([])
    const [favorites, setFavorites] = useState({})

    useEffect(() => {
        client.get(`products/?favorite=items`)
        .then(function(res){
            setItems(res.data)
            const initialFavorites = res.data.reduce((acc, item) => {
                acc[item.id] = item.favorite;
                return acc;
            }, {});
            setFavorites(initialFavorites)
        })
    }, [])

    console.log(favorites)

    return(
        <div className="favorite-items-container">
            <ul className="favorite-items">
                {items.map((i) => <Item key={i.id} title={i.title} price={i.price} image={i.images[0]?.image || '/item-placeholder.png'} address={i.address} last_updated={i.last_updated} slug={i.slug} favorite={favorites[i.id]} id={i.id}></Item>)}
            </ul>
        </div>
    )
}

export default FavoriteItems