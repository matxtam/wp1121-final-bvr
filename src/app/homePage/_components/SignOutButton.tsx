"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth' });
  }
  return <Button variant={"outline"} data-testid="sign-out-button" onClick={handleSignOut} className="rounded">Sign Out</Button>;
}
