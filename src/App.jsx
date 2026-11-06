import { useSmoothScroll } from './hooks/useSmoothScroll'
import Cursor from './components/Cursor'
import Hud from './components/Hud'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Publications from './components/Publications'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useSmoothScroll()

  return (
    <>
      <Cursor />
      <Hud />
      <main>
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
