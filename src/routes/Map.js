import { useEffect, useState, useRef } from "react"
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'

const { kakao } = window;

const Map = () => {
    const [kakaoMap, setKakaoMap] = useState(null);
    const container = useRef(null);
    const storeList = useSelector((state)=>{ return state.storeList }) // redux store 가져오는 함수

    const initMap = () => {
        const center = new kakao.maps.LatLng(37.570533, 126.992156); // 지도의 중심좌표
        const options = {
            center,
            level: 3
        };
        const map = new kakao.maps.Map(container.current, options);

        for(let i=0; i<storeList.length; i++) {
            // 주소-좌표 변환 객체를 생성합니다
            const geocoder = new kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(storeList[i].storeAddress, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {

                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    const marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    const infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">'+storeList[i].storeName+'</div>'
                    });
                    
                    infowindow.open(map, marker);
                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
       
        setKakaoMap(map);
    };

    useEffect(() => {
        initMap();
    }, []);

    return <MapContainer id="KakaoMap" ref={container} />;
}

const MapContainer = styled.div`
    width: '100%',
    height : '626px'
  `;

export default Map