import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useState } from 'react'
import { prdtDecrease, prdtIncrease, deleteItem } from "./../store.js"


function Cart() {
    // a에는 모든 state 값들이 들어온다, user라는 state만 뽑고싶으면 return state.user
    const cartData = useSelector((state)=>{ return state.cart }) // redux store 가져오는 함수
    const dispatch = useDispatch()  // useDispatch는 store.js로 요청을 보내주는 함수
    const user = useSelector((state) => {return state})
    const [count, setCount] = useState(0)

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartData.map(function(a, i) {
                            return (
                                <tr className="data-list" key = {i}>
                                    <td>{cartData[i].id}</td>
                                    <td>{cartData[i].name}</td>
                                    <td className="btn-count">
                                        <button onClick={
                                            () => {
                                                dispatch(prdtDecrease(cartData[i].id))
                                            }
                                        }>-</button>{cartData[i].count}
                                        <button onClick = {
                                            () => {
                                                // 파라미터로 내가 클릭한 장바구니 데이터의 id로 전송
                                                dispatch(prdtIncrease(cartData[i].id))
                                            }
                                        }>+</button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                           dispatch(deleteItem(cartData[i].id))
                                        }}>
                                            <img className="btn-delete" src={require('../img/btn_delete.png')}></img>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <button>결제하기</button>
        </>
        
    )
}

export default Cart