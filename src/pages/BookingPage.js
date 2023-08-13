import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setisAvailable] = useState(false);

  const dispatch = useDispatch();

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle book appointment
  const handleBookAppointment = async (req, res) => {
    try {
      setisAvailable(true)
      if(!date && !time){
        return alert("Date and Time required")
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          userId: user._id,
          doctorId: params.doctorId,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setisAvailable(true)
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //checking  Availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: params.id,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        // setisAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Booking page</h1>
      <div className="container">
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feePerCounselling}</h4>
            {/* <h4>Timing:{doctors.timing[0]} - {doctors.timing[1]}</h4> */}
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2 w-20"
                format="DD-MM-YYYY"
                onChange={(value) =>
                 { 
                  // setisAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"))}
                }
              />
              <TimePicker
                className="m-2 w-20"
                format="HH :mm"
                onChange={(value) => 
                  {
                    // setisAvailable(false)
                  setTime(moment(value).format("HH : mm"))}}
              />
              <div className="flex  ">
                <button
                  className="btn btn-primary m-2"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                {
                // !isAvailable && 
                (
                  <button
                  className="btn btn-primary m-2"
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
