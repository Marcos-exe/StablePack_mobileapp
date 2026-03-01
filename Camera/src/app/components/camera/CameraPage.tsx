import { CameraHeader } from "./CameraHeader";
import { CameraFeed } from "./CameraFeed";
import { ActionButtons } from "./ActionButtons";
import { RecentAnalyzesList } from "./RecentAnalyzesList";
import { BottomNavigation } from "./BottomNavigation";

/**
 * Main camera dashboard page.
 * Uses the original Figma absolute-positioning layout — all children are
 * positioned with percentage-based `calc()` coordinates relative to this
 * 390 × 844 container, exactly as exported from Figma.
 */
export function CameraPage() {
  return (
    <div
      className="bg-gradient-to-b from-[#1e1e1e] relative size-full to-[#080808] to-[17.788%] overflow-hidden"
      data-name="CameraPage"
    >
      <CameraHeader />
      <CameraFeed />
      <ActionButtons />
      <RecentAnalyzesList />
      <BottomNavigation />
    </div>
  );
}
