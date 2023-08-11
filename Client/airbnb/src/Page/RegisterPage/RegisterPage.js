import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, DatePicker, Col, Row, Modal } from 'antd';

import './Register.scss';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../Redux/auth/authSlice';
import { authService } from '../../services/authService';
import { useState } from 'react';
import { IoIosMailOpen } from 'react-icons/io';
import { openNotificationIcon } from '../../Components/NotificationIcon/NotificationIcon';
import { localStorageService } from '../../services/localStorageService';
import { useEffect } from 'react';

function RegisterPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setIsLoading(true)
    const infor = {
      name: values.name,
      email: email,
      password: password,
      phone: values.phone,
      birthday: values.birthday.format('DD/MM/YYYY'),
      gender: values.gender,
    };
    await authService.registerUser(infor)
      .then((res) => {
        setModalOpen(true);
        setIsLoading(false)

      })
      .catch((err) => {
        setIsLoading(false)

        if (err.response.data.message === 'email already taken') {
          openNotificationIcon('warning', 'Email already exists', `Please go back to login by email: ${email}!`);
          navigate('/login');
        } else {
          console.log(err.response.data.message);
        }

      });

  };

  const onFinishFailed = (errorInfo) => { };

  const { Option } = Select;
  const handleVerify = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", confirmCode);

    await authService.confirm(formData)
      .then((res) => {
        console.log(res);
        if (res === 'confirmed') {
          setModalOpen(false);
          dispatch(loginUser({ email: email, password: password }));
        } else {
          openNotificationIcon('warning', 'Wrong character', 'Please re-enter character into input!');
        }

      })
      .catch((err) => {
        console.log(err);

      });
  }
  const handleDeleteUserNotConfirm = async () => {

    await authService.delete(email)
      .then((res) => {
        console.log(res);
        setModalOpen(false);

      })
      .catch((err) => {
        console.log(err);

      });
  }
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const role = localStorageService.get('USER')?.userDTO?.role?.[0];
    console.log(role);
    if (isLoggedIn && role) {
      if (role === "CUSTOMER") {
        navigate("/");
      } else {
        navigate("/manager")
      }
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="login flex items-center justify-center h-screen mb:p-0 sm:p-0 lg:p-[24px]">
      <div className="flex bg-white items-center relative w-[70rem] border rounded-[0.5rem] login-wrapper p-5 mb:h-screen sm:h-screen md:h-screen lg:h-[100%]  animate__animated animate__fadeInUp">
        <Link className="absolute top-[24px] left-[24px]" to="/">
          <img
            className=" w-[6rem]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt=""
          />
        </Link>

        <div className=" mb:w-full sm:w-full lg:w-2/4 h-screen flex justify-center items-center">
          <div className="animate__delay-1s animate__animated animate__fadeInUp w-[320px]">
            <div className="flex justify-between mb-2 items-center animate__delay-1s animate__animated animate__fadeInUp">
              <h1 className="font-bold text-[20px]">{t('REGISTER')}</h1>
            </div>
            <Form
              name="basic"
              className="register-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <p className="">{t('Full name')}</p>
              <Form.Item
                className="mb-4"
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('Please input your username!'),
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                  placeholder={t('Full name')}
                />
              </Form.Item>

              <Row span={24} style={{ width: '100%' }}>
                <Col span={12} style={{ paddingRight: '0.2rem' }}>
                  <p className="">{t('Birthday')}</p>
                  <Form.Item
                    className="mb-4"
                    name="birthday"
                    wrapperCol={{ sm: 24 }}
                    style={{ width: '100%', marginRight: '1rem' }}
                  >
                    <DatePicker className="datepicker-register w-full " format={'DD/MM/YYYY'} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <p className="">{t('Gender')}</p>
                  <Form.Item
                    className="mb-4"
                    wrapperCol={{ sm: 24 }}
                    style={{ width: '100%', borderRadius: 'none', marginRight: 0 }}
                    name="gender"
                  >
                    <Select className="w-full dropdowregister " placeholder={t('Gender')}>
                      <Option value="true">{t('male')}</Option>
                      <Option value="false">{t('female')}</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <p className="">{t('Phone Number')}</p>
              <Form.Item
                className="mb-4"
                name="phone"
                rules={[
                  { max: 10, message: t('User phone must be maximum 9 characters.') },
                  {
                    required: true,
                    message: t('Please input your phone number!'),
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: t('Please input a valid phone number!'),
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                  placeholder={t('+84 Phone Number')}
                />
              </Form.Item>

              <p className="">Email</p>
              <Form.Item
                className="mb-4 w-full"
                name="email"
                values={email}
                onChange={(e) => setEmail(e.target.value)}
                rules={[
                  {
                    type: 'email',
                    message: t('The input is not a valid email!'),
                  },
                  {
                    required: true,
                    message: t('Please input your email!'),
                  },
                ]}
              >
                <Input
                  className="input border px-[14px] py-[14px] rounded-[0.5rem] w-full"
                  placeholder="Email"
                />
              </Form.Item>
              <p className="">{t('Password')}</p>
              <Form.Item
                className="mb-4"
                name="password"
                values={password}
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: t('Please input your password!'),
                  },
                  { max: 16, message: t('Your password must be maximum 16 characters.') },
                  { min: 6, message: t('Your password must be at least 6 characters.') },
                ]}
              >
                <Input.Password
                  style={{ width: '100%' }}
                  className="border password px-[14px] py-[14px] rounded-[0.5rem]"
                  placeholder={t('Password')}
                />
              </Form.Item>
              {/* chưa làm confirm */}
              <p className="">{t('Confirm Password')}</p>
              <Form.Item
                className="mb-4"
                name="confirm-password"
                rules={[
                  {
                    required: true,
                    message: t('Please confirm your password!'),
                  },
                  { max: 16, message: t('Your password must be maximum 16 characters.') },
                  { min: 6, message: t('Your password must be at least 6 characters.') },
                ]}
              >
                <Input.Password
                  style={{ width: '100%' }}
                  className="border password px-[14px] py-[14px] rounded-[0.5rem]"
                  placeholder={t('Password')}
                />
              </Form.Item>


              <Button
                className="hover:blacks w-full rounded-[0.5rem] bg-primary btn-login text-white py-[6px] px-[12px]"
                type="primary"
                size="large"
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? t('Loading...') : t('Register')}
              </Button>
            </Form>
            <div className="flex justify-between w-full">
              <Link to="/Login" className="mt-5 text-blue text-left text-bold">
                {t('Login')}
              </Link>
              <Link to="/" className="mt-5 text-blue text-left text-bold">
                {t('Home')}
              </Link>
            </div>
          </div>
        </div>
        <div className="w-2/4  mb:hidden sm:hidden lg:flex relative bg-[#e86f7d] overflow-hidden h-full flex justify-center items-center rounded-[0.5rem]">
          <div className="glass h-[80%] relative w-[30rem] rouded-[0.5rem] bg-white p-8">
            <h1 className="text-[30px] text-center font-bold mb-[20px] text-black">
              {t('Discover unique places to stay')}
            </h1>
            <p className="text-xl text-center text-black">
              {t('Rent from people in over 65,000 cities and 191 countries.')}
            </p>
          </div>
        </div>
      </div>
      <Modal
        title="Verify your email"
        centered
        open={modalOpen}
        onOk={() => handleVerify()}
        onCancel={() => handleDeleteUserNotConfirm()}
      >
        <br />
        <p className='mb-1 ml-1'>{t('Enter 6 characters already sent to your gmail')}</p>
        <Input value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} placeholder="large size" prefix={<IoIosMailOpen className='ml-4 text-[24px] ' />} />
      </Modal>
    </div>
  );
}

export default RegisterPage;
