import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  TextArea,
  Upload,
  message
} from "antd";
import { UploadOutlined } from '@ant-design/icons';

import { PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import { locationService } from "../../../../services/locationService";
import { roomService } from "../../../../services/RoomService";
import { useDispatch } from "react-redux";
import Loading from "../../../../Components/Loading/Loading";
import { localStorageService } from "../../../../services/localStorageService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PROVINCES_API_URL = "https://provinces.open-api.vn/api";

export default function AddHouseManager() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [nameProvince, setNameProvince] = useState("");
  const [nameDistrict, setNameDistrict] = useState("");
  const [nameWard, setNameWard] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [location, setLocation] = useState();
  const [idLocation, setIdLocation] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(localStorageService.get("USER"));
  const { register, handleSubmit } = useForm();
  const { Option } = Select;
  const navigate = useNavigate();

  const MINIMUM_IMAGES = 5;

  const handleProvinceChange = (value, option) => {
    setSelectedProvince(value);
    setNameProvince(option?.label ?? "");
  };

  const handleDistrictChange = (value, option) => {
    setSelectedDistrict(value);
    setNameDistrict(option?.label ?? "");
  };

  const handleWardChange = (value, option) => {
    setSelectedWard(value);
    setNameWard(option?.label ?? "");
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
    setAddress(
      street + ", " + nameWard + ", " + nameDistrict + ", " + nameProvince
    );
  };

  useEffect(() => {
    locationService
      .getLocationList()
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderOption = () => {
    return location?.map((item, index) => {
      return (
        <Option key={index} value={item.codeLocation}>
          {item.name}
        </Option>
      );
    });
  };

  const onChange = (value) => {
    setIdLocation(value);
    console.log(address);
  };

  useEffect(() => {
    setAddress(
      street + ", " + nameWard + ", " + nameDistrict + ", " + nameProvince
    );

    axios
      .get(`${PROVINCES_API_URL}/p`)
      .then((response) => {
        setProvince(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedWard]);

  useEffect(() => {
    // Fetch the list of districts when a province is selected
    if (selectedProvince) {
      axios
        .get(`${PROVINCES_API_URL}/p/${selectedProvince}?depth=2`)
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
        .get(`${PROVINCES_API_URL}/d/${selectedDistrict}?depth=2`)
        .then((response) => {
          setWards(response.data.wards);
          setSelectedWard(null);
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  const labelCol = { span: 4 };
  const wrapperCol = { span: 24 };

  const onFinish = (values) => {
    setIsLoading(true);
    console.log("Form submitted:", values);
    console.log(idLocation);
    console.log(address);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("codeLocation", idLocation);
    formData.append("address", address);
    formData.append("washingMachine", values.washingMachine);
    formData.append("television", values.television);
    formData.append("airConditioner", values.airConditioner);
    formData.append("wifi", values.wifi);
    formData.append("kitchen", values.kitchen);
    formData.append("parking", values.parking);
    formData.append("pool", values.pool);
    formData.append("maxGuests", values.maxGuests);
    formData.append("numLivingRooms", values.numLivingRooms);
    formData.append("numBathrooms", values.numBathrooms);
    formData.append("numBedrooms", values.numBedrooms);

    selectedImages.forEach((image) => {
      formData.append(`images`, image.originFileObj);
    });

    roomService
      .addRoom(user.userDTO.id, formData)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate("/manager/house")
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("error", err.response.data.message);
      });
  };
  const handleImagesChange = (info) => {
    const files = [...info.fileList];
    setSelectedImages(files);
  };
  // const handleImagesChange = (info) => {
  //   let fileList = [...info.fileList];

  //   // Kiểm tra số lượng hình ảnh đã chọn
  //   // if (fileList.length < 5) {
  //   //   message.error("Vui lòng chọn tối thiểu 5 hình ảnh.");
  //   //   return;
  //   // }

  //   // Giới hạn số lượng hình ảnh tối đa
  //   // fileList = fileList.slice(0, 5);

  //   // Cập nhật danh sách hình ảnh đã chọn
  //   console.log(fileList);
  //   setSelectedImages(fileList);
  // };



  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="headerManager font-roboto mb-5 flex justify-between">
            <h1 className="font-bold text-[20px] uppercase ">Add room</h1>
          </div>

          <Form form={form} onFinish={onFinish}>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-6">
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[{ required: true }]}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: true }]}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                >
                  <Input />
                </Form.Item>

                {/* Địa chỉ */}

                <Form.Item
                  label="Địa chỉ"
                  rules={[{ required: true }]}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                >
                  <Select
                    showSearch
                    placeholder="Tỉnh..."
                    optionFilterProp="children"
                    value={selectedProvince}
                    rules={[{ required: true }]}
                    onChange={handleProvinceChange}
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
                    rules={[{ required: true }]}
                    onChange={handleDistrictChange}
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
                    rules={[{ required: true }]}
                    onChange={handleWardChange}
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
                  <Input
                    placeholder="Địa chỉ cụ thể"
                    style={{ marginTop: "15px" }}
                    value={street}
                    onChange={handleStreetChange}
                  />
                </Form.Item>

                <Row className="space-x-4">
                  <Col>
                    <Form.Item
                      label="Phòng khách"
                      name="numLivingRooms"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Phòng tắm"
                      name="numBathrooms"
                      rules={[{ required: true }]}

                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="space-x-4">
                  <Col>
                    <Form.Item
                      label="Phòng ngủ"
                      name="numBedrooms"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="Lượng khách"
                      name="maxGuests"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Tải ảnh lên"
                  name="images"
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                >
                  <Upload
                    name="images"
                    listType="picture-card"
                    fileList={selectedImages}
                    beforeUpload={() => false} // Tắt tự động tải lên
                    onChange={handleImagesChange}
                    multiple
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: true,
                    }}
                  >
                    <PlusOutlined />
                  </Upload>
                </Form.Item>
              </div>
              <div className="col-span-6">
                <Form.Item label="Tiện nghi" labelCol={labelCol}
                  wrapperCol={wrapperCol}>
                  <Row>
                    <Col span={8}>
                      <Form.Item
                        name="washingMachine"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Washing Machine</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="television"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Tivi</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="airConditioner"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Air Conditioner</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="wifi"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Wifi</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="kitchen"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Kitchen</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="parking"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Parking</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="pool"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>Pool</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name="hotAndColdMachine"
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>hotAndColdMachine</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="Location" labelCol={labelCol}
                  wrapperCol={wrapperCol}>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    placeholder={t("Location")}
                    optionFilterProp="children"
                    className="dropdow-header"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {renderOption()}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Giá phòng"
                  name="price"
                  rules={[{ required: true }]}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                >
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    className="px-3 py-2 rounded-lg bg-primary text-white font-medium hover:bg-[#068FFF] hover:text-white transition-all"
                    type="submit"
                  >
                    Thêm phòng
                  </button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
