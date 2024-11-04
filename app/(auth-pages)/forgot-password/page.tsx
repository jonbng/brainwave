"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit, Mail, ArrowRight } from "lucide-react";
import { Message } from "@/components/form-message";
import { forgotPasswordAction } from "@/app/actions";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const searchParams = await props.searchParams;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!email) {
      setError("Please enter your email");
      return;
    }
    // Handle password reset logic here
    console.log("Sending password reset email to:", email);
    forgotPasswordAction(email);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-backgroucallbackUrlnd  flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center space-x-2 mb-8">
        <BrainCircuit className="w-10 h-10" />
        <span className="text-2xl font-bold">Brainwave</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-green-600 mb-4">
                Password reset link sent to your email!
              </p>
              <p className="text-muted-foreground">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
