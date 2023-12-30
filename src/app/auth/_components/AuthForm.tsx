"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
// Run: npx shadcn-ui@latest add button
import { Button } from "@/components/ui/button";
// Run: npx shadcn-ui@latest add card
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "./AuthInput";
import type { User } from "@/lib/types/db";
type props = {  
  allUsers?: User[];
};
function AuthForm({ allUsers }: props) {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if(isSignUp && allUsers?.some((user: User) => user.email === email)) {
      alert("Email already exists");
      return;
    }
    if(isSignUp && allUsers?.some((user: User) => user.name === name)) {
      alert("Name already exists");
      return;
    }
    if(password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if(!isSignUp && !allUsers?.some((user: User) => user.email === email)) {
      alert("Email does not exist");
      return;
    }

    // if(!isSignUp && !allUsers?.some((user: any) => user.password === password)) {
    //   alert("Password is incorrect");
    //   return;
    // }

    // if (!isSignUp) {
    //   let foundUser = allUsers?.find((user: any) => user.email === email);
    //   if (foundUser) {
    //     console.log("foundUser", foundUser);
    //     if (password !== foundUser.password) {
    //       console.log("password", password);
    //       console.log("foundUser.password", foundUser.password);
    //       alert('Password is incorrect');
    //     }
    //   }
      
    // }
    
    signIn("credentials", {
      email,
      name,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}`,
    });
  };
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Sign {isSignUp ? "Up" : "In"}</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Email (please contain @ and .com)"
            type="email"
            value={email}
            setValue={setEmail}
          />
          {isSignUp && (
            <AuthInput
              label="Name"
              type="text"
              value={name}
              setValue={setName}
            />
          )}
          <AuthInput
            label="Password (8 characters minimum)"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {isSignUp && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          )}
          <div className="text-sm text-gray-500">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <a
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </a>
              </span>
            ) : (
              <span>
                Do not have an account?{" "}
                <a
                  data-testid="sign-in-up-button"
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </a>
              </span>
            )}
          </div>

          <Button
            data-testid="auth-submit-button"
            type="submit"
            className="w-full"
          >
            Sign {isSignUp ? "Up" : "In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AuthForm;
