import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, DatePicker, Col, Row } from 'antd';

import './Register.scss';
import { useTranslation } from 'react-i18next';
import { loginUser, registerUser } from '../../Redux/auth/authSlice';
import { authService } from '../../services/authService';

function RegisterPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    const infor = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthday: values.birthday.format('DD/MM/YYYY'),
      gender: values.gender,
    };
    await authService.registerUser(infor)
          .then((res) => {
            console.log(res);
            dispatch(loginUser({email: infor.email,password : infor.password}))
          })
          .catch((err) => {
            console.log(err);
          });
   
  };

  const onFinishFailed = (errorInfo) => {};

  const { Option } = Select;

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
              <p className="">Email</p>
              <Form.Item
                className="mb-4"
                name="email"
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
                  style={{ width: '100%' }}
                  className="input border px-[14px] py-[14px] rounded-[0.5rem]"
                  placeholder="Email"
                />
              </Form.Item>
              <p className="">{t('Password')}</p>
              <Form.Item
                className="mb-4"
                name="password"
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

              <Button
                className="hover:blacks w-full rounded-[0.5rem] bg-slate-500 btn-login text-white py-[6px] px-[12px]"
                type="primary"
                size="large"
                htmlType="submit"
              >
                {t('Register')}
              </Button>
            </Form>
            <div className="flex justify-center w-full">
              <Link to="/Login" className="mt-5 text-blue text-left text-bold">
                {t('Login')}
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
    </div>
  );
}

export default RegisterPage;
