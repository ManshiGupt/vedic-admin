import React, { useEffect, useState } from 'react';
import { getPoojaByPanditId, getSlotsByPanditId } from '../api/PanditbyPooja'; // Assuming getSlotsByPanditId is the API to get slots
import { Select, Space } from 'antd';
import { getAllBookingSlots } from '../api/Booking-api';

const PanditSlot = ({ poojaDate, pujaId, panditId ,panditName}) => {
  const [data, setData] = useState([]);
  const [slots, setSlots] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getPoojaByPanditId('', '', 1, 10, pujaId);
      console.log('getPanditByPooja:', res);
      setData(res); // Assuming `res` is an array of objects containing `name`
    } catch (error) {
      console.log('Error while fetching getPanditByPooja:', error);
    }
  };

  const fetchSlots = async (panditId,poojaDate) => {
    try {
      const res = await getAllBookingSlots(panditId,poojaDate); // Fetch slots by panditId
      console.log('Fetched slots:', res);
      setSlots(res); // Assuming `res` is an array of slot strings
    } catch (error) {
      console.log('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (value,poojaDate) => {
    // console.log(`Selected Pandit ID: ${value}`);
       console.log(`Selected Pandit cccID: ${value}`,poojaDate);
    fetchSlots(value._id,poojaDate); // Call API for slots
  };

  return (
    <div>
      <h2>Pandit Slot Selection</h2>
   
      {/* Select dropdown to show pandit names */}
      <Space wrap>
        <Select
          //  defaultValue={panditName}
           placeholder={panditName}
          style={{ width: 200 }}
          onChange={handleSelectChange}
          options={data.map((pandit) => ({
            value: pandit._id, // Assuming `id` uniquely identifies a pandit
            label: pandit.name,
          }))}
        />
      </Space>

      {/* Displaying slots dynamically */}

      {slots.slotDate}
      {console.log("looi",slots)}
      {/* <div className="flex gap-10 py-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            // onClick={() => setPoojaTime(slot)} // Set selected slot as poojaTime
            className={`cursor-pointer border-2 p-2 rounded-md shadow-sm ${
              slot === poojaTime
                ? 'border-blue-500 bg-blue-100'
                : 'border-gray-200'
            }`}
          >
            <h1>{slot}</h1>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PanditSlot;
