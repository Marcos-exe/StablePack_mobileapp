/** Inner wrapper used by each row — matches the original Figma Wrapper component */
function RowWrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex gap-[23px] items-center px-[10px] py-[8px] relative w-full">
        {children}
      </div>
    </div>
  );
}

type AnalyzeRowProps = {
  /** Badge label */
  status: "Intact" | "Damaged";
  timeAgo: string;
  confidence: string;
  /** Tailwind `top-*` / `left-*` classes for absolute positioning */
  positionClasses: string;
};

function AnalyzeRow({ status, timeAgo, confidence, positionClasses }: AnalyzeRowProps) {
  const isIntact = status === "Intact";
  const badgeColor = isIntact ? "#3cb371" : "#dc143c";
  const labelWidth = isIntact ? "w-[60px]" : "w-[72px]";

  return (
    <div className={`absolute bg-[#131314] rounded-[10px] w-[330px] ${positionClasses}`}>
      <RowWrapper>
        {/* Status badge */}
        <div className="h-[24px] relative rounded-[100px] shrink-0 w-[90px]">
          <div
            aria-hidden="true"
            className="absolute border border-solid inset-0 pointer-events-none rounded-[100px]"
            style={{ borderColor: badgeColor }}
          />
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div
              className={`-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[10px] justify-center leading-[0] left-[45px] not-italic text-[14px] text-center top-[12px] ${labelWidth}`}
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, color: badgeColor }}
            >
              <p className="leading-[0px] whitespace-pre-wrap">{status}</p>
            </div>
          </div>
        </div>

        {/* Time ago */}
        <div
          className="flex flex-col h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[90px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          <p className="leading-[20px] whitespace-pre-wrap">{timeAgo}</p>
        </div>

        {/* Confidence */}
        <div
          className="flex flex-col h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white tracking-[0.1px] w-[88px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
        >
          <p className="leading-[20px] whitespace-pre-wrap">{confidence}</p>
        </div>
      </RowWrapper>
    </div>
  );
}

/**
 * Renders the full "Recent Analyzes" section with the exact absolute
 * positioning from the original Figma design. All coordinates are
 * percentage-based relative to the top-level 390×844 page container.
 */
export function RecentAnalyzesList() {
  return (
    <>
      {/* Section title */}
      <p
        className="-translate-x-1/2 absolute leading-[20px] left-[calc(32.35%-5.65px)] not-italic text-[#ffd700] text-[20px] text-center top-[calc(58.33%-15px)] tracking-[0.1px]"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          textShadow: "2px 4px 4px black",
        }}
      >
        Recent Analyzes
      </p>

      {/* ── Analyze rows ── */}
      <AnalyzeRow
        status="Damaged"
        timeAgo="5 minutes ago"
        confidence="49% Confidence"
        positionClasses="left-[calc(11.76%-10.24px)] top-[calc(61.11%-3.67px)]"
      />
      <AnalyzeRow
        status="Intact"
        timeAgo="10 minutes ago"
        confidence="67% Confidence"
        positionClasses="left-[calc(11.76%-10.24px)] top-[calc(66.67%+1px)]"
      />
      <AnalyzeRow
        status="Intact"
        timeAgo="22 minutes ago"
        confidence="76% Confidence"
        positionClasses="left-[calc(11.76%-11.24px)] top-[calc(72.22%+5.67px)]"
      />
      <AnalyzeRow
        status="Intact"
        timeAgo="37 minutes ago"
        confidence="93% Confidence"
        positionClasses="left-[calc(11.76%-10.24px)] top-[calc(77.78%+12.33px)]"
      />
      <AnalyzeRow
        status="Intact"
        timeAgo="59 minutes ago"
        confidence="100% Confidence"
        positionClasses="left-[calc(11.76%-10.24px)] top-[calc(83.33%+17px)]"
      />

      {/* ── Timeline ── */}
      {/* Vertical golden line */}
      <div
        className="absolute flex h-[285px] items-center justify-center left-[calc(5.88%+2.88px)] top-[calc(55.56%+7.67px)] w-[2px]"
        style={
          {
            "--transform-inner-width": "1200",
            "--transform-inner-height": "0",
          } as React.CSSProperties
        }
      >
        <div className="-rotate-90 flex-none">
          <div className="bg-[rgba(255,215,0,0.4)] h-[2px] w-[285px]" />
        </div>
      </div>

      {/* Horizontal tick marks */}
      <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(61.11%+14.33px)] w-[10px]" />
      <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(69.44%-2.67px)]  w-[10px]" />
      <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(75%+3px)]        w-[10px]" />
      <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(80.56%+8.67px)] w-[10px]" />
      <div className="absolute bg-[rgba(255,215,0,0.3)] h-[2px] left-[calc(5.88%+2.88px)] top-[calc(86.11%+15.33px)] w-[10px]" />
    </>
  );
}
