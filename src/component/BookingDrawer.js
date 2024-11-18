import React, { useEffect, useState } from "react";
import { Drawer, Input, Spin, message, Collapse } from "antd";
import MyButton from "../ui/button.js";
import { updatePooja } from "../api/puja-api.js";
import { createPooja } from "../api/puja-api.js";
import { Button, Modal } from "antd";
import { Select, Tag, Space } from "antd";
import { Switch } from "antd";
import { updateBooking } from "../api/Booking-api.js";
import { getPoojaByPanditId } from "../api/PanditbyPooja.js";
import PanditSlot from "./PanditSlot.js";

const { TextArea } = Input;

const { Option } = Select;
const BookingDrawer = ({
  openDrawer,
  closeDrawer,
  refreshTable,
  drawerData,
  action,
}) => {
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // State Variables
  const [poojaDate, setPoojaDate] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [balanceAmount, setBalanceAmount] = useState("");
  const [poojaTime, setPoojaTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [additionalRemark, setAdditionalRemark] = useState("");
  const [pujaSamagri, setPujaSamagri] = useState(false);
  const [bookingCancelRemark, setBookingCancelRemark] = useState("");
  const [cancelBy, setCancelBy] = useState("");
  const [bookingSlotId, setBookingSlotId] = useState("");
  const [panditRemark, setPanditRemark] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [paymentId2, setPaymentId2] = useState("");
  const [orderId2, setOrderId2] = useState("");
  const [paymentRefundReffNo, setPaymentRefundReffNo] = useState("");

  const [bookingData, setBookingData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [deliveryAddressData, setDeliveryAddressData] = useState([]);

  const [poojaName, setPoojaName] = useState("");
  const [allPandit, setAllPandit] = useState([]);

  const[panditId, setPanditId]= useState("");
  const[pujaId, setPujaId]= useState("");


  useEffect(() => {
    if (drawerData) {
      // Set data in form when the drawer opens for edit or view
      setPoojaDate(drawerData.poojaDate || "");
      setPoojaTime(drawerData.poojaTime || "");
      setBookingStatus(drawerData.bookingStatus || "");
      setAdditionalRemark(drawerData.additionalRemark || "");
      setPujaSamagri(drawerData.pujaSamagri || false);
      setBookingCancelRemark(drawerData.bookingCancelRemark || "");
      setCancelBy(drawerData.cancelBy || "");
      setBookingSlotId(drawerData.bookingSlotId || "");
      setPanditRemark(drawerData.panditRemark || "");
      setFinalAmount(drawerData.finalAmount || "");
      setPaymentId2(drawerData.paymentId2 || "");
      setOrderId2(drawerData.orderId2 || "");
      setPaymentRefundReffNo(drawerData.paymentRefundReffNo || "");
      setBookingData(drawerData.bookingData || []);
      setDeliveryAddressData(drawerData.deliveryAddressData || []);
      setUserDetails(drawerData.userDetails || []);

      setIsUpdating(action === "Edit");
    }
  }, [drawerData]);

  // const validateForm = () => {
  //   if (!title.trim()) return "Title is required.";
  //   if (!subtitle.trim()) return "Subtitle is required.";

  //   if (!poojaTag.trim()) return "Pooja tag is required.";
  //   if (poojaDuration <= 0) return "Pooja duration must be greater than 0.";
  //   if (!aboutPooja.trim()) return "About Pooja is required.";
  //   return null;
  // };

  const formData = {
    poojaDate,
    poojaTime,
    bookingStatus,
    additionalRemark,
    pujaSamagri,
    bookingCancelRemark,
    cancelBy,
    bookingSlotId,
    panditRemark,
    finalAmount,
    paymentId2,
    orderId2,
    paymentRefundReffNo,
    bookingData,
    userDetails,
    deliveryAddressData,
  };

  const resetDrawer = () => {
    closeDrawer();
    setIsUpdating(false);
    setPoojaDate("");

    setPoojaTime("");
    setBookingStatus("");
    setAdditionalRemark("");
    setPujaSamagri(false);
    setBookingCancelRemark("");
    setCancelBy("");
    setBookingSlotId("");
    setPanditRemark("");
    setFinalAmount("");
    setPaymentId2("");
    setOrderId2("");
    setPaymentRefundReffNo("");
    setBookingData([]);
    setUserDetails([]);
    setDeliveryAddressData([]);
  };

  // const getPoojaByPanditIdd= async()=>{
  //   try {
  //     const res = await getPoojaByPanditId(("", "" ,1, 10, drawerData.bookingData.poojaId));
  //     setAllPandit(res)
  //     console.log("pandit", res)
  //     console.log("po",drawerData.bookingData)
  //   } catch (error) {

  //   }

  // }

  // useEffect(() => {
  //   getPoojaByPanditIdd();
  // }, [])

  const handleSubmit = async () => {
    // const errorMessage = validateForm();
    // if (errorMessage) {
    //   message.error(errorMessage);
    //   return;
    // }

    setLoading(true);

    try {
      await updateBooking(drawerData._id, formData);
      console.log(formData);
      message.success("Pooja updated successfully!");

      // resetDrawer();
      setTimeout(() => {
        // Display success alert and close the drawer if title and description are not empty
        setLoading(false);
        alert("Data Updated Successfully...!");

        resetDrawer();

        //after successful refresh the table
        refreshTable();

        //close drawer
        closeDrawer();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const slots = ["5AM - 7AM", "9AM - 11AM", "1PM - 2PM", "4PM - 6PM"];

  const isReadOnly = action === "View";

  return (
    <Drawer
      title={
        isUpdating ? "Update Booking" : action === "View" ? "View Booking" : ""
      }
      onClose={resetDrawer}
      open={openDrawer}
      maskClosable={false}
      width={800}
      className="space-y-4"
    >
      <Spin spinning={loading}>
        <div className="flex">
          <p className="py-2 font-semibold antialiased">Pooja Date</p>
        </div>
        <Input
          value={poojaDate}
          onChange={(e) => setPoojaDate(e.target.value)}
          readOnly={isReadOnly}
        />
        <div>
          <p className="py-4 font-semibold antialiased">Pooja Time</p>

          <div>
            <div>
              {action === "Edit" && (
                <div className="flex gap-10 py-4">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      onClick={() => setPoojaTime(slot)} // Set selected slot as poojaTime
                      className={`cursor-pointer border-2 p-2 rounded-md shadow-sm ${
                        slot === poojaTime
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-200"
                      }`}
                    >
                      <h1>{slot}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Input
            value={poojaTime}
            onChange={(e) => setPoojaTime(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4 font-semibold antialiased">Booking Status</p>
          <Input
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4 font-semibold antialiased">Puja Samagri</p>
          <Input
            type="checkbox"
            checked={pujaSamagri}
            onChange={(e) => setPujaSamagri(e.target.checked)}
            readOnly={isReadOnly}
            className="h-10 w-10 rounded-lg "
          />
        </div>

        {action === "Edit" && (
          <div>
            {bookingData.map((data, index) => (
              <div key={index}>
                <div className="">
                <PanditSlot poojaDate={poojaDate} pujaId={data.poojaId} panditId={data.panditId} panditName={data.panditName}/>
                  <p className="py-2 font-semibold antialiased">Pandit Name</p>
                  <Input value={data.panditName} readOnly />
                </div>
                <div>
                      <p className="py-2 font-semibold antialiased">
                        Puja ID
                      </p>
                      <Input value={data.poojaId} readOnly
                      
                      />
                    </div>

              </div>
            ))}
          </div>
        )}


        {action == "View" && (
          <div>
            <div>
              <p className="py-4 font-semibold antialiased">
                Additional Remark
              </p>
              <Input
                value={additionalRemark}
                onChange={(e) => setAdditionalRemark(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">
                Booking Cancel Remark
              </p>
              <Input
                value={bookingCancelRemark}
                onChange={(e) => setBookingCancelRemark(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Cancel By</p>
              <Input
                value={cancelBy}
                onChange={(e) => setCancelBy(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            {/* <div>
              <p className="py-4 font-semibold antialiased">Booking Slot ID</p>
              <Input
                value={bookingSlotId}
                onChange={(e) => setBookingSlotId(e.target.value)}
                readOnly={isReadOnly}
              />
            </div> */}

            <div>
              <p className="py-4 font-semibold antialiased">Pandit Remark</p>
              <Input
                value={panditRemark}
                onChange={(e) => setPanditRemark(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Final Amount</p>
              <Input
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Payment ID 2</p>
              <Input
                value={paymentId2}
                onChange={(e) => setPaymentId2(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Order ID 2</p>
              <Input
                value={orderId2}
                onChange={(e) => setOrderId2(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">
                Payment Refund Ref No
              </p>
              <TextArea
                value={paymentRefundReffNo}
                onChange={(e) => setPaymentRefundReffNo(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Order ID 2</p>
              <Input
                value={orderId2}
                onChange={(e) => setOrderId2(e.target.value)}
                readOnly={isReadOnly}
              />
              <div className=" ">
                <div className="mt-4 -mb-4 font-bold text-xl">
                  Pandit Details
                </div>
                <div className="h-1 ml-40 bg-gradient-to-r from-orange-500 to-yellow-300"></div>
              </div>
            </div>
          </div>
        )}
        {/* section bookinData */}
        {action === "View" && (
          <div>
            {bookingData.map((data, index) => (
              <div key={index}>
                {/* <p className="py-4 font-semibold antialiased">Pandit ID</p>
                <Input value={data.panditId} readOnly /> */}
                <div className="">
                  <div>
                    <p className="py-4 font-semibold antialiased"></p>
                    <img
                      src={data.panditImage}
                      alt="Pandit"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="py-2 font-semibold antialiased">
                        Pandit Name
                      </p>
                      <Input value={data.panditName} readOnly />
                    </div>
                    <div>
                      <p className="py-2 font-semibold antialiased">
                        Puja ID
                      </p>
                      <Input value={data.poojaId} readOnly />
                    </div>

                    <p className="py-2 font-semibold antialiased">
                      Pandit Location
                    </p>
                    <Input value={data.panditLocation} readOnly />

                    <p className="py-2 font-semibold antialiased">
                      Pandit Price
                    </p>
                    <Input value={data.panditNewPrice} readOnly />

                    <p className="py-2 font-semibold antialiased">
                      Pandit Number
                    </p>
                    <Input value={data.panditNo} readOnly />
                  </div>
                </div>

                {/* <p className="py-4 font-semibold antialiased">
                  Pandit Old Price
                </p>
                <Input value={data.panditOldPrice} readOnly /> */}

                <p className="py-4 font-semibold antialiased">Pooja Date</p>
                <Input value={data.poojaDate} readOnly />

                <p className="py-4 font-semibold antialiased">Pooja Duration</p>
                <Input value={data.poojaDuration} readOnly />

                {/* <p className="py-4 font-semibold antialiased">Pooja ID</p>
                <Input value={data.poojaId} readOnly /> */}

                <p className="py-4 font-semibold antialiased">Pooja Image</p>
                <img
                  src={data.poojaImageUrl}
                  alt="Pooja"
                  style={{ width: "100px" }}
                />

                <p className="py-4 font-semibold antialiased">Pooja Name</p>
                <Input value={data.poojaName} readOnly />

                <p className="py-4 font-semibold antialiased">Pooja Subtitle</p>
                <Input value={data.poojaSubtitle} readOnly />

                <p className="py-4 font-semibold antialiased">Verified Icon</p>
                <Input
                  value={data.verifiedIcon ? "Verified" : "Not Verified"}
                  readOnly
                />
                {/* <div className="h-1 mt-4  bg-gradient-to-r from-orange-500 to-yellow-300"></div> */}
                <div className="my-10">
                  <div className="mt-4 -mb-4 font-bold text-xl">
                    User Details
                  </div>

                  <div className="h-1 ml-40 bg-gradient-to-r from-orange-500 to-yellow-300 "></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* section userDetails */}
        {action === "View" && (
          <div>
            {userDetails.map((data, index) => (
              <div key={index}>
                <p className="py-4 font-semibold antialiased">
                  User's Aadhar Number
                </p>
                <Input value={data.aadharNo} readOnly />

                <p className="py-4 font-semibold antialiased">Age</p>
                <Input value={data.age} readOnly />

                <p className="py-4 font-semibold antialiased">Area Pin Code</p>
                <Input value={data.areaPinCode} readOnly />

                <p className="py-4 font-semibold antialiased">Contact Number</p>
                <Input value={data.contactNo} readOnly />

                <p className="py-4 font-semibold antialiased">Created At</p>
                <Input
                  value={new Date(data.createdAt).toLocaleString()}
                  readOnly
                />

                <p className="py-4 font-semibold antialiased">Email</p>
                <Input value={data.email} readOnly />

                <p className="py-4 font-semibold antialiased">Full Address</p>
                <Input value={data.fullAddress} readOnly />

                <p className="py-4 font-semibold antialiased">Gender</p>
                <Input value={data.gender} readOnly />

                <p className="py-4 font-semibold antialiased">House Number</p>
                <Input value={data.houseNo} readOnly />

                <p className="py-4 font-semibold antialiased">Landmark</p>
                <Input value={data.landMark} readOnly />

                <p className="py-4 font-semibold antialiased">Name</p>
                <Input value={data.name} readOnly />

                <p className="py-4 font-semibold antialiased">
                  Profile Picture
                </p>
                {data.profilePic ? (
                  <img
                    src={data.profilePic}
                    alt="Profile"
                    style={{ width: "100px" }}
                  />
                ) : (
                  <p>No profile picture available</p>
                )}

                <p className="py-4 font-semibold antialiased">Profile Status</p>
                <Input value={data.profileStatus} readOnly />

                <p className="py-4 font-semibold antialiased ">State</p>
                <Input value={data.state} readOnly />
              </div>
            ))}
            {/* <div className="h-1 mt-4  bg-gradient-to-r from-orange-500 to-yellow-300"></div> */}
            <div className="my-10">
              <div className="mt-4 -mb-4 font-bold text-xl">
                Delivery Details
              </div>
              <div className="h-1 ml-40 bg-gradient-to-r from-orange-500 to-yellow-300"></div>
            </div>
          </div>
        )}

        {/* section delivery AddressData */}

        {action === "View" && (
          <div>
            {deliveryAddressData.map((address, index) => (
              <div key={index}>
                <p className="py-4 font-semibold antialiased">Address Type</p>
                <Input value={address.addressType} readOnly />

                <p className="py-4 font-semibold antialiased">
                  Alternate Number
                </p>
                <Input value={address.alternateNo} readOnly />

                <p className="py-4 font-semibold antialiased">
                  Apartment/Road/Landmark
                </p>
                <Input value={address.apartmentRoadLandmark} readOnly />

                <p className="py-4 font-semibold antialiased">Area Pin Code</p>
                <Input value={address.areaPinCode} readOnly />

                <p className="py-4 font-semibold antialiased">Contact Number</p>
                <Input value={address.contactNo} readOnly />

                <p className="py-4 font-semibold antialiased">
                  Contact Person Name
                </p>
                <Input value={address.contactPersonName} readOnly />

                <p className="py-4 font-semibold antialiased">Email ID</p>
                <Input value={address.emailId} readOnly />

                <p className="py-4 font-semibold antialiased">
                  House/Flat/Block Number
                </p>
                <Input value={address.houseFlatBlockNo} readOnly />
              </div>
            ))}
          </div>
        )}
       

        {action !== "View" && (
          <div style={{ marginTop: "30px" }}>
            <MyButton
              title={isUpdating ? "Update" : "Submit"}
              action={handleSubmit}
            />
          </div>
        )}
      </Spin>
    </Drawer>
  );
};

export default BookingDrawer;

// import { Drawer, Input } from 'antd'
// import React, { useEffect, useState } from "react";
// import MyButton from '../ui/button';

// const BookingDrawer = ({
//   openDrawer,
//   closeDrawer,
//   refreshTable,
//   drawerData,
//   action,
// }) => {

//   const [loading, setLoading] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [bookingStatus, setBookingStatus] = useState("");
//   const[isDarweropen, setIsdrawerOpen]= useState(false);

//   // State Variables

//   useEffect(() => {
//     if (drawerData) {
//       // Set data in form when the drawer opens for edit or view
//       // setTitle(drawerData.title || "");
//       // setImages(drawerData.images || "");
//       setBookingStatus(drawerData.images || "");

//       setIsUpdating(action === "Edit");
//     }
//   }, [drawerData]);

//   const openDrawer=()=>{
//     setIsdrawerOpen(true)
//   }

//   // const formData = {
//   //   images,
//   //   title,

//   // };

//   const resetDrawer = () => {
//     setIsdrawerOpen(false)
//     setIsUpdating(false);

//   };

//   console.log("loo "+ drawerData._id)
//   const handleSubmit = async () => {
//     const errorMessage = validateForm();
//     if (errorMessage) {
//       message.error(errorMessage);
//       return;
//     }

//     setLoading(true);
//     setIsModalOpen(false);
//     try {
//       if (isUpdating) {
//         await updatePooja(drawerData._id, formData);
//         console.log(formData);
//         message.success("Pooja updated successfully!");
//       } else {
//         await createPooja(formData);
//         message.success("Pooja created successfully!");
//       }

//       // resetDrawer();
//       setTimeout(() => {
//         // Display success alert and close the drawer if title and description are not empty
//         setLoading(false);
//         alert("Data Updated Successfully...!");

//         resetDrawer();

//         //after successful refresh the table
//         refreshTable();

//         //close drawer
//         closeDrawer();
//       }, 1000);
//     } catch (error) {
//       console.error("Error:", error);
//       message.error("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isReadOnly = action === "View";
//   return (
//     <div>
//     <Drawer
//     title={
//       isUpdating
//         ? "Update Pooja"

//         : "Add New Pooja"
//     }
//     onClose={resetDrawer}
//     open={openDrawer}
//     maskClosable={false}
//     width={800}
//     className="space-y-4"
//   >
//     <Input
//               value={bookingStatus}
//               onChange={(e) => setBookingStatus(e.target.value)}
//               // readOnly={isReadOnly}
//             />

//           {/* {action !== "View" && ( */}
//           <div style={{ marginTop: "30px" }}>
//             <MyButton
//               title={isUpdating ? "Update" : "Submit"}
//               // action={handleSubmit}
//             />
//           </div>
//         {/* )} */}
//       </Drawer>
//     </div>
//   )
// }

// export default BookingDrawer
