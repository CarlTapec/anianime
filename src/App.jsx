import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Browse from "./pages/Browse.jsx"
import About from "./pages/About.jsx"
import AnimeDetail from "./pages/AnimeDetail.jsx"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/about" element={<About />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
