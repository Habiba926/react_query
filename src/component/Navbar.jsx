import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center justify-between gap-5 py-5 px-10 bg-gray-100">
      <div className="text-2xl font-bold">LOGO</div>
      <div className="flex gap-5 items-center">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        <Link href="/users" className="text-lg font-semibold">
          Users
        </Link>
      </div>
    </div>
  );
}

export default Navbar;