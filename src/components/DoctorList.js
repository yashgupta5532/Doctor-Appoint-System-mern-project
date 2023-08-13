import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({doctor}) => {
    const navigate=useNavigate()
  return (
    <>
      <div className="card m-2" onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)} style={{cursor:"pointer"}}>
            <div className="card-header">
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className="card-body">
                <p>
                    <b>Specialization :</b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience :</b> {doctor.experience}
                </p>
                <p>
                    <b>Fees Per Counselling :</b> {doctor.feePerCounselling}
                </p>
                <p>
                    <b>timing :</b> {doctor.timing[0]} - {doctor.timing[1]}
                </p>
            </div>
        </div>  
    </>
  )
}

export default DoctorList