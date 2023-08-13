import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, Row ,TimePicker,message} from "antd"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const ApplyDoctor = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.user)
    //handle form 
    const handleFinish=async (values)=>{
        try {
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/apply-doctor',{...values,userId:user._id,
                timing:[
                    moment(values.timing[0],'HH:mm'),
                    moment(values.timing[1],'HH:mm'),
                ]
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }
            else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("something went wrong")
        }
    }
  return (
    <Layout>
    <h2 className='text-center'>Apply Doctors</h2>
    <Form layout='vertical' onFinish={handleFinish} className='m-3'>
        <h4 className='text-light'>Personal Details :</h4>
        <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="First name" name="firstName" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter firstname'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Last name" name="lastName" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter LastName'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Phone Number" name="phone" required rules={[{required:true}]}>
                    <Input type='Number' placeholder='Enter Phone number'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                    <Input type='email' placeholder='Enter email'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website" required rules={[{required:true}]}>
                    <Input type='url' placeholder='Enter link of website'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Enter your address'>
                    </Input>
                </Form.Item>
            </Col>
        </Row>
        <h4 className='text-light'>Professional Details</h4>
        <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Your specialization'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Years of Experience" name="experience" required rules={[{required:true}]}>
                    <Input type='Number' placeholder='Your Experience'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Fee per Counselling" name="feePerCounselling" required rules={[{required:true}]}>
                    <Input type='Number' placeholder='Your Fee per Counselling'>
                    </Input>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timing" name="timing" required rules={[{required:true}]}>
                    <TimePicker.RangePicker/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <div className="d-flex justify-content-center my-4 ">
                    <button className='btn btn-primary w-100' type='submit'>Submit</button>
                </div>
            </Col> 
        </Row>
        
    </Form>
    </Layout>
  )
}

export default ApplyDoctor