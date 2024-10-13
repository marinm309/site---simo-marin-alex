import Item from "../item/Item"
import Category from "../category/Category"
import Search from "../search/Search"

import { useContext, useState, useEffect } from "react"

import { ClientContext } from "../../context/clientContext"

function HomeSection1Main(){

    const client = useContext(ClientContext).client
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        client.get('/categories')
        .then(function(res){
            setCategories(res.data)
        })
    }, [])

    return(
        <section className="home-section-login">
            <div className="home-section-login-top">

                <Search />

                <div className="home-section-login-categories">
                    {/* <h2 className="home-section-login-categories-header"><span className="home-section-login-whitetext">Главни</span> <span className="light-text">категории</span></h2> */}
                    <ul>
                        {categories.map((c) => <Category key={c.id} image={c.image} name={c.name}></Category>)}
                    </ul>
                </div>
            </div>
            <div className="home-section-login-bottom">
                <p className="home-section-login-bottom-header">Топ <span className="light-text">Обяви</span></p>
                <ul>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </ul>
            </div>
        </section>
    )
}

export default HomeSection1Main