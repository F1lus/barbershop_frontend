import { Outlet, Link, useLocation, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Navbar, Container, Nav } from 'react-bootstrap'

import './style/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import logo from './style/images/logo.ico'

import Home from './routes/home'
import { useCallback, useEffect, useState } from 'react'
import Pricing from './routes/pricing'
import Reserve from './routes/reserve'
import Confirm from './routes/reserve/Confirm'
import Privacy from './routes/privacy'
import NotFound from './routes/not_found'
import Login from './routes/login'
import Loading from './components/loading'
import { LoadingContext } from './components/loading/context'
import { ErrorContext, useError } from './components/error/context'

const paths = ['/', '/pricing', '/reserve']

const Layout = () => {

  const path = useLocation().pathname

  useEffect(() => {
    if (paths.includes(path)) {
      const links = document.getElementsByClassName('nav-links')

      for (const link of links) {
        link.classList.remove('active')
      }

      links[paths.indexOf(path)].classList.add('active')
    }
  }, [path])

  return (
    <div>
      <motion.div className='sticky-top' initial={{ y: -100 }} animate={{ y: 0 }}>
        <Navbar id="nav" bg="black" variant='dark' expand="lg">
          <Container fluid>
            <Navbar.Brand className='text-gold'>
              <img src={logo} alt='logo' width={64} height={64} />
              Keni's Barbershop
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav className="justify-content-end">
                <Link className='nav-links' to="/">Főoldal</Link>
                <Link className='nav-links' to="/pricing">Árlista</Link>
                <Link className='nav-links' to="/reserve">Foglalás</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>
      <Outlet />
    </div>
  )
}

function App() {

  const [state, setState] = useState({ isLoading: false, show: false })

  const setLoading = useCallback(
    isLoading => setState(prev => ({ ...prev, isLoading })), []
  )
  const setShow = useCallback(
    show => setState(prev => ({ ...prev, show })), []
  )

  const [error, setError] = useError(setShow)

  const handleError = useCallback(
    msg => setError(msg), [ setError ]
  )

  return (
    <div>
      <LoadingContext.Provider value={state.isLoading}>
        <Loading />
        <ErrorContext.Provider value={error}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />

              <Route
                path='/pricing'
                element={
                  <Pricing 
                    setLoading={setLoading} 
                    setError={handleError}
                    error={error}
                    show={state.show}
                    setShow={setShow}
                  />
                }
              />

              <Route
                path='/reserve'
                element={
                  <Reserve 
                    setLoading={setLoading} 
                    setError={handleError}
                    error={error}
                    show={state.show}
                    setShow={setShow}
                  />
                }
              />

              <Route path='/confirm' element={<Confirm />} />

              <Route path='/privacy' element={<Privacy />} />

              <Route
                path='/login'
                element={<Login setLoading={setLoading} />}
              />

              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorContext.Provider>
      </LoadingContext.Provider>
    </div>
  )
}

export default App;
