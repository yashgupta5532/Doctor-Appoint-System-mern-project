import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {
    const [users, setUsers] = useState([])
    //get users
    const getUsers=async()=>{
        try {
            const res=await axios.get('/api/v1/admin/getAllUsers',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setUsers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //antd table col

    const columns=[
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Doctor",
            dataIndex:"isDoctor",
            render:(text,record)=>
            <span>{record.isDoctor?"Yes":"No"}</span>
        },
        {
            title:"Actions",
            dataIndex:"actions",
            render:(text,record)=>(
                <div className="d-flex">
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
    ]

    useEffect(() => {
     getUsers()
    }, [])
    

  return (
    <Layout>
        <h2>Users List :</h2>
        <Table columns={columns} dataSource={users}>

        </Table>
    </Layout>
  )
}

export default Users