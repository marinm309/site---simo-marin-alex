import Item from "../item/Item"
import Search from "../search/Search"
import { useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import { ClientContext } from "../../context/clientContext"

function CategoryPage(){

    const [ items, setItems ] = useState([])
    const client = useContext(ClientContext).client
    const filterQuery = useParams()
    const category = filterQuery.categoryName

    useEffect(() => {
        client.get(`/products?category=${category}`)
        .then(function(res){
            setItems(res.data)
        })
    }, [])

    return(
        <section className="categories-section">
            <div className="categories-section-top">

                <Search />

                <div className="filter-inputs">
                    <div className="categories-single-filter-container">
                        <label htmlFor="category">Категория</label>
                        <select className="dropdown-input categories-dropdown" name="category" id="category">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label htmlFor="subcategory">Подкатегория</label>
                        <select className="dropdown-input categories-dropdown" name="subcategory" id="subcategory">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label htmlFor="status">Състояние</label>
                        <select className="dropdown-input categories-dropdown" name="status" id="status">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label htmlFor="price">Цена</label>
                        <div className="categories-price-container">
                            <input type="number" className="categories-price" name="price-low" id="price"></input>
                            <input type="number" className="categories-price" name="price-high"></input>
                        </div>
                    </div>
                </div>

                <div className="category-btns">
                    <button className="category-white-btn">Предлагащи</button>
                    <button className="category-black-btn">Търсещи</button>
                </div>

            </div>
            <div className="categories-section-bottom">
                <h3>Общо резултати: {items.length} обяв{items.length == 1 ? 'а' : 'и'}</h3>
                <ul className="promo-items">
                    {/* {items.map((i) => <Item key={i.id} title={i.title} price={i.price} image={i.image} address={i.address} last_updated={i.last_updated}></Item>)} */}
                </ul>
                <ul>
                    {items.map((i) => <Item key={i.id} image={i.images[0]?.image || '/item-placeholder.png'} slug={i.slug} title={i.title} price={i.price} address={i.address} last_updated={i.last_updated} favorite={i.favorite} id={i.id}></Item>)}
                </ul>
            </div>
        </section>
    )
}

export default CategoryPage