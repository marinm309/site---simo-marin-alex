function ProfilePage(){
    return(
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-image">
                    <input type="file" id="file-upload" className="file-upload" accept="image/*" />
                    <label htmlFor="file-upload" className="upload-btn">
                        <i className="fa fa-camera"></i>
                    </label>
                </div>
                <h2>Потребител</h2>
                <p><i className="fa fa-user"></i> Потребител от 3 февруари 2023</p>
                <p><i className="fa fa-map-marker"></i> Варна, България</p>
                <p className="listings">1000 обяви</p>
            </div>
            <div className="review">
                <h3>Ревю от други потребители</h3>
                <div className="stars">
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star filled">★</span>
                    <span className="star empty">★</span>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage