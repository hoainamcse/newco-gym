import Image from "next/image";
import Introduction from "./components/Introduction";
import Navbar from "./components/Navbar";
import PopupChat from "./components/PopupChat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-900">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <Introduction />
      </div>
      <PopupChat />
    </main>
  );
}
