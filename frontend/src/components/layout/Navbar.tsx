import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[#2A2A35]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-white">
            Agent Egbon AI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#howitworks"
            className="text-[#A0A0B0] hover:text-white transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#supportedchains"
            className="text-[#A0A0B0] hover:text-white transition-colors"
          >
            Something
          </Link>
        </div>

        <Link href="/chat">
          <button className="bg-indigo-600 p-2 text-white rounded-xl">
            Open Chat
          </button>
        </Link>
      </div>
    </nav>
  );
}
