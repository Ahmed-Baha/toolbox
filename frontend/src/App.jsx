import { useState ,useEffect } from 'react'
import './App.css'
import FormPage from './pages/FormPage'
import DisplayPage from './pages/DisplayPage'
import HeadlossPage from './pages/HeadlossPage'
import PipelineMapper from "./pages/PipelineMapper";
import {Routes,Route,Link} from 'react-router-dom'
import {Button ,Nav,Container,Navbar} from 'react-bootstrap'

// point axios to the backend so relative '/api' requests hit the express server
// axios.defaults.baseURL = 'http://localhost:3003'
function App() {
  
  // const [name,setName]=useState('')
  // const [location,setLocation]=useState('')
  // const [price,setprice]=useState(0)
  // const [response,setResponse]=useState(null)




  


  return (
    <div>
    <Navbar bg='dark' data-bs-theme='dark' expand="lg" fixed='top'>
    <Navbar.Brand className='ms-2 col-1' as={Link} to='/form'>my camp app</Navbar.Brand>
      <Container className='row'>
      <Nav  className=' col-2'>
            <Nav.Link as={Link} to="/form">Form</Nav.Link>
          </Nav>
      <Nav className=' col-3'>
            <Nav.Link as={Link} to="/display">Display</Nav.Link>
          </Nav>
      <Nav className=' col-4'>
           <Nav.Link as={Link} to="/headloss">Head Loss</Nav.Link>
          </Nav>
      <Nav className=' col-5'>
           <Nav.Link as={Link} to="/mapper">mapper</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    <Container style={{ marginTop: '80px' }}>
  <Routes>
    <Route path="/form" element={<FormPage />} />
    <Route path="/display" element={<DisplayPage />} />
    <Route path='/headloss' element={<HeadlossPage />} />
    <Route path="/mapper" element={<PipelineMapper />} />
  </Routes>
</Container>
    </div>
  )
}

export default App



