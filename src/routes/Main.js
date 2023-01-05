import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SwiperBg from '../routes/SwiperBg'
import FastMenu from './FastMenu'
import axios from 'axios'

function Main(props) {
    // 통신 시작 , 끝 여부 저장할 state
    let [communication, setCommunication] = useState(false)
    // 더보기 버튼 누른 횟수 저장할 state
    let [moreBtnCnt , setMoreBtnCnt] = useState(1)

    const getShoesData = () => {
        setMoreBtnCnt(moreBtnCnt+1)

        let requestURL
        if(moreBtnCnt === 1) {
            requestURL = 'data2.json'
        } else if(moreBtnCnt === 2) {
            requestURL = 'data3.json'
        } else {
            return
        }

        // 로딩바 보여주기
        setCommunication(true)

        axios.get('https://codingapple1.github.io/shop/' + requestURL)
                  .then((result) => { 
                        console.log('통신시작')
                        console.log(communication)
                        setCommunication(true)
                        // 통신 성공
                        // 새로 받아온 데이터
                        const getData = result.data
                        // 기존 데이터와 합쳐준다.
                        const newShoesData = [...props.shoes, ...getData]
                        // state 변경함수 사용
                        props.setShoes(newShoesData)
                        console.log(props.shoes)
                        // 데이터 불러왔으므로 로딩바 숨기기
                        setCommunication(false)
                    })
                    .catch(() => {
                        // 통신 실패
                        console.log('실패')
                        setCommunication(false)
                    })  
    }

    return (
        <>  
            <SwiperBg></SwiperBg>
            <FastMenu></FastMenu>
                {
                     moreBtnCnt <= 2 ? <button onClick={getShoesData}>더보기</button> : null
                }
                
                {
                    communication == true ? <LoadingBar /> : null
                }
                <div className="container">
                   
                    <div className="row">
                        {
                            /* state 갯수만큼 반복 */
                            props.shoes.map(function(data,i) {
                                return (
                                    <List shoes = {props.shoes} key ={i} i={i}/>
                                )
                            })
                        }
                    </div>
                </div>
        </>
    )
}

function List(props) {
    const navigate = useNavigate()
    const navigateToDetail = () => {
        navigate('/detail/' + props.i)
    }
    return (
      <div className="col-md-4" onClick={navigateToDetail}>
        <img src={'https://codingapple1.github.io/shop/shoes' + Number(props.i+1)+ '.jpg'} 
            width="80%" />
        <h4>{props.shoes[props.i].title}</h4>
        <p>{props.shoes[props.i].content}</p>
      </div>
    )
}

function NoData() {
    return (
        <div>
            <p>더이상 보여줄 상품이 없습니다.</p>
        </div>
    )
}

function LoadingBar() {
    return (
        <div className="loading-wrap">
            <div className="loading-bar">
                <img src="/Spin-loading.gif" />
            </div>
        </div>
    )
    
}

export default Main;