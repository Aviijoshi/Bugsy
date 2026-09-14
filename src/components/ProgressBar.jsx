import React from "react";

const ProgressBar = ({ name, score }) => {
  let width = "10vw";
  return (
    <>
      <div className="p-[15px] rounded-lg progressbar w-full   ">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-[17px] font-[500] "> {name} </p>
          <p className="text-gray-400 text-[17px] font-[500] ">{score}/100</p>
        </div>
        <div className="progress ">
          <div className="bg w-full h-[7px] rounded-[30px] bg-[#1F1F2E] relative  ">
            <div
            style={{width:score+"%" }}
             className={`absolute left-0 top-0 score  h-[8px] rounded-[30px] bg-[#6366F1] ${score<50? "bg-red-500": score<75?"bg-yellow-500" : "bg-green-500" } `}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
