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

function App() {

  return (
    <>
      <Header />
      <Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
					<Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/some-category" element={<CategoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
			</Routes>
      <Footer />
    </>
  )
}

export default App
