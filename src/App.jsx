import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, Navigate } from 'react-router-dom'
import { ClientContext, client } from './context/clientContext.js';
import { useEffect, useState } from 'react';
import ScrollToTop from "./components/scroll/ScrollToTop.jsx";
import HomePage from './components/home/HomePage.jsx'
import Header from './components/header/Header.jsx'
import PrivacyPolicyPage from './components/privacy/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './components/terms/TermsOfServicePage.jsx'
import CategoryPage from './components/category/CategoryPage.jsx'
import ProfilePage from './components/profile/ProfilePage.jsx'
import Footer from "./components/footer/Footer.jsx";
import AddItemPage from "./components/item/AddItemPage.jsx";
import SingleItemPage from "./components/item/SingleItemPage.jsx";
import FavoritePage from "./components/favorites/FavoritePage.jsx";

function App() {

  const [ currentUser, setCurrentUser ] = useState(false)
	const [ loading, setLoading ] = useState(true)
	const [ profileInfo, setProfileInfo ] = useState()
	const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
		client.get("/users/user")
		.then(function(res) {
			if(res.data.message == 'No user is logged in.'){
				setCurrentUser(false)
				setLoading(false)
			}else{
				setProfileInfo(res)
				setCurrentUser(true)
				setCsrfToken(res.data.csrf_token)
				setLoading(false)
			}
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
			<Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to={'/'} />} />
			<Route path="/add-item" element={currentUser ? <AddItemPage /> : <Navigate to={'/'} />} />
			<Route path="/favorite" element={currentUser ? <FavoritePage /> : <Navigate to={'/'} />} />
			<Route path="/i/:itemName" element={<SingleItemPage />} />
			<Route path="/c/:categoryName" element={<CategoryPage />} />
			<Route path="/c/:categoryName/:subcategoryName" element={<CategoryPage />} />
		</Routes>
    	<Footer />
		<ScrollToTop />
    </ClientContext.Provider>
  )
}

export default App
