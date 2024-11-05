function LikedBubble(props){
    return(
        <div className='liked-bubble-container'>
            <p>{props.action == 'added' ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>} {props.message}</p>
        </div>
    );
}

export default LikedBubble