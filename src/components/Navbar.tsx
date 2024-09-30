"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  //user take data from session instead of taking from "data" defined above ??? as per the documentation😂
  const user: User = session?.user;
  return (
    <nav>
      <div>
        <a href="#">Tickle Me</a>
        {session ? (
          <>
            <span>Welcome, {user.userName || user.email}</span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Link href="/sign-in">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
