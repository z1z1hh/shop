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

    const Modal = () =>  
    (
        <>
            {isOpen && (
                <>
                    <div className="modal-background"></div>
                    <div className="modal-contents">
                        <DaumPostcode />
                    </div>
                </>
            )}
            
        </>
    );

    // 모달 컴포넌트, 상태 설정 함수를 리턴
    return { Modal, openDeModal, closeDeModal }
}

export default useDelieveryModal