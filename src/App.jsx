import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import '/src/styles/login-register.css'
import '/src/styles/header.css'
import '/src/styles/footer.css'
import '/src/styles/search.css'
import '/src/styles/profile.css'
import '/src/styles/item.css'
import '/src/styles/categories.css'
import '/src/styles/home-section-login.css'
import '/src/styles/home-section1.css'
import '/src/styles/home-section2.css'
import '/src/styles/home-section3.css'
import '/src/styles/home-section4.css'

import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './components/home/HomePage.jsx'
import Header from './components/header/Header.jsx'
import PrivacyPolicyPage from './components/privacy/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './components/terms/TermsOfServicePage.jsx'
import CategoryPage from './components/category/CategoryPage.jsx'
import ProfilePage from './components/profile/ProfilePage.jsx'
import Footer from "./components/footer/Footer.jsx";
import AddItemPage from "./components/item/AddItemPage.jsx";

import { ClientContext, client } from './context/clientContext.js';
import { useEffect, useState } from 'react';

function App() {

  const [ currentUser, setCurrentUser ] = useState(false)
	const [ loading, setLoading ] = useState(true)
	const [ profileInfo, setProfileInfo ] = useState()
	const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
		client.get("/users/user")
		.then(function(res) {
			setProfileInfo(res)
			setCurrentUser(true)
			setCsrfToken(res.data.csrf_token)
			setLoading(false)
		})
		.catch(function(error) {
			setCurrentUser(false)
			setLoading(false)
		});
	  }, [currentUser])

	if(loading){
		return <div></div>
	}

  return (
    <ClientContext.Provider value={{
			client: client,
			currentUser: currentUser,
			setCurrentUser: setCurrentUser,
			profileInfo: profileInfo,
			setProfileInfo: setProfileInfo,
			csrfToken: csrfToken,
			}}>
    	<Header />
    	<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
			<Route path="/terms-of-service" element={<TermsOfServicePage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/add-item" element={<AddItemPage />} />
			<Route path="/c/:categoryName" element={<CategoryPage />} />
			<Route path="/c/:categoryName/:subcategoryName" element={<CategoryPage />} />
		</Routes>
    	<Footer />
    </ClientContext.Provider>
  )
}

export default App
