import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : {name : 'yeonji', age : 20},
  reducers : {
    // state를 변경해줄 함수를 생성해준다 !! 
    changeName(state) { // state가 기존 state임
      return 'john' + state  
    },
    ageIncrease(state) {
      state.age += 1
    }
  }
})

// { } 안에 함수명 적어주면 됨
// 오른쪽에 있는 자료를 변수로 빼는 문법
export let { changeName, ageIncrease } = user.actions

let stock = createSlice({
  name : 'stock',
  initialState : [10,11,12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1},
    {id : 35, name : 'black sandal', count : 11}
  ],
  reducers : {
    prdtIncrease(state, action) {
      // action.payload에 장바구니 데이터의 id가 들어온다.
      // payload와 같은 id를 가진 상품의 id를 +1
      const idx = state.findIndex((a) => {return a.id === action.payload})
      state[idx].count++
    },
    addCart(state, action) {
      const result = state.find(function(state){
        return state.id === action.payload.id
      })
      console.log('returnValue : ' + JSON.stringify(result))
      if(result === undefined) {
        state.push(action.payload)
      } else {
        console.log('장바구니 중복 : ' + JSON.stringify(action.payload))
        alert ("이미 추가되어있는 상품입니다.")
        prdtIncrease(action.payload.id)
      }
     
    },
    deleteItem(state, action) {
        // action.payload에 장바구니 데이터의 id가 들어온다.
        // payload와 같은 id를 가진 상품의 id를 삭제
      const idx = state.findIndex((a) => {return a.id === action.payload})
      state.splice(idx, 1)
    }
  }
})
export let { prdtIncrease, addCart , deleteItem } = cart.actions

// 위에서 만든 변수를 여기에 등록해야 사용할 수 있음
export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
}) 