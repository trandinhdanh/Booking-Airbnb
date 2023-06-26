import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import axios from 'axios';
import { Select } from 'antd';

const PROVINCCES_API_URL = 'https://provinces.open-api.vn/api';

export default function AddHouseManager() {


  const [province, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    // Fetch the list of provinces
    axios.get(`${PROVINCCES_API_URL}/p`)
      .then(response => {
        setProvince(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Fetch the list of districts when a province is selected
    if (selectedProvince) {
      axios.get(`${PROVINCCES_API_URL}/p/${selectedProvince}?depth=2`)
        .then(response => {
          setDistricts(response.data.districts);
          setSelectedDistrict(null);
          setWards([]);
          setSelectedWard(null);
        })
        .catch(err => {
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
      axios.get(`${PROVINCCES_API_URL}/d/${selectedDistrict}?depth=2`)
        .then(response => {
          setWards(response.data.wards);
          setSelectedWard(null);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);
  return (
    <div>
      <div className="headerManager font-roboto mb-5 flex justify-between">
        <h1 className="font-bold text-[20px] uppercase ">
          Add room
        </h1>
      </div>
      <form>
        
       {/* address */}
        <Select
        showSearch
        placeholder="Tỉnh..."
        optionFilterProp="children"
        value={selectedProvince}
        onChange={value => setSelectedProvince(value)}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={province.map(province => ({
          value: province.code,
          label: province.name
        }))}
        style={{ width: '30%'}}
      />
      <Select
        showSearch
        placeholder="Huyện..."
        optionFilterProp="children"
        value={selectedDistrict}
        onChange={value => setSelectedDistrict(value)}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={districts.map(district => ({
          value: district.code,
          label: district.name
        }))}
        style={{ width: '30%', marginLeft: '10px' }}
        disabled={!selectedProvince}
      />
      <Select
        showSearch
        placeholder="Xã..."
        optionFilterProp="children"
        value={selectedWard}
        onChange={value => setSelectedWard(value)}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={wards.map(ward => ({
          value: ward.code,
          label: ward.name
        }))}
        style={{ width: '30%', marginLeft: '10px' }}
        disabled={!selectedDistrict}
      />
       <Input placeholder='Specific address' />
      </form>
    </div>
  )
}
