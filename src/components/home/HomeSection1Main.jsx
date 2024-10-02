import { Link } from "react-router-dom"
import Item from "../item/Item"
import Category from "../category/Category"
import Search from "../search/Search"

function HomeSection1Main(){
    return(
        <section className="home-section1main">
            <div className="home-section1main-top">

                <Search />

                <div className="home-section1main-categories">
                    <h2 className="home-section1main-categories-header"><span className="home-section1main-whitetext">Главни</span> <span className="light-text">категории</span></h2>
                    <ul>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>
                        <Category></Category>

                    </ul>
                </div>
            </div>
            <div className="home-section1main-bottom">
                <p className="home-section1main-bottom-header">Топ <span className="light-text">Обяви</span></p>
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