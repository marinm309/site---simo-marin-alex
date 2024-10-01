import Item from "../item/Item"
import Search from "../search/Search"

function CategoryPage(){
    return(
        <section className="categories-section">
            <div className="categories-section-top">

                <Search />

                <div className="filter-inputs">
                    <div className="categories-single-filter-container">
                        <label>Категория</label>
                        <select className="dropdown-input categories-dropdown">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label>Подкатегория</label>
                        <select className="dropdown-input categories-dropdown">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label>Състояние</label>
                        <select className="dropdown-input categories-dropdown">
                            <option value="" disabled></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>

                    <div className="categories-single-filter-container">
                        <label>Цена</label>
                        <div className="categories-price-container">
                            <input type="number" className="categories-price"></input>
                            <input type="number" className="categories-price"></input>
                        </div>
                    </div>
                </div>

                <div className="category-btns">
                    <button className="category-white-btn">Предлагащи</button>
                    <button className="category-black-btn">Търсещи</button>
                </div>

            </div>
            <div className="categories-section-bottom">
                <ul className="promo-items">
                    <Item></Item>
                    <Item></Item>
                    <Item></Item>
                </ul>
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

export default CategoryPage