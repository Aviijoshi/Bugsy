import React from "react";

const ScoreSquare = ({ score }) => {
  let size = 120;
  let radius = 12;
  let perimeter = 4 * size - 20;
  let progress = (score / 100) * perimeter;

  return (
    <>
      <div className="relative w-[120px] h-[120px] ">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          {/* For background */}
          <rect
            x="10"
            y="10"
            width={size - 20}
            height={size - 20}
            rx={radius}
            fill="none"
            stroke="#1f1f2e"
            strokeWidth="10"
          />

          {/* This is for progress */}
          <rect
            x="10"
            y="10"
            width={size - 20}
            height={size - 20}
            rx={radius}
            fill="none"
            stroke="#34D399"
            strokeWidth="10"
            strokeLinecap="round"
            pathLength={perimeter}
            strokeDasharray={perimeter}
            strokeDashoffset={perimeter - progress}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-green-300">{score}</span>
          <span className=" text-gray-200 text-2xl ">/100</span>
        </div>
      </div>
    </>
  );
};

export default ScoreSquare;
