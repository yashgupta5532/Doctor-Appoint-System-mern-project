import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //handle read notification
  const handleMarkAllRead = async (req, res) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  //delete notification
  const handleDeleteAllRead =async() => {
    try {
        dispatch(showLoading());
        const res=await axios.post('/api/v1/user/delete-all-notification',{userId:user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }
        else{
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error('something went wrong')
    }
  };
  return (
    <>
      <Layout>
        <h3 className="text-center p-3">Notification page</h3>
        <Tabs>
          <Tabs.TabPane tab="UnRead" key={0} style={{ cursor: "pointer" }}>
            <div className="d-flex justify-content-end">
              <h4
                style={{ cursor: "pointer" }}
                className="mx-3 text-light"
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </h4>
            </div>
            {user && user.notification.map((notificationMsg) => (
                <div
                  className="card p-3 my-2 font-size-5 mx-2"
                  onClick={notificationMsg.onClickPath}
                >
                  <div className="card-text">{notificationMsg.message}</div>
                </div>
              ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1} style={{ cursor: "pointer" }}>
            <div className="d-flex justify-content-end">
              <h4 className="mx-3 text-light" onClick={handleDeleteAllRead}>
                Delete All Read
              </h4>
            </div>
            {user &&
              user.seenNotification.map((notificationMsg) => (
                <div
                  className="card p-3 my-2 font-size-5 mx-2"
                  onClick={notificationMsg.onClickPath}
                >
                  <div className="card-text">{notificationMsg.message}</div>
                </div>
              ))}
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </>
  );
};

export default NotificationPage;
