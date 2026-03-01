import clsx from "clsx";
import svgPaths from "./svg-6z9hc1cmb8";
import imgRelampago from "figma:asset/8fff019b0e7384a71c7f7edc5ed1cd888959fd88.png";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex gap-[23px] items-center px-[10px] py-[8px] relative w-full">{children}</div>
    </div>
  );
}
type RecentAnalyzesAnalyzeProps = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function RecentAnalyzesAnalyze({ text, text1, text2, additionalClassNames = "" }: RecentAnalyzesAnalyzeProps) {
  return (
    <div className={clsx("absolute bg-[#131314] rounded-[10px] w-[330px]", additionalClassNames)}>
      <Wrapper>
        <div className="h-[24px] relative rounded-[100px] shrink-0 w-[90px]">
          <div aria-hidden="true" className="absolute border border-[#3cb371] border-solid inset-0 pointer-events-none rounded-[100px]" />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:Medium',sans-serif] h-[10px] justify-center leading-[0] left-[45px] not-italic text-[#3cb371] text-[14px] text-center top-[12px] w-[60px]">
              <p className="leading-[0px] whitespace-pre-wrap">{text}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Poppins:Light',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[90px]">
          <p className="leading-[20px] whitespace-pre-wrap">{text1}</p>
        </div>
        <div className="flex flex-col font-['Poppins:Medium',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[88px]">
          <p className="leading-[20px] whitespace-pre-wrap">{text2}</p>
        </div>
      </Wrapper>
    </div>
  );
}

export default function CameraPage() {
  return (
    <div className="bg-gradient-to-b from-[#1e1e1e] relative size-full to-[#080808] to-[17.788%]" data-name="CameraPage">
      <div className="absolute bg-gradient-to-b from-[#080808] from-[26.442%] h-[66px] left-[calc(23.53%+4.53px)] rounded-[3px] to-[#131314] to-[75.481%] top-[calc(91.67%+4px)] w-[97.5px]" data-name="Selected Page" />
      <div className="absolute contents left-0 top-[calc(91.67%+4px)]" data-name="Page Selection">
        <div className="absolute h-[66px] left-0 top-[calc(91.67%+4px)] w-[97.5px]" data-name="Dashboard Selection">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]" data-name="Navigation / House_01">
            <div className="absolute inset-[15.24%_16.67%_16.66%_16.67%]" data-name="Vector">
              <div className="absolute inset-[-5.87%_-6%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6669 19.0237">
                  <path d={svgPaths.pb53d000} id="Vector" stroke="var(--stroke-0, #878787)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[66px] left-[calc(23.53%+5.03px)] top-[calc(91.67%+4px)] w-[97.5px]" data-name="Live camera Selection">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]" data-name="System / Camera">
            <div className="absolute inset-[16.67%_12.5%_20.83%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-6.4%_-5.33%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 17.625">
                  <path d={svgPaths.p9f73400} id="Vector" stroke="var(--stroke-0, #FFD700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[66px] left-[calc(47.06%+11.06px)] top-[calc(91.67%+4px)] w-[97.5px]" data-name="History Selection">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]" data-name="Calendar / Clock">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <div className="absolute inset-[-5.33%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.75 20.75">
                  <path d={svgPaths.p1702f700} id="Vector" stroke="var(--stroke-0, #878787)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[66px] left-[calc(70.59%+17.09px)] top-[calc(91.67%+4px)] w-[97.5px]" data-name="Settings Selection">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[25px] top-[calc(50%+0.5px)]" data-name="Interface / Settings">
            <div className="absolute inset-[10.72%_8.35%]" data-name="Vector">
              <div className="absolute inset-[-5.09%_-4.8%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.8261 21.6409">
                  <g id="Vector">
                    <path d={svgPaths.p1e108900} stroke="var(--stroke-0, #878787)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d={svgPaths.p146d2800} stroke="var(--stroke-0, #878787)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#131314] h-[2px] left-0 top-[calc(91.67%+4px)] w-[390px]" />
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%+0.5px)] top-[calc(11.11%-5.67px)]" data-name="Live Camera">
        <div className="-translate-x-1/2 absolute bg-[#131314] border-2 border-[#1e1e1e] border-solid h-[300px] left-[calc(50%+0.5px)] rounded-[25px] shadow-[2px_4px_4px_0px_black] top-[calc(11.11%-5.67px)] w-[334px]" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:Light',sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[#5c5c5c] text-[12px] text-center top-[calc(30.56%-3.83px)] w-[194px]">
          <p className="leading-[15px] whitespace-pre-wrap">Camera feed will appear here</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:Light',sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[#5c5c5c] text-[9px] text-center top-[calc(33.33%-11.5px)] w-[194px]">
          <p className="leading-[15px] whitespace-pre-wrap">(Connect to Stable Pack device)</p>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] overflow-clip size-[40px] top-[calc(26.39%-4.83px)]" data-name="System / Camera">
          <div className="absolute inset-[16.67%_12.5%_20.83%_12.5%]" data-name="Vector">
            <div className="absolute inset-[-4%_-3.33%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 27">
                <path d={svgPaths.p3d4ed180} id="Vector" stroke="var(--stroke-0, #5C5C5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-[calc(50%-0.5px)] top-[calc(55.56%+7.67px)]" data-name="Recent Analyzes">
        <div className="absolute bg-[#131314] left-[calc(11.76%-10.24px)] rounded-[10px] top-[calc(61.11%-3.67px)] w-[330px]" data-name="Analyze">
          <Wrapper>
            <div className="h-[24px] relative rounded-[100px] shrink-0 w-[90px]">
              <div aria-hidden="true" className="absolute border border-[#dc143c] border-solid inset-0 pointer-events-none rounded-[100px]" />
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:Medium',sans-serif] h-[10px] justify-center leading-[0] left-[45px] not-italic text-[#dc143c] text-[14px] text-center top-[12px] w-[72px]">
                  <p className="leading-[0px] whitespace-pre-wrap">Damaged</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Poppins:Light',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[90px]">
              <p className="leading-[20px] whitespace-pre-wrap">5 minutes ago</p>
            </div>
            <div className="flex flex-col font-['Poppins:Medium',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[88px]">
              <p className="leading-[20px] whitespace-pre-wrap">49% Confidence</p>
            </div>
          </Wrapper>
        </div>
        <RecentAnalyzesAnalyze text="Intact" text1="10 minutes ago" text2="67% Confidence" additionalClassNames="left-[calc(11.76%-10.24px)] top-[calc(66.67%+1px)]" />
        <RecentAnalyzesAnalyze text="Intact" text1="22 minutes ago" text2="76% Confidence" additionalClassNames="left-[calc(11.76%-11.24px)] top-[calc(72.22%+5.67px)]" />
        <RecentAnalyzesAnalyze text="Intact" text1="37 minutes ago" text2="93% Confidence" additionalClassNames="left-[calc(11.76%-10.24px)] top-[calc(77.78%+12.33px)]" />
        <RecentAnalyzesAnalyze text="Intact" text1="59 minutes ago" text2="100% Confidence" additionalClassNames="left-[calc(11.76%-10.24px)] top-[calc(83.33%+17px)]" />
        <p className="-translate-x-1/2 absolute font-['Poppins:SemiBold',sans-serif] leading-[20px] left-[calc(32.35%-5.65px)] not-italic text-[#ffd700] text-[20px] text-center text-shadow-[2px_4px_4px_black] top-[calc(58.33%-15px)] tracking-[0.1px]">Recent Analyzes</p>
        <div className="absolute contents left-[calc(5.88%+2.88px)] top-[calc(55.56%+7.67px)]">
          <div className="absolute flex h-[285px] items-center justify-center left-[calc(5.88%+2.88px)] top-[calc(55.56%+7.67px)] w-[2px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="bg-[rgba(255,215,0,0.4)] h-[2px] w-[285px]" />
            </div>
          </div>
          <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(61.11%+14.33px)] w-[10px]" />
          <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(69.44%-2.67px)] w-[10px]" />
          <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(75%+3px)] w-[10px]" />
          <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(80.56%+8.67px)] w-[10px]" />
          <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(86.11%+15.33px)] w-[10px]" />
        </div>
      </div>
      <div className="absolute bg-[#131314] h-[52px] left-[calc(5.88%+4.88px)] rounded-[15px] shadow-[2px_4px_4px_0px_black] top-[calc(47.22%+3.67px)] w-[165px]" data-name="Button">
        <p className="-translate-x-1/2 absolute font-['Poppins:SemiBold',sans-serif] leading-[20px] left-[calc(50%+9px)] not-italic text-[13px] text-center text-white top-[calc(50%-10px)] tracking-[0.1px]">Analyze Package</p>
        <div className="absolute left-[11px] size-[23px] top-[14px]" data-name="Relampago">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRelampago} />
        </div>
      </div>
      <div className="absolute border border-[#1e1e1e] border-solid h-[52px] left-[calc(52.94%-9.06px)] rounded-[15px] shadow-[2px_4px_4px_0px_black] top-[calc(47.22%+3.67px)] w-[165px]" data-name="Button">
        <p className="-translate-x-1/2 absolute font-['Poppins:SemiBold',sans-serif] leading-[20px] left-[calc(50%+10px)] not-italic text-[13px] text-center text-white top-[calc(50%-10px)] tracking-[0.1px]">Reffresh Feed</p>
        <div className="absolute left-[20px] overflow-clip size-[17px] top-[16px]" data-name="Arrow / Arrows_Reload_01">
          <div className="absolute inset-[12.5%_19.09%_12.5%_19.1%]" data-name="Vector">
            <div className="absolute inset-[-7.84%_-9.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5083 14.75">
                <path d={svgPaths.p308f2e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Poppins:Black',sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[23px] text-center text-white top-[calc(5.56%+4.67px)] w-[286px]">
        <p className="leading-[44px] whitespace-pre-wrap">Live Camera</p>
      </div>
    </div>
  );
}