import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";
import { useState } from "react";

function AddUserManager() {
  const [value, setValue] = useState();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleGender = (e: RadioChangeEventTarget) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleRole = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleStatus = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <div className="headerManager font-roboto mb-5 flex justify-between">
        <h1 className="font-bold text-[20px] uppercase ">Add User</h1>
      </div>

      <div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Tên">
            <Input />
          </Form.Item>
          <Form.Item label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item label="Role">
            <Select
              defaultValue="--Role--"
              style={{ width: 120 }}
              onChange={handleRole}
              options={[
                { value: "ADMIN", label: "AMDIN" },
                { value: "OWNER", label: "OWNER" },
                { value: "CUSTOMER", label: "CUSTOMER" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              defaultValue="--Status--"
              style={{ width: 120 }}
              onChange={handleStatus}
              options={[
                { value: "ACTIVED", label: "ACTIVED" },
                { value: "INACTIVED", label: "INACTIVED" },
                { value: "DELETED", label: "DELETED" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group onChange={handleGender} value={value}>
              <Radio value={1}>Male</Radio>
              <Radio value={2}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Confirmed">
            <Checkbox></Checkbox>
          </Form.Item>
          <Form.Item label="Code Confirmed">
            <Input />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                backgroundColor: "#1677ff",
                color: "#fff",
                marginLeft: "100px",
              }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddUserManager;
