import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import GlassShards from './components/GlassShards'
import Cursor from './components/Cursor'
import { useEffect } from 'react'


export default function App() {
  useEffect(() => {
    const isField = (e) => e.target.closest('input, textarea')
    const block = (e) => { if (!isField(e)) e.preventDefault() }

    document.addEventListener('copy', block)
    document.addEventListener('cut', block)
    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)

    return () => {
      document.removeEventListener('copy', block)
      document.removeEventListener('cut', block)
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
    }
  }, [])
  return (
    <div className="app-container">
      {/* Canvas renders fixed in the background behind all UI elements */}
      <GlassShards />
      <Cursor />

      {/* Main Site Structure */}
      <Navbar />
      <main>
        <Hero />
        {/* <Marquee /> */}
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Persistent Overlay Elements */}
      <Footer />
      <Chatbot />
    </div>
  )
}
