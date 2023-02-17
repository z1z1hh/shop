import { useState } from "react";
import useModal from "./PackageModal";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import useDelieveryModal from "./DelieveryModal";
import DaumPostcode from 'react-daum-postcode';

function Order() {
    const [tabType, setTabType] = useState(0)

    // useModal에서 리턴해준 값들 받아오기 (컴포넌트, 상태설정 함수)
    // openModal = 모달 show / closeModal = 모달 hide
    const { Modal: PackageModal, openModal, closeModal } = useModal();
    // const { Modal: DelieveryModal, openDeModal, closeDeModal } = useDelieveryModal();

    const [selectedStore, setStore] = useState("");
    const orderList = useSelector((state) => { return state.order });
    console.log(orderList);

    const [title, setTitle] = useState('주문방법 선택')
    const [visible, setVisible] = useState(false); // 우편번호 컴포넌트의 노출여부 상태
    const [address, setAddress] = useState('');

    return (
        <div className="order_contents">
            <div className="order_txt">{title}</div>
            <div className="order_type_wrap">
                <div className="order_type">
                    <input type="radio" id="deliveryOrder" name="orderType" defaultChecked />
                    <label htmlFor="deliveryOrder"
                        onClick={() => {
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
                tabType === 0 ? 
                    <DeliveryOrder visible={visible} setVisible={setVisible} address={address} setAddress={setAddress}></DeliveryOrder>
                    : <PackageOrder PackageModal={PackageModal} openModal={openModal} selectedStore={selectedStore} ></PackageOrder>
            }
            <PackageModal setStore={setStore} />

        </div>
    )
}

function DeliveryOrder({ visible, setVisible, address, setAddress }) {
    // 주소찾기 api 
    const findPostcode = () => {
        const handleComplete = (data) => {
            let fullAddress = data.address;
            let extraAddress = '';

            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
                }
                fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
            }

            document.getElementsByClassName('modal-background')[0].style.display = 'none';
            console.log('fullAddress : ' + fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
            setAddress(fullAddress);
            sessionStorage.setItem('address', fullAddress);
        };

        return (
            <div>
                <div className="modal-background"></div>
                <DaumPostcode className="postModal" onComplete={handleComplete} autoClose />
            </div>
        )
    };
    
    return (
        <>
            {
                address == '' ?
                    <>
                        <div className="no_data">
                            <p>배달매장을 등록해주세요.</p>
                            <button onClick={() => {
                                setVisible(true)
                            }}>배달 매장 등록</button>
                        </div>
                        {
                            visible === true ? findPostcode() : null
                        }
                    </>
                    : 
                    <div>
                        <div className="package_store_contents">
                            <div>
                                <input type="radio" defaultChecked/>
                                <span>{address}</span>
                            </div>
                            
                            <div>
                                <span className="img_clock"></span>
                                <span>10분 소요</span>
                            </div>
                        </div>

                        <div className="add_addr_wrap">
                            <button>+ 배달주소 등록</button>
                        </div>

                        <div className="package_order_wrap">
                            
                            <div>해당 매장으로 주문을 진행하시겠습니까?</div>
                            <button onClick={() => {
                                alert('선택함')
                            }}>선택</button>
                        </div>
                    </div>

            }
        </>
    )
}

function PackageOrder({ openModal, selectedStore }) {
    const navigate = useNavigate()
    let parseData;
    if (selectedStore !== '') {
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
                                <input type="radio" defaultChecked />
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
                            <button onClick={() => {
                                alert('선택함')
                                navigate('/cart')
                            }}>선택</button>
                        </div>

                    </>
            }
        </>
    )
}


export default Order;