import { createContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar, Container, Nav } from 'react-bootstrap'
import './App.css';
import data from './data.js'
import Main from './routes/Main'
import { Routes , Route , Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'
import {Event,Eventone,Eventtwo} from './routes/Event.js'
import Cart from './routes/Cart'
import { useSelector } from 'react-redux'

export let Context1 = createContext() // 컨텍스트 = state 보관함

function App() {
  // 상품 데이터
  let [shoes, setShoes] = useState(data)
  let [stock] = useState([10,11,12])
  const cartData = useSelector((state)=>{ return state.cart }) // redux store 가져오는 함수
  const [cartDataLength] = useState(cartData.length)

  // 페이지 이동
  let navigate = useNavigate()

  return (
    <div className="App">
      <div className="navbar-wrap">
        <div className="main-logo" onClick={()=>{
          navigate('/')
        }}></div>
        <div className="submenu-wrap">
          <li>
            <img />
            MY PAGE
          </li>
          <li>
            <span></span>
            <span>MY LIKE</span>
          </li>
          <li>
            <span></span>
            <span onClick={()=>{
               navigate('/cart')
            }}>SHOPPING BAG
              {
                cartDataLength >= 1 ? <span className="bag-count">{cartDataLength}</span> : null
              }
            </span>
             
          </li>
          <li>
            <span></span>
            <span>LOGIN</span>
          </li>
         
        </div>
      </div>

      <div className="subnavbar-wrap">
        <li>Special-Order</li>
        <li>Showcase</li>
        <li>PT</li>
        <li>Welove</li>
        <li></li>
      </div>

      <div className="mininavbar-wrap">
        <li>BEST</li>
        <li>WOMEN</li>
        <li>MEN</li>
        <li>INTERIOR</li>
        <li>KITCHEN</li>
        <li>ELECTRONICS</li>
        <li>DIGITAL</li>
        <li>BEAUTY</li>
        <li>FOOD</li>
        <li>LEISURE</li>
        <li>KIDS</li>
        <li>CULTURE</li>
      </div>
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand className="main-logo"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') } }>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      
      <Routes>
        <Route path="/" element={ <Main shoes={shoes} setShoes = {setShoes}/>} />
        <Route path="/detail/:id" element={ 
          <Context1.Provider value={{ stock }}>
             <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="*" element={<div>없는 페이지</div> } />
        <Route path="/about" element={ <About /> } >
          <Route path="member" element={ <div>멤버</div> } />
          <Route path="location" element={ <div>회사위치</div> } />
        </Route>
        <Route path="/event" element={ <Event/> } >
          <Route path="one" element={ <Eventone />} />
          <Route path="two" element={ <Eventtwo />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </div>
  );
}

function About() {
  return (
    <div>회사 정보
      <Outlet></Outlet>
    </div>
  )
}

export default App;
