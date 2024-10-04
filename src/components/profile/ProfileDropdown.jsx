import { useRef, useEffect } from "react";
import { Link } from "react-router-dom"

function ProfileDropdown(props){

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if(dropdownRef.current && ((e.target.id == 'pfp-img' && !props.showProfileDropdown) || (e.target.id != 'pfp-img' && !dropdownRef.current.contains(e.target)))){
                props.onProfileClick()
            }
        }

        document.addEventListener('click', handleClickOutside)
        
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [props.onProfileClick])

    return(
        <div className="profile-dropdown-container" ref={dropdownRef}>
            <ul>
                <li onClick={props.onProfileClick}><Link to={'/profile'}>Профил</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><button>Изход</button></li>
            </ul>
        </div>
    )
}

export default ProfileDropdown