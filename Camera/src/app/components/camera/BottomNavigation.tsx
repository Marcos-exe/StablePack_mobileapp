import svgPaths from "../../../imports/svg-6z9hc1cmb8";

export function BottomNavigation() {
  return (
    <>
      {/* Active page highlight (behind camera icon) */}
      <div className="absolute bg-gradient-to-b from-[#080808] from-[26.442%] h-[66px] left-[calc(23.53%+4.53px)] rounded-[3px] to-[#131314] to-[75.481%] top-[calc(91.67%+4px)] w-[97.5px]" />

      {/* Separator line */}
      <div className="absolute bg-[#131314] h-[2px] left-0 top-[calc(91.67%+4px)] w-[390px]" />

      {/* Dashboard */}
      <div className="absolute h-[66px] left-0 top-[calc(91.67%+4px)] w-[97.5px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]">
          <div className="absolute inset-[15.24%_16.67%_16.66%_16.67%]">
            <div className="absolute inset-[-5.87%_-6%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6669 19.0237">
                <path
                  d={svgPaths.pb53d000}
                  stroke="#878787"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Live Camera (active) */}
      <div className="absolute h-[66px] left-[calc(23.53%+5.03px)] top-[calc(91.67%+4px)] w-[97.5px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]">
          <div className="absolute inset-[16.67%_12.5%_20.83%_12.5%]">
            <div className="absolute inset-[-6.4%_-5.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 17.625">
                <path
                  d={svgPaths.p9f73400}
                  stroke="#FFD700"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="absolute h-[66px] left-[calc(47.06%+11.06px)] top-[calc(91.67%+4px)] w-[97.5px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]">
          <div className="absolute inset-[12.5%]">
            <div className="absolute inset-[-5.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 20.75">
                <path
                  d={svgPaths.p1702f700}
                  stroke="#878787"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="absolute h-[66px] left-[calc(70.59%+17.09px)] top-[calc(91.67%+4px)] w-[97.5px]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]">
          <div className="absolute inset-[10.72%_8.35%]">
            <div className="absolute inset-[-5.09%_-4.8%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.8261 21.6409">
                <g>
                  <path
                    d={svgPaths.p1e108900}
                    stroke="#878787"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d={svgPaths.p146d2800}
                    stroke="#878787"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
