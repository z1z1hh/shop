import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SwiperBg from '../routes/SwiperBg'
import FastMenu from './FastMenu'
import axios from 'axios'
import { getNewData } from '../store'

function Main() {
    // 통신 시작 , 끝 여부 저장할 state
    let [communication, setCommunication] = useState(false)
   
    const dispatch = useDispatch()

    // 로딩바 보여주기
   // setCommunication(true

    return (
        <>  
            <SwiperBg></SwiperBg>
            <FastMenu></FastMenu>
        </>
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