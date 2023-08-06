import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';
import './Login.scss';
// import { loginUser } from '../../redux/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../Redux/auth/authSlice';
import { localStorageService } from '../../services/localStorageService';
function LoginPage() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log(values)
    dispatch(loginUser(values))
    
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const role = localStorageService.get('USER')?.userDTO?.role?.[0];
    console.log(role);
    if (isLoggedIn && role ) {
      if(role === "CUSTOMER"){
        navigate("/"); 
      }else{
        navigate("/manager")
      }
    }
  }, [isLoggedIn, navigate]);
  const onFinishFailed = (errorInfo) => {};


  return (
    <div className="login flex items-center justify-center h-screen mb:p-0 sm :p-0 lg:p-[24px] ">
      <div className="flex bg-white items-center relative w-[70rem] border rounded-[0.5rem] login-wrapper p-5 mb:h-screen sm:h-screen md:h-screen lg:h-[100%] animate__animated animate__fadeInUp">
        <Link className="absolute top-[24px] left-[24px]" to="/">
          <img
            className=" w-[6rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt=""
          />
        </Link>

        <div className=" mb:w-full sm:w-full lg:w-2/4 h-screen flex justify-center items-center">
          <div className="animate__delay-1s animate__animated animate__fadeInUp">
            <div className="flex justify-between mb-2 items-center animate__delay-1s animate__animated animate__fadeInUp">
              <h1 className="font-bold text-[20px]">{t('LOGIN')}</h1>
            </div>
            <Form
              name="basic"
              className="form-login"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('Please input your email!'),
                  },
                ]}
              >
                <Input
                  className="input border px-[14px] py-[14px] rounded-[0.5rem] w-[320px] input-user"
                  placeholder={t('Input your email/phone number')}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('Please input your password!'),
                  },
                ]}
              >
                <Input.Password
                  className="border password px-[14px] py-[14px] rounded-[0.5rem] w-[320px] "
                  placeholder={t('Input your email/phone number')}
                />
              </Form.Item>

              <button
                className=" w-full py-3 rounded-[0.5rem] bg-primary hover:bg-[#0A4D68] transition-all btn-login text-white"
                type="primary"
                size="large"
                htmlType="submit"
              >
                {t('Login')}
              </button>
            </Form>
            <div className="w-full flex justify-between">
              <Link to="/register" className="mt-5 text-blue w-full inline text-left text-bold">
                {t('Register')}
              </Link>
              <a to="/" className="mt-5 text-blue w-full inline text-right text-bold">
                {t('forget password')}
              </a>
            </div>

            <div className="relative">
              <p
                className="my-5 text-center
               opacity-40 relative login-with"
              >
                {t('login with')}
              </p>
            </div>
            <div className=""></div>
            <div>
              <button className="flex mt-5 justify-center items-center text-[16px] w-full border p-3 rounded-[0.5rem]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                  alt=""
                  className="w-[22px] mr-2"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/4 mb:hidden sm:hidden lg:flex relative bg-[#e86f7d] overflow-hidden h-full flex justify-center items-center rounded-[0.5rem]">
          <div className="glass h-[80%] relative w-[30rem] rouded-[0.5rem] bg-mainColor z-10 animate__delay-1s animate__animated animate__fadeInUp">
            <h1 className="text-white text-[30px] text-left p-5">
              Start your journey by one click, explore beautiful world!
            </h1>
            <img src="../img/img.png" className="bottom-0 w-[70%] absolute left-20 " alt="" />
          </div>
          <img
            className="absolute right-[9rem] bottom-0 z-none"
            src="../img/decoration.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
