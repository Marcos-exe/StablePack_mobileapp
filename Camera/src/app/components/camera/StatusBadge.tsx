type StatusType = "Intact" | "Damaged";

type StatusBadgeProps = {
  status: StatusType;
};

const statusStyles: Record<StatusType, { border: string; text: string }> = {
  Intact: {
    border: "border-[#3cb371]",
    text: "text-[#3cb371]",
  },
  Damaged: {
    border: "border-[#dc143c]",
    text: "text-[#dc143c]",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = statusStyles[status];
  return (
    <div
      className={`flex items-center justify-center h-[24px] w-[90px] rounded-full border ${styles.border} shrink-0`}
    >
      <span
        className={`font-['Poppins',sans-serif] font-medium text-[13px] ${styles.text} leading-none`}
      >
        {status}
      </span>
    </div>
  );
}
