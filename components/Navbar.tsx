import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Navbar = async () => {
  const { userId } = auth();
  return (
    <div className="bg-black text-lg font-bold text-white flex px-12 py-2  w-full flex-row justify-between items-center">
      <Link href="/">Home</Link>
      <div className="flex flex-row gap-x-12 items-center text-sm font-medium">
        <Link href="/photos">Photos</Link>
        <Link href="/profile">Profile</Link>
        <Link className="btn btn-secondary btn-sm" href="/sign-in">
          {userId ? <SignOutButton /> : <SignInButton />}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
