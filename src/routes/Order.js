import { useEffect, useState } from "react";
import useModal from "./PackageModal";
import useDelieveryModal from "./DelieveryModal";

function Order() {
    const [tabType, setTabType] = useState(0)
    const [openAddress, setOpenAddress] = useState(0)

    // useModal에서 리턴해준 값들 받아오기 (컴포넌트, 상태설정 함수)
    // openModal = 모달 show / closeModal = 모달 hide
    const { Modal: PackageModal, openModal, closeModal } = useModal();
    const { Modal: DelieveryModal, openDeModal, closeDeModal } = useDelieveryModal();
    
    return (
        <div className="order_contents">
            <div className="order_txt">주문방법 선택</div>
            <div className="order_type_wrap">
                <div className="order_type">
                    <input type="radio" id="deliveryOrder" name="orderType" defaultChecked />
                    <label htmlFor="deliveryOrder" 
                            onClick={()=>{
                                setTabType(0)
                            }}>배달주문</label>
                </div>
                
                <div className="order_type">
                    <input type="radio" id="packageOrder" name="orderType" />
                    <label htmlFor="packageOrder"
                            onClick={() => {
                                setTabType(1)
                            }}>포장주문</label>
                </div>
                
            </div>
           
            {
                tabType === 0 ?  <DeliveryOrder DelieveryModal ={DelieveryModal} openDeModal = {openDeModal}></DeliveryOrder> 
                                : <PackageOrder PackageModal={PackageModal} openModal={openModal} ></PackageOrder>
            }
            <PackageModal />
            <DelieveryModal />
        </div>
    )
}

function DeliveryOrder({openDeModal}) {
    return (
        <>
            <div className="no_data">
                <p>배달매장을 등록해주세요.</p>
                <button onClick={() => {
                    openDeModal()
                }}>배달 매장 등록</button>
                
            </div>
        </>
    )
}

function PackageOrder({openModal}) {
    return (
       <div className="no_data">
            <p>포장매장을 등록해주세요.</p>
            <button onClick={() => {
                    openModal()
                }}>포장 매장 등록</button>
        </div>
    )
}


export default Order;