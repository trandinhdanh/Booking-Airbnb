import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Col, Form, Input, InputNumber, Row } from "antd";
import axios from "axios";
import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";

const PROVINCCES_API_URL = "https://provinces.open-api.vn/api";

export default function AddHouseManager() {
  const { t } = useTranslation();
  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);

  const [location, setLocation] = useState();
  const [bg, setBg] = useState(false);
  const [idLocation, setIdLocation] = useState();

  const { Option } = Select;

  const renderOption = () => {
    return location?.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.name}
        </Option>
      );
    });
  };

  const onChange = (value) => {
    setIdLocation(value)
  };

  useEffect(() => {
    // Fetch the list of provinces
    axios
      .get(`${PROVINCCES_API_URL}/p`)
      .then((response) => {
        setProvince(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Fetch the list of districts when a province is selected
    if (selectedProvince) {
      axios
        .get(`${PROVINCCES_API_URL}/p/${selectedProvince}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
          setSelectedDistrict(null);
          setWards([]);
          setSelectedWard(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  useEffect(() => {
    // Fetch the list of wards when a district is selected
    if (selectedDistrict) {
      axios
        .get(`${PROVINCCES_API_URL}/d/${selectedDistrict}?depth=2`)
        .then((response) => {
          setWards(response.data.wards);
          setSelectedWard(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      <div className="headerManager font-roboto mb-5 flex justify-between">
        <h1 className="font-bold text-[20px] uppercase ">Add room</h1>
      </div>

      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        layout="vertical"
      >
        <div class="grid grid-cols-12" >
          <div class="col-span-6">

            <Form.Item label="Tên">
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả">
              <TextArea rows={3} />
            </Form.Item>


            {/* address */}

            <Form.Item label="Địa chỉ">
              <Select
                showSearch
                placeholder="Tỉnh..."
                optionFilterProp="children"
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={province.map((province) => ({
                  value: province.code,
                  label: province.name,
                }))}
                style={{ width: "31%" }}
              />
              <Select
                showSearch
                placeholder="Huyện..."
                optionFilterProp="children"
                value={selectedDistrict}
                onChange={(value) => setSelectedDistrict(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={districts.map((district) => ({
                  value: district.code,
                  label: district.name,
                }))}
                style={{ width: "31%", marginLeft: "10px" }}
                disabled={!selectedProvince}
              />
              <Select
                showSearch
                placeholder="Xã..."
                optionFilterProp="children"
                value={selectedWard}
                onChange={(value) => setSelectedWard(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={wards.map((ward) => ({
                  value: ward.code,
                  label: ward.name,
                }))}
                style={{ width: "31%", marginLeft: "10px" }}
                disabled={!selectedDistrict}
              />
              <Input placeholder="Địa chỉ cụ thể" style={{ marginTop: "15px" }} />
            </Form.Item>

            <Form.Item label="Số phòng khách">
              <InputNumber
                id="livingroom"
                min={1}
                max={10}
                defaultValue={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Số phòng tắm">
              <InputNumber
                id="livingroom"
                min={1}
                max={10}
                defaultValue={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Số phòng ngủ">
              <InputNumber
                id="livingroom"
                min={1}
                max={10}
                defaultValue={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Số lượng khách">
              <InputNumber
                id="livingroom"
                min={1}
                max={10}
                defaultValue={1}
                style={{ width: "100%" }}
              />
            </Form.Item>



            <Form.Item
              label="Hình ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  {/* <PlusOutlined /> */}
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>



          </div>
          <div class="col-span-6">
           

            <Form.Item label="Tiện nghi">
              <Checkbox.Group style={{ width: "100%" }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value={"Máy giặt"}>Máy giặt</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Tivi"}>Tivi</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Điều hòa"}>Điều hòa</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Wifi"}>Wifi</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Bãi đỗ xe"}>Bãi đỗ xe</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Bể bơi"}>Bể bơi</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"kitchen"}>Dụng cụ bếp</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={"Máy nóng lạnh"}>Máy nóng lạnh</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Location">
              <Select
                style={{
                  width: "100%",
                }}
                showSearch
                placeholder={t('Location')}
                optionFilterProp="children"
                className="dropdow-header"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {renderOption()}
              </Select>
            </Form.Item>
            <Form.Item label="Giá">
              <InputNumber
                id="guests"
                min={1}
                defaultValue={1}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item >
              <Button
                size="large"
                style={{
                  backgroundColor: "#1677ff",
                  color: "#fff",
                  width: "100%",
                }}
              >
                Thêm
              </Button>
            </Form.Item>
          </div>
        </div>

      </Form>

    </div>
  );
}