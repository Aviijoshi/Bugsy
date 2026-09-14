import React from 'react'
import * as FaIcons from "react-icons/fa";
const CriticalBox = ({data}) => {
    let Icon = FaIcons[data.icon]
  return (
    <>
    <div className="criticalBox flex items-start gap-[10px] p-[15px] rounded-lg bg-[#16181E] ">
        <i className='text-[25px] text-[#FDA4AF] '> {Icon && <Icon/> } </i>
        <div>
            <h3 className='text-[20px] font-[700] mb-1 ' >{data.title}</h3>
            <p className='text-[14px] text-gray-500 '> {data.description} </p>
        </div>
    </div>
    </>
  )
}

export default CriticalBox
