import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ClientContext } from "../../context/clientContext"
import { useContext } from 'react'

function ProfileDropdown(props){

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if(dropdownRef.current && ((e.target.id == 'pfp-btn' && !props.showProfileDropdown) || (e.target.id != 'pfp-btn' && !dropdownRef.current.contains(e.target)))){
                props.onProfileClick()
            }
        }

        document.addEventListener('click', handleClickOutside)
        
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [props.onProfileClick])

    function onLogout(e){
        props.onProfileClick()
        e.preventDefault()
        client.post('/users/logout',
            {withCredentions: true}
        ).then(function(res){
            setProfileInfo(null)
            setCurrentUser((oldState) => {!oldState})
            nagivate('#')
        })
    }

    const client = useContext(ClientContext).client
    const setCurrentUser = useContext(ClientContext).setCurrentUser
    const setProfileInfo = useContext(ClientContext).setProfileInfo
    const nagivate = useNavigate()

    return(
        <div className="profile-dropdown-container" ref={dropdownRef}>
            <ul>
                <li onClick={props.onProfileClick}><Link to={'/profile'}>Профил</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={props.onProfileClick}><Link>Нещо</Link></li>
                <li onClick={onLogout}><button>Изход</button></li>
            </ul>
        </div>
    )
}

export default ProfileDropdown