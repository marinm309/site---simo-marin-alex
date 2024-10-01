function Search(){
    return(
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Какво търсиш?"
                    className="search-input"
                />
                <button className="search-button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className="city-dropdown">

                <select
                    className="dropdown-input"
                >
                    <option value="" disabled>
                    Град?
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <button className="dropdown-button">
                    <i class="fa-solid fa-location-dot"></i>
                </button>
            </div>
        </div>
    )
}

export default Search