import { createContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import data from './data.js'
import Main from './routes/Main'
import { Routes , Route , useNavigate } from 'react-router-dom'
import Detail from './routes/Detail.js'
import {Event,Eventone,Eventtwo} from './routes/Event.js'
import Cart from './routes/Cart'
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

  const result = useQuery(['userName'], () => 
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a) =>{
        console.log('요청 됨')
        return a.data;
    }),
    { staleTime : 2000 }
  );

  return (
    <div className="App">
      <div className="navbar-wrap">
        <div className="main-logo" onClick={()=>{
          navigate('/')
        }}></div>
        <div className="submenu-wrap">
         
          <li>
            로그인
          </li>
          <li>
            <span>회원가입</span>
          </li>
          <li>
            <span></span>
            <span onClick={()=>{
               navigate('/cart')
            }}>장바구니
              {
                cartDataLength >= 1 ? <span className="bag-count">{cartDataLength}</span> : null
              }
            </span>
             
          </li>
          <li>
            <span>{ result.isLoading ? '로딩 중입니다.' : result.data.name + '님'}</span>
          </li>
        </div>
      </div>

      <div className="subnavbar-wrap">
        <li>메뉴</li>
        <li>e-쿠폰</li>
        <li>상품권 선물</li>
        <li>이벤트, 제휴</li>
        <li>매장검색</li>
        <li>가맹점 모집</li>
      </div>
      
      <Routes>
        <Route path="/" element={ <Main shoes={shoes} setShoes = {setShoes}/>} />
        <Route path="/detail/:id" element={ 
          <Context1.Provider value={{ stock }}>
             <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="*" element={<div>없는 페이지</div> } />
        
        <Route path="/event" element={ <Event/> } >
          <Route path="one" element={ <Eventone />} />
          <Route path="two" element={ <Eventtwo />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </div>
  );
}


export default App;
