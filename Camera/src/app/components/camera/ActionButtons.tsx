import imgRelampago from "figma:asset/8fff019b0e7384a71c7f7edc5ed1cd888959fd88.png";
import svgPaths from "../../../imports/svg-6z9hc1cmb8";

export function ActionButtons() {
  return (
    <>
      {/* Analyze Package Button */}
      <div
        className="absolute bg-[#131314] h-[52px] left-[calc(5.88%+4.88px)] rounded-[15px] shadow-[2px_4px_4px_0px_black] top-[calc(47.22%+3.67px)] w-[165px]"
        data-name="Button"
      >
        <p
          className="-translate-x-1/2 absolute leading-[20px] left-[calc(50%+9px)] not-italic text-[13px] text-center text-white top-[calc(50%-10px)] tracking-[0.1px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          Analyze Package
        </p>
        <div className="absolute left-[11px] size-[23px] top-[14px]" data-name="Relampago">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgRelampago}
          />
        </div>
      </div>

      {/* Refresh Feed Button */}
      <div
        className="absolute border border-[#1e1e1e] border-solid h-[52px] left-[calc(52.94%-9.06px)] rounded-[15px] shadow-[2px_4px_4px_0px_black] top-[calc(47.22%+3.67px)] w-[165px]"
        data-name="Button"
      >
        <p
          className="-translate-x-1/2 absolute leading-[20px] left-[calc(50%+10px)] not-italic text-[13px] text-center text-white top-[calc(50%-10px)] tracking-[0.1px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          Reffresh Feed
        </p>
        <div className="absolute left-[20px] overflow-clip size-[17px] top-[16px]" data-name="Arrow / Arrows_Reload_01">
          <div className="absolute inset-[12.5%_19.09%_12.5%_19.1%]">
            <div className="absolute inset-[-7.84%_-9.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5083 14.75">
                <path
                  d={svgPaths.p308f2e00}
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
