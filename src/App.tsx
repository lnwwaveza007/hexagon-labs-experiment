import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CreatorDashboard from './pages/CreatorDashboard'
import CreatorMarketplace from './pages/CreatorMarketplace'
import ContentCreation from './pages/ContentCreation'
import EarningsAnalytics from './pages/EarningsAnalytics'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/creator-marketplace" element={<CreatorMarketplace />} />
        <Route path="/content-creation" element={<ContentCreation />} />
        <Route path="/earnings-analytics" element={<EarningsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
