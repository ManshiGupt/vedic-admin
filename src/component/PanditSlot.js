import React, { useEffect, useState } from "react";
import { getPoojaByPanditId } from "../api/PanditbyPooja";
import { getAllBookingSlots } from "../api/Booking-api";
import { Select, Space, Input } from "antd";

const PanditSlot = ({
  poojaDate,
  pujaId,
  panditId,
  panditName,
  bookingData,
}) => {
  const [data, setData] = useState([]); // To store the list of pandits
  const [slots, setSlots] = useState([]); // To store available slots
  const [calculatedSlots, setCalculatedSlots] = useState([]); // To store calculated slots (x and y)

  // Fetch pandits by Pooja ID
  const fetchData = async () => {
    try {
      const res = await getPoojaByPanditId("", "", 1, 10, pujaId);
      setData(res); // Assuming `res` is an array of objects with `name` and `_id`
    } catch (error) {
      console.error("Error while fetching getPanditByPooja:", error);
    }
  };

  // Format date to `dd-mm-yy`
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDateString(poojaDate);

  const fetchSlots = async (panditId) => {
    try {
      const res = await getAllBookingSlots(panditId, formattedDate);
      setSlots(res); // Assuming `res` is an array of slot strings
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  // Effect to fetch pandits on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle selection of a pandit from dropdown
  const handleSelectChange = (panditId) => {
    fetchSlots(panditId); // Fetch slots for selected pandit
  };

  // Calculate slots when bookingData changes

  const t = parseInt(bookingData[0].poojaDuration) || 1; // Default to 1 hour if no duration is provided
  let x = 0;
  let y = 4;
  const ram = () => {
    const a = [];
    for (let i = 5; y <= 19; i++) {
      x = y + 1;
      y = x + t;
      a.push(x, y);
      console.log(x);
    }
    setCalculatedSlots(a);
  };

  return (
    <div>
      <h2>Pandit Slot Selection</h2>
      {/* Dropdown to select Pandit */}
      <Space wrap>
        <Select
          placeholder={panditName || "Select a Pandit"}
          style={{ width: 200 }}
          onChange={handleSelectChange}
          options={data.map((pandit) => ({
            value: pandit._id, // Assuming `_id` uniquely identifies a pandit
            label: pandit.name,
          }))}
        />
      </Space>

      {/* Display calculated slots */}
      <div className="mt-5">
        <h3 onClick={ram}>Calculated Slots</h3>
        {calculatedSlots.map((data, i) => {
          console.log(data)
          const startTime = data > 12 ? `${data - 12}PM` : `${data}AM`;
          const endTime =
            data + t > 12
              ? `${(data + t - 12) % 12 || 12} PM`
              : `${data + t}AM`;

          return (
            <div
              key={i}
              className="border-2 p-2 mb-4 rounded-lg mr-96 flex justify-center"
            >
              {startTime} - {endTime}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PanditSlot;
