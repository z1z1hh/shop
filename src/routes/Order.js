import { useEffect, useState } from "react";
import useModal from "./PackageModal";
import { useSelector, useDispatch } from 'react-redux'
import useDelieveryModal from "./DelieveryModal";

function Order() {
    const [tabType, setTabType] = useState(0)
    const [openAddress, setOpenAddress] = useState(0)

    // useModal에서 리턴해준 값들 받아오기 (컴포넌트, 상태설정 함수)
    // openModal = 모달 show / closeModal = 모달 hide
    const { Modal: PackageModal, openModal, closeModal } = useModal();
    const { Modal: DelieveryModal, openDeModal, closeDeModal } = useDelieveryModal();
    
    const [selectedStore, setStore] = useState("");
    const orderList = useSelector((state) => { return state.order });
    console.log(orderList);

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
                tabType === 0 ?  <DeliveryOrder DelieveryModal = {DelieveryModal} openDeModal = {openDeModal}></DeliveryOrder> 
                                : <PackageOrder PackageModal = {PackageModal} openModal = {openModal} selectedStore = {selectedStore} ></PackageOrder>
            }
            <PackageModal setStore={setStore} />
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

function PackageOrder({openModal, selectedStore}) {
    let parseData;
    if(selectedStore !== '') {
        parseData = JSON.parse(selectedStore)
        console.log(parseData)
    }
    
    function numberFormatter(parseData) {
        let formattedNum = '';
        formattedNum = parseData.storeTelNo.replace(/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/, '$1-$2-$3'); 
        return formattedNum;
    }
    
    return (
    <>
        {
            selectedStore === '' ? 
                <div className="no_data">
                    <p>포장매장을 등록해주세요.</p>
                    <button onClick={() => {
                            openModal()
                        }}>포장 매장 등록</button>
                </div>
            : 
            <>
                <div className="package_store_contents">
                    <div>
                        <input type="radio" defaultChecked/>
                        <span>{parseData.storeName}</span>
                        <span>{numberFormatter(parseData)}</span>
                    </div>
                    
                    <div>
                        <span className="img_location"></span>
                        <div>{parseData.storeAddress}</div>
                    </div>

                    <div>
                        <span>10분 소요</span>
                    </div>
                </div>

                <div className="package_order_wrap">
                    <div>해당 매장으로 주문을 진행하시겠습니까?</div>
                    <button>주문하기</button>
                </div>
            </>
        }
    </>
    )
}


export default Order;