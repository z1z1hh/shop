import { configureStore, createSlice } from '@reduxjs/toolkit'

// 피자 목록
const data = createSlice({
  name : 'data',
  initialState : {
    contents : []
  },
  reducers : {
    getNewData(state, action) {
      //return action.payload.content;
      console.log(action);
      state.contents = action.payload.content;

      // 새로고침 하면 값이 날아가므로 세션에 저장 
      sessionStorage.setItem('list', JSON.stringify(action.payload.content));
    }
  }
})
export const { getNewData } = data.actions

// 도우 목록
const dough = createSlice({
  name : 'dough',
  initialState : [
    {id : 'super', name : '슈퍼시드 함유 도우', price : 2000},
    {id : 'original', name : '오리지널 도우(트리플 치즈 버스트 엣지)', price : 5000},
    {id : 'double_cheese', name : '오리지널 도우(더블 치즈 엣지)', price : 5000},
    {id : 'basic', name : '오리지널 도우(기본)', price : 0},
    {id : 'napoli_triple', name : '나폴리 도우(트리플 치즈 버스트 엣지)', price : 5000},
    {id : 'napoli', name : '나폴리 도우', price : 0},
    {id : 'thin', name : '씬 도우', price : 0}
  ]
});

const storeList = createSlice({
  name : 'storeList',
  initialState : [
    {id : '1', storeName : '명동점', storeAddress:'서울특별시 중구 마른내로 47' ,storeTelNo : '0222643081'},
    {id : '2', storeName : '신당점', storeAddress:'서울특별시 중구 다산로 156', storeTelNo : '0222333082'},
    {id : '3', storeName : '대학로점', storeAddress : '서울특별시 종로구 율곡로17길 7-38', storeTelNo : '0236753082'},
    {id : '4', storeName : '세종로점', storeAddress : '서울특별시 종로구 필운대로 43', storeTelNo : '027233082'}
  ],

});

const selectedStore = createSlice({
  name : 'selectedStore', 
  initialState : {
    id : '', storeName : '', storeAddress :'', storeTelNo : ''
  },
  reducers : {
    setStore(state,action) {
      console.log(action.payload);
      state = action.payload;
    }
  }
});
export const { setStore} = selectedStore.actions

// 선택한 옵션 
const option = createSlice({
  name : 'option',
  initialState : 
    {
      dough : '오리지널 도우(기본)',     // 도우종류
      sidedish : '',  // 사이드메뉴
      etc : '',       // 기타 & 음료
      pizza: '',      // 피자
      size : '',      // 사이즈
      quantity : 1,   // 수량
      charge : 0      // 가격(총 합계 = (피자*수량)+도우+사이드)
    }
  ,
  reducers : {
    setOption(state, action) {
      console.log(action.payload)
      return {...action.payload}
    },
    // 수량을 1씩 증가
    increaseQuantity(state) {
      state.quantity += 1;
    },
    // 수량을 1씩 감소
    decreaseQuantity(state) {
      if(state.quantity <= 0) {
        alert('더이상 줄일 수 없습니다.')
        return;
      } 
      state.quantity--;
    }
  }
})
export const { setOption, increaseQuantity ,decreaseQuantity } = option.actions

const order = createSlice({
  name : 'order',
  initialState : {
    imgUrl : '',
    pizza : '',
    dough : '',
    dough_price : 0,
    quantity : 0,
    total_price : 0
  },
  reducers : {
    addOrder(state,action) {
      console.log(action.payload)
      state = action.payload;
    }
  }
})
export let {addOrder} = order.actions

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
    prdtDecrease(state, action) {
      const idx = state.findIndex((a) => {return a.id === action.payload})
      if(state[idx].count <= 0) {
        return
      }
      state[idx].count--
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
export let { prdtIncrease, prdtDecrease, addCart , deleteItem } = cart.actions

// 위에서 만든 변수를 여기에 등록해야 사용할 수 있음
export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
    data: data.reducer,
    dough : dough.reducer,
    option : option.reducer,
    storeList : storeList.reducer,
    selectedStore: selectedStore.reducer,
    order : order.reducer
  }
}) 