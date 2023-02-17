import { createContext, useState } from 'react'
import './App.css';
import data from './data.js'
import Main from './routes/Main'
import { Routes , Route , useNavigate } from 'react-router-dom'
import Detail from './routes/Detail.js'
import Cart from './routes/Cart'
import Menu from './routes/Menu'
import Order from'./routes/Order'
import Login from './routes/Login'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useQuery } from 'react-query';

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
            <button onClick={ () => 
              {
                navigate('/login')
              } }>로그인</button>
          </li>
          <li>
            <button>회원가입</button>
          </li>
          <li>
            <span></span>
            <button onClick={()=>{
               navigate('/cart')
            }}>장바구니
             
            </button>
             
          </li>
          <li>
            {/* <span>{ result.isLoading ? '로딩 중입니다.' : result.data.name + '님'}</span> */}
          </li>
        </div>
      </div>

      <div className="subnavbar-wrap">
        <button onClick={() => {
          navigate('/menu')
        }}>메뉴</button>
        <button>e-쿠폰</button>
        <button>상품권 선물</button>
        <button>이벤트, 제휴</button>
        <button>매장검색</button>
        <button>가맹점 모집</button>
      </div>
      
      <Routes>
        <Route path="/" element={ <Main />} />
        <Route path="/detail/:id" element={ <Detail />} />
        <Route path="*" element={<div>없는 페이지</div> } />
        <Route path="/order" element={<Order />} />
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
}


export default App;
