import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import BackgroundParticles from './components/BackgroundParticles'

export default function App() {
  return (
    <div className="app-container">
      {/* Canvas renders fixed in the background behind all UI elements */}
      <BackgroundParticles />

      {/* Main Site Structure */}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
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