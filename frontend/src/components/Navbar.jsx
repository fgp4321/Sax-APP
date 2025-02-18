import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 bg-transparent backdrop-blur-md">
      <img href="/" src="/escudo_sax.svg" alt="Escudo Ayuntamiento" className="h-20 ml-4" />
      <a href="/login" className="mr-4">
        <FaUserCircle className="text-3xl text-white hover:text-gray-300" />
      </a>
    </nav>
  );
}
