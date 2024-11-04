import { useState } from "react"
import FavoriteItems from "./FavoriteItems"
import FavoriteSearches from "./FavoriteSearches"
import '../../styles/favorite.css'

function FavoritePage(){

    const [ favoriteToShow, setFavoriteToShow ] = useState('items')

    function onFavoriteSwitch(e, fav){
        e.preventDefault()
        setFavoriteToShow(fav)
    }

    return(
        <div className="favorite-page-container">
            <div>
            <div className="favorite-page-top">
                <h2 className="favorite-page-top-header">Любими</h2>
                <button className={`favorite-page-top-btn ${favoriteToShow == 'items' ? 'favorite-page-top-btn-active' : 'favorite-page-top-btn-not-active'}`} onClick={(e) => onFavoriteSwitch(e, 'items')}>Обяви</button>
                <button className={`favorite-page-top-btn ${favoriteToShow == 'searches' ? 'favorite-page-top-btn-active' : 'favorite-page-top-btn-not-active'}`} onClick={(e) => onFavoriteSwitch(e, 'searches')}>Търсения</button>
            </div>
            {favoriteToShow == 'items' ? <FavoriteItems /> : <FavoriteSearches />}
            </div>
        </div>
    )
}

export default FavoritePage