import svgPaths from "../../../imports/svg-6z9hc1cmb8";

export function CameraFeed() {
  return (
    <>
      {/* Dark camera card */}
      <div className="-translate-x-1/2 absolute bg-[#131314] border-2 border-[#1e1e1e] border-solid h-[300px] left-[calc(50%+0.5px)] rounded-[25px] shadow-[2px_4px_4px_0px_black] top-[calc(11.11%-5.67px)] w-[334px]" />

      {/* Camera icon */}
      <div
        className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] overflow-clip size-[40px] top-[calc(26.39%-4.83px)]"
        data-name="System / Camera"
      >
        <div className="absolute inset-[16.67%_12.5%_20.83%_12.5%]">
          <div className="absolute inset-[-4%_-3.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 27">
              <path
                d={svgPaths.p3d4ed180}
                stroke="#5C5C5C"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Primary label */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[#5c5c5c] text-[12px] text-center top-[calc(30.56%-3.83px)] w-[194px]"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
        <p className="leading-[15px] whitespace-pre-wrap">Camera feed will appear here</p>
      </div>

      {/* Secondary label */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[#5c5c5c] text-[9px] text-center top-[calc(33.33%-11.5px)] w-[194px]"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
        <p className="leading-[15px] whitespace-pre-wrap">(Connect to Stable Pack device)</p>
      </div>
    </>
  );
}
