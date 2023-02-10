import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setOption, addOrder } from '../store'
import Order from '../routes/Order'
import { NavbarBrand } from "react-bootstrap";

function Detail() {
  const { id } = useParams() // 현재 url의 파라미터 정보

  const localSavedId = sessionStorage.getItem('itemId')
  const pizzaArr = JSON.parse(sessionStorage.getItem('list'))
  const returnValue = pizzaArr.find(function (pizza) {
    return pizza.id == localSavedId;
  })

  const dispatch = useDispatch();
  
  // 도우 리스트 가져오기
  const doughList = useSelector((state) => { return state.dough });

  // 선택한 옵션 리스트 (초기값)
  const optionList = useSelector((state) => { return state.option });
  
  // 피자 사이즈별 금액 세팅용 state (초기값은 라지사이즈)
  const [charge, setCharge] = useState(returnValue.price_large);

  // 피자 총 금액(사이즈+도우+수량)
  const [totalCharge, setTotalCharge] = useState(charge);

  // 수량
  const [quantity, setQuantity] = useState(1);

  // 도우
  const [dough, setDough] = useState('');

  const navigate = useNavigate();

  // 피자 사이즈 변경 시
  const sizeChange = (e) => {
    const pizzaCharge = e.target.value;
    setCharge(pizzaCharge);
  }

  // 피자 사이즈 변경될 때 마다 하단 총 금액 변경되게
  useEffect(() => {
    setTotalCharge(charge*quantity);
  }, [charge])

  // 수량 변경될 때 마다 하단 총 금액 변경되게
  useEffect(() => {
    setTotalCharge( (Number(charge) + Number(dough)) *quantity)
  }, [quantity])

  // 도우 변경 시 (라디오버튼 선택 시)
  const doughChange = (e) => {
    
    // 도우 리스트에서 내가 선택한 도우만 가져오기
    const selectedDough = doughList.filter(({id}) => {
      return e.target.id === id
    })
    setDough(selectedDough[0].price);

    // 총 가격은 피자의 가격과 선택한 도우의 가격을 합한 것
    const totalPrice = (Number(charge) + Number(selectedDough[0].price)) * quantity;
    
    setTotalCharge(totalPrice)
  }

  return (
    <>

      <div className="detail_wrap">
        <div>
          <img src={returnValue.image} width="530px"></img>
          <div className="txt_alarm">* 모든 사진은 이미지컷으로 실제 제품과 다를 수 있습니다.
          <br/>* 원산지 정보는 사진 우측 하단 돋보기 메뉴를 통해 확인 가능합니다.
          </div>
        </div>

        <div className="detail_txt_wrap">
          <div className="detail_name">{returnValue.name}</div>
          <div>{returnValue.intro}</div>

          <p className="txt_title">사이즈 선택</p>

          <div className="size_type_wrap" onChange={sizeChange}>
            <div>
              <input type="radio" id="large" name="size" value={returnValue.price_large} defaultChecked />
              <label htmlFor="large">L {returnValue.price_large}</label>
            </div>
            {
              returnValue.price_medium !== undefined ?
                <div>
                  <input type="radio" id="medium" name="size" value={returnValue.price_medium}/>
                  <label htmlFor="medium">M {returnValue.price_medium}</label>
                </div> : null
            }
          </div>

          <p className="txt_title">도우 선택</p>
          <div className="radio_list">
            {
              doughList.map(function(a,i) {
                return (
                  <div key={i} onChange={doughChange}>
                    {
                      doughList[i].id === 'basic' ? <input type="radio" name="dow_list" id={`${doughList[i].id}`}  defaultChecked/> 
                      : <input type="radio" name="dow_list" id={`${doughList[i].id}`} />
                    }

                    <label htmlFor={`${doughList[i].id}`}>{doughList[i].name}</label>
                    <div className="txt_charge">+{doughList[i].price}</div>
                  </div>
                )
              })
            }
          </div>

          <p className="txt_title">수량 선택</p>
          <div className="quantity_wrap">
              <button onClick={() =>{
                if(quantity >= 1) {
                  setQuantity(quantity-1)
                }
                //dispatch(decreaseQuantity())
                //setTotalCharge(optionList.quantity * charge)
              }}>-</button>
              <div>{quantity}</div>
              <button onClick={() => {
                setQuantity(quantity+1)
                //dispatch(increaseQuantity())
                //setTotalCharge(optionList.quantity * charge)
              }}>+</button>
          </div>
        </div>
      </div>

      <div className="total_order_wrap">
          <ul>
            <li>피자</li>
            <li>{returnValue.name}</li>
            <li>도우/사이즈 : {optionList.dough}</li>
          </ul>
          <ul>
            <li>사이드디시</li>
            <li>없음</li>
            <li></li>
          </ul>
          <ul>
            <li>음료&기타</li>
            <li>대만 콘치즈감자</li>
            <li></li>
          </ul>
          <ul>
            <li>총 금액</li>
            <li>{totalCharge}</li>
            <li>
              <button onClick={() => {
                const orderData = {
                  imgUrl : returnValue.image,
                  pizza : returnValue.name,
                  dough : optionList.dough,
                  dough_price : dough,
                  quantity : quantity,
                  total_price : totalCharge
                }
                alert(JSON.stringify(orderData))
                dispatch(addOrder(JSON.stringify(orderData)));
                navigate('/order')
              }}>주문하기</button>
            </li>
          </ul>
      </div>
    </>

  )
}


export default Detail;