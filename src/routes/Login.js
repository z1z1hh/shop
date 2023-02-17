import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginUser } from '../api/Users';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useForm 사용을 위한 선언
    const { register, getValues, handleSubmit } = useForm();
  
    axios.defaults.withCredentials = true;
    
    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onSubmit = (data) => {
        console.log(data)
       
        axios.post('/api/auth/login', JSON.stringify(data),

        {
            headers: {
                'Content-Type': `application/json`
            }
        }).then(response => {
            const { accessToken } = response.data;
        
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log(response.data);
            console.log(response)
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!
        
        }).catch(error => {
            alert(error)
            console.log(error)
        });
        // const response = await loginUser({ userid, password });

        // if (response.status) {
        //     // 쿠키에 Refresh Token, store에 Access Token 저장
        //     setRefreshToken(response.json.refresh_token);
        //     dispatch(SET_TOKEN(response.json.access_token));

        //     return navigate("/");
        // } else {
        //     console.log(response.json);
        // }
        // // input 태그 값 비워주는 코드
        // setValue("password", "");
    };


    const signUp = async ({ loginId, password }) => {
        axios.post('/api/auth/signup', JSON.stringify({loginId,password}),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!
        
        }).catch(error => {
            alert('에러')
            console.log(error)
        });
        // const response = await loginUser({ userid, password });

        // if (response.status) {
        //     // 쿠키에 Refresh Token, store에 Access Token 저장
        //     setRefreshToken(response.json.refresh_token);
        //     dispatch(SET_TOKEN(response.json.access_token));

        //     return navigate("/");
        // } else {
        //     console.log(response.json);
        // }
        // // input 태그 값 비워주는 코드
        // setValue("password", "");
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="remember"  defaultValue="true" />
                <div>
                    <div>
                        <label htmlFor="UserID" className="sr-only">
                            User ID
                        </label>
                        <input
                            name="loginId"
                            {...register("loginId")}
                            type="text"
                            placeholder="User ID"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            name="password"
                            {...register("password")}
                            type="text"
                            placeholder="Password"
                        />

                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;