import Item from "../item/Item"
import Category from "../category/Category"
import Search from "../search/Search"

import { useContext, useState, useEffect } from "react"

import { ClientContext } from "../../context/clientContext"

function HomeSection1Main(){

    const client = useContext(ClientContext).client
    const [ categories, setCategories ] = useState([])
    const [ items, setItems ] = useState([])

    useEffect(() => {
        client.get('/categories')
        .then(function(res){
            setCategories(res.data)
        })
    }, [])

    useEffect(() => {
        client.get('/products')
        .then(function(res){
            setItems(res.data)
        })
    }, [])

    return(
        <section className="home-section-login">
            <div className="home-section-login-top">

                <Search />

                <div className="home-section-login-categories">
                    {/* <h2 className="home-section-login-categories-header"><span className="home-section-login-whitetext">Главни</span> <span className="light-text">категории</span></h2> */}
                    <ul>
                        {categories.map((c) => <Category key={c.id} image={c.image} name={c.name} slug={c.slug}></Category>)}
                    </ul>
                </div>
            </div>
            <div className="home-section-login-bottom">
                <p className="home-section-login-bottom-header">Топ <span className="light-text">Обяви</span></p>
                <ul>
                    {items.map((i) => <Item key={i.id} title={i.title} price={i.price} image={i.image} address={i.address} last_updated={i.last_updated} slug={i.slug}></Item>)}
                </ul>
            </div>
        </section>
    )
}

export default HomeSection1Main