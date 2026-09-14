import React from 'react'

const WarningCom = ({data}) => {
  return (
    <>
    <div className='warningCom flex items-center justify-between p-[15px] rounded-lg bg-[#13151B] '>
        <h3 className=' text-[17px] '> {data.title} </h3>
        <div className=' line  bg-[#34343D] rounded-lg  '>
            <p>Line {data.line} </p>
        </div>
    </div>
    </>
  )
}

export default WarningCom
