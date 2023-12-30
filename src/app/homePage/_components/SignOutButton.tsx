// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
"use client";
import { signOut } from "next-auth/react";
// import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  // signOut({ callbackUrl: "/"})
  // const router = useRouter();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth' });
    // router.push("/anth");
  }
  return <Button variant={"outline"} data-testid="sign-out-button" onClick={handleSignOut} className="rounded">Sign Out</Button>;
}
// TODO: 4. end
