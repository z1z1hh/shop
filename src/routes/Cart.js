import { useDispatch, useSelector } from 'react-redux'
import { memo, useState } from 'react'

function Cart() {
    // a에는 모든 state 값들이 들어온다, user라는 state만 뽑고싶으면 return state.user
    const cartData = useSelector((state)=>{ return state.cart }) // redux store 가져오는 함수
    const dispatch = useDispatch()  // useDispatch는 store.js로 요청을 보내주는 함수
    const user = useSelector((state) => {return state})
    const [count, setCount] = useState(0)

    return (
        <div className="order_contents">
            <div className="order_txt">주문방법 선택</div>
            <div className="order_type_wrap">
                <div className="order_type">
                    <input type="radio" id="deliveryOrder" name="orderType" defaultChecked />
                    <label htmlFor="deliveryOrder" 
                            onClick={()=>{
                                // setTabType(0)
                            }}>배달주문</label>
                </div>
                
                <div className="order_type">
                    <input type="radio" id="packageOrder" name="orderType" />
                    <label htmlFor="packageOrder"
                            onClick={() => {
                                // setTabType(1)
                            }}>포장주문</label>
                </div>
                
            </div>
           
            {/* {
                tabType === 0 ?  <DeliveryOrder DelieveryModal = {DelieveryModal} openDeModal = {openDeModal}></DeliveryOrder> 
                                : <PackageOrder PackageModal = {PackageModal} openModal = {openModal} selectedStore = {selectedStore} ></PackageOrder>
            } */}
        </div>
        
    )
}

export default Cart