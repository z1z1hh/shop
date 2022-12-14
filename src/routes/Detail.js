import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Nav from 'react-bootstrap/Nav'
import { Context1 } from './../App.js'
import { addCart } from './../store'

function Detail(props) {
    const {stock} = useContext(Context1)
    const dispatch = useDispatch()
    let [divShow , setDivShow] = useState(true)
    
    useEffect(()=> {
      setTimeout( () => {
        setDivShow(false)    
      }, 2000)
    }, [])

    let [count, setCount] = useState(0)
    let [inputNumber , setInputNumber] = useState('')
    let [isNumberYn, setIsNumberYn] = useState(false)
    let [tabNo, setTabNo] = useState(0)

    let {id} =  useParams() // 현재 url의 파라미터 정보

    useEffect( () => {
      if (isNaN(inputNumber)) {
        setIsNumberYn(true)
      } else {
        setIsNumberYn(false)
      }
    }, [inputNumber])

    const returnValue = props.shoes.find(function(data) {
      return data.id == id
    })
    
    const inputOnChange = (e) => {
      const inputValue = e.target.value
      setInputNumber(inputValue)
    }

    return (
      
      <div className="container">
          {
            // divShow가 true면 Discount를 보여주고 false면 숨겨주기
            divShow ? <Discount /> : null
          }

          {/* {count} */}
          {/* <button onClick={ ()=> { 
            setCount(count+1) 
          }}> 버튼 </button> */}
          <div className="row">
            <div className="col-md-6">
              <img src={'https://codingapple1.github.io/shop/shoes' + Number(returnValue.id+1)+ '.jpg'} 
                    width="100%" />
            </div>
          
            <div className="col-md-6 align-left">
              {/* {
                isNumberYn ? <Alert /> : null
              }
              <input type="text" onChange={inputOnChange}></input> */}
              <h4 className="pt-5 bold-font">{returnValue.title}</h4>
              <p>{returnValue.content}</p>
              <p className="bold-font">{returnValue.price}원</p>
              <hr/>
              <p className="bold-font">배송정보</p>
              <div className = "transport-wrap">
                <li>
                  <span>배송비</span>
                  <span>해당 브랜드 제품으로만 50000원 이상 구매시 무료배송 ( 미만시 배송비 3000원 발생 ) 제주도를 포함한 도서/산간 지역 추가 배송비 없음</span>
                </li>
                <li>
                  <span>배송예정</span>
                  <span>1일 이내 출고 (주말, 공휴일제외)</span>
                </li>
              </div>
              <div className="doublebtn-wrap">
                <button onClick={()=>{
                  const addData = { id : returnValue.id, name : returnValue.title,  count : 1}
                  dispatch(addCart(addData))
                }}>장바구니 담기</button> 
                <button>주문하기</button> 
              </div>
             
            </div>
          </div>

          <Nav variant="tabs" defaultActiveKey="link0">
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTabNo(0) }} eventKey="link0">상세정보</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={()=>{ setTabNo(1) }} eventKey="link1">리뷰</Nav.Link>
            </Nav.Item>
      
            <Nav.Item>
              <Nav.Link onClick={()=>{ setTabNo(2) }} eventKey="link2">상품 Q&A</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContent shoes = {props.shoes} tabNo = {tabNo}/>
        </div> 
    )
}

function TabContent({tabNo, shoes}) {
  let [fade, setFade] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setFade('end')
    }, 100)
    
    return () => {
      setFade('')
    }
  }, [tabNo])

  return (<div className={'start ' + fade}>
    {
      [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabNo]
    }
  </div>)
}

function Discount() {
  return (
    <div className="alert alert-warning">
      2초이내 구매시 할인
    </div>
  )
}

function Alert() {
  return (
    <div className="alert-wrap">경고 : 숫자만 입력하세요</div>
  )
}

export default Detail;