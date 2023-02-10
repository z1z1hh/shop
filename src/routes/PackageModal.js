import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setStore } from '../store'
import Map from './Map'

/* 
    포장 매장 찾기 모달 
    상태 관리하고 , 상태가 true일때만 모달을 show
    상태, 상태설정 함수, 모달 컴포넌트를 리턴
*/

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const storeList = useSelector((state)=>{ return state.storeList }) // redux store 가져오는 함수
    const dispatch = useDispatch();

    const Modal = (props) =>  
    (
        <>
            {isOpen && (
                <>
                    <div className="modal-background"></div>
                    <div className="modal-contents">
                        <div className="modal-title">
                                <span>포장매장 등록</span>
                                <ClsBtn closeModal={closeModal} />
                        </div>
                        <div className="modal-detail">
                            <ul className="modal-list">
                                {
                                    storeList.map(function(data, i) {
                                        return (
                                            <li key={i}>
                                                <span>{storeList[i].storeName}</span>
                                                <span>{storeList[i].storeTelNo}</span>
                                                <div>{storeList[i].storeAddress}</div>
                                                <button onClick={() => {
                                                    sessionStorage.setItem('selectedStore', JSON.stringify(storeList[i]))
                                                    props.setStore(JSON.stringify(storeList[i]))
                                                    setIsOpen(false)
                                                }}>선택</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <Map />
                        </div>
                    </div>
                </>
            )}
            
        </>
    );

    // 모달 컴포넌트, 상태 설정 함수를 리턴
    return { Modal, openModal, closeModal }
}

function ClsBtn({closeModal}) {
        return (
            <button className="btn-close" onClick={closeModal}></button>
        )
}

export default useModal