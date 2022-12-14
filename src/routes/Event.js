import { Outlet } from "react-router-dom"

function Event() {
    return (
        <div>
            <h3>오늘의 이벤트</h3>
            <Outlet></Outlet>
        </div>
    )
}

function Eventone() {
    return (
        <div>첫 주문 시 양배추즙 서비스</div>
    )
}

function Eventtwo() {
    return (
        <div>생일 기념 쿠폰 받기</div>
    )
}

export {Event,Eventone,Eventtwo};