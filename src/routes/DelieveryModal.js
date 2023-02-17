import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import DaumPostcode from 'react-daum-postcode';

/* 
    배달 주소 찾기 모달 
    상태 관리하고 , 상태가 true일때만 모달을 show
    상태, 상태설정 함수, 모달 컴포넌트를 리턴
*/

const useDelieveryModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openDeModal = () => setIsOpen(true);
    const closeDeModal = () => setIsOpen(false);
    const [address, setAddress] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        //fullAddress -> 전체 주소반환
    }

    const Modal = () =>  
    (
        <>
            {isOpen && (
                <>
                    <div className="modal-background"></div>
                    <div className="modal-contents">
                        <DaumPostcode autoClose onComplete={handleComplete} />
                        <button>닫기</button>
                    </div>
                </>
            )}
            
        </>
    );

    // 모달 컴포넌트, 상태 설정 함수를 리턴
    return { Modal, openDeModal, closeDeModal }
}

export default useDelieveryModal