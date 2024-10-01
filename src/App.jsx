import { Route, Routes, Navigate } from 'react-router-dom'

import HomePage from './components/home/HomePage.jsx'
import Header from './components/header/Header.jsx'
import PrivacyPolicyPage from './components/privacy/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './components/terms/TermsOfServicePage.jsx'
import CategoryPage from './components/category/CategoryPage.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
					<Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/some-category" element={<CategoryPage />} />
			</Routes>
    </>
  )
}

export default App
