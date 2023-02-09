import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getNewData } from '../store'

function Menu() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://z1z1hh.github.io/shop/data.json')
            .then((response) => { 
                // 통신 성공
                const getData = response.data;
                console.log(getData);
                dispatch(getNewData(getData));
            })
            .catch((error) => {
                // 통신 실패
                alert('통신 중 오류가 발생하였습니다.')
                console.log(error);
            })  
    }, [])
  
    const pizza = useSelector((state)=>{ return state.data.contents }) // redux store 가져오는 함수

    return (
        <>
           <p className="menutype">New</p>
           <div>
                <div className="content_wrap">
                
                        {
                            pizza.map(function (a, i) {
                                return (
                                    <div className="content_list" key={i}>
                                        <div onClick={() => {
                                            const data_id = pizza[i].id;
                                            sessionStorage.setItem('itemId', data_id);
                                            navigate('/detail/' + data_id)
                                        }}>
                                            <img src={pizza[i].image} width="300vw"></img>
                                        </div>
                                        <div className="txt_title">{pizza[i].name}</div>
                                        <div className="txt_price">
                                            <div className="txt_price_detail">
                                                <span>L</span>
                                                <span>
                                                    {
                                                        pizza[i].price_large + ' ~'
                                                    }
                                                </span>
                                            </div>

                                            <div className="txt_price_detail">
                                                <span>
                                                    {
                                                        pizza[i].price_medium !== undefined ? 'M' : null
                                                    }            
                                                </span>
                                                <span>
                                                    {
                                                        pizza[i].price_medium !== undefined ? pizza[i].price_medium + ' ~' : null
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="txt_intro">
                                            {pizza[i].intro}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                </div>
            </div>
        </>
    )

}

export default Menu;