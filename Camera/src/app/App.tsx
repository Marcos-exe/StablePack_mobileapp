import { CameraPage } from "./components/camera/CameraPage";

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#080808]">
      {/* Mobile container — matches the 390px Figma frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          maxHeight: "100vh",
          boxShadow: "0 0 60px rgba(0,0,0,0.8)",
          borderRadius: "40px",
        }}
      >
        <CameraPage />
      </div>
    </div>
  );
}
