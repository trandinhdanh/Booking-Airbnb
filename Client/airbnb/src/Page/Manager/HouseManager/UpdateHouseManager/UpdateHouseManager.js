import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { roomService } from "../../../../services/RoomService";
import { Form, Input, Button, Checkbox, Row, Col, Select } from "antd";

const { Option } = Select;

export default function UpdateHouseManager() {
  const { id } = useParams();
  const [roomDetail, setRoomDetail] = useState({});
  const [locationList, setLocationList] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    roomService
      .getHouseById(id)
      .then((res) => {
        console.log(res);
        setRoomDetail(res.data);
        // Set form initial values after receiving the room details
        form.setFieldsValue({
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || 0,
          codeLocation: res.data.codeLocation || undefined,
          address: res.data.address.fullAddress || "",
          washingMachine: res.data.washingMachine || false,
          television: res.data.television || false,
          airConditioner: res.data.airConditioner || false,
          wifi: res.data.wifi || false,
          kitchen: res.data.kitchen || false,
          parking: res.data.parking || false,
          pool: res.data.pool || false,
          maxGuests: res.data.maxGuests || 1,
          numLivingRooms: res.data.numLivingRooms || 0,
          numBathrooms: res.data.numBathrooms || 0,
          numBedrooms: res.data.numBedrooms || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch the list of locations
  }, [id, form]);

  const onFinish = (values) => {
    console.log(values);
const formData = new FormData();

formData.append('name', values.name);
formData.append('description', values.description);
formData.append('price', values.price);
formData.append('codeLocation', values.codeLocation);
formData.append('address', values.address);
formData.append('washingMachine', values.washingMachine ? 'true' : 'false');
formData.append('television', values.television ? 'true' : 'false');
formData.append('airConditioner', values.airConditioner ? 'true' : 'false');
formData.append('wifi', values.wifi ? 'true' : 'false');
formData.append('kitchen', values.kitchen ? 'true' : 'false');
formData.append('parking', values.parking ? 'true' : 'false');
formData.append('pool', values.pool ? 'true' : 'false');
formData.append('maxGuests', values.maxGuests);
formData.append('numLivingRooms', values.numLivingRooms);
formData.append('numBathrooms', values.numBathrooms);
formData.append('numBedrooms', values.numBedrooms);
formData.append('images', []);


    // Call the API to update the room
    roomService
      .update(id, formData)
      .then((res) => {
        console.log("Room updated:", res);
        navigate("/"); // Redirect to the home page after successful update
      })
      .catch((err) => {
        console.log("Update failed:", err);
      });
  };

  const handleStreetChange = (e) => {
    form.setFieldsValue({
      address:
        e.target.value +
        ", " +
        form.getFieldValue("nameWard") +
        ", " +
        form.getFieldValue("nameDistrict") +
        ", " +
        form.getFieldValue("nameProvince"),
    });
  };

  return (
    <div className="update-house-manager-container">
      <h1 className="update-house-manager-title">
        {t("Update House Manager")}
      </h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Please enter the name") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("Description")}
          name="description"
          rules={[
            { required: true, message: t("Please enter the description") },
          ]}
        >
          <Input.TextArea />
        </Form.Item>


        <Form.Item
          label={t("Address")}
          name="address"
          rules={[{ required: true, message: t("Please select the address") }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={t("Price")}
              name="price"
              rules={[{ required: true, message: t("Please enter the price") }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t("Max Guests")}
              name="maxGuests"
              rules={[
                { required: true, message: t("Please enter the max guests") },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t("Number of Living Rooms")}
              name="numLivingRooms"
              rules={[
                {
                  required: true,
                  message: t("Please enter the number of living rooms"),
                },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label={t("Number of Bathrooms")}
              name="numBathrooms"
              rules={[
                {
                  required: true,
                  message: t("Please enter the number of bathrooms"),
                },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t("Number of Bedrooms")}
              name="numBedrooms"
              rules={[
                {
                  required: true,
                  message: t("Please enter the number of bedrooms"),
                },
              ]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label={t("Amenities")} wrapperCol={{ span: 16 }}>
          <Row>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("washingMachine")}
                onChange={(e) => {
                  console.log(e.target.checked);
                  form.setFieldsValue({ washingMachine: e.target.checked });
                }}
                name="washingMachine"
              >
                {t("Washing Machine")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("television")}
                onChange={(e) =>
                  form.setFieldsValue({ television: e.target.checked })
                }
                name="television"
              >
                {t("Television")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("airConditioner")}
                onChange={(e) =>
                  form.setFieldsValue({ airConditioner: e.target.checked })
                }
                name="airConditioner"
              >
                {t("Air Conditioner")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("wifi")}
                onChange={(e) =>
                  form.setFieldsValue({ wifi: e.target.checked })
                }
                name="wifi"
              >
                {t("Wifi")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("kitchen")}
                onChange={(e) =>
                  form.setFieldsValue({ kitchen: e.target.checked })
                }
                name="kitchen"
              >
                {t("Kitchen")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("parking")}
                onChange={(e) =>
                  form.setFieldsValue({ parking: e.target.checked })
                }
                name="parking"
              >
                {t("Parking")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("pool")}
                onChange={(e) =>
                  form.setFieldsValue({ pool: e.target.checked })
                }
                name="pool"
              >
                {t("Pool")}
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={form.getFieldValue("hotAndColdMachine")}
                onChange={(e) =>
                  form.setFieldsValue({ hotAndColdMachine: e.target.checked })
                }
                name="hotAndColdMachine"
              >
                {t("Hot and Cold Machine")}
              </Checkbox>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <button
            className="px-3 py-2 rounded-lg bg-primary text-whitefont-medium hover:bg-[#FF2171] font-bold text-white transition-all"
            htmlType="submit"
          >
            {t("Update")}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
