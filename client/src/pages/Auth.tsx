import Navbar from "@/components/Navbar";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router";
import { loginUser, signUpUser } from "@/services/firebase";

type AuthType = "login" | "signup";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleAuthChange = (authType: AuthType) => {
    setIsLogin(authType === "login");
  };

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAuth = async (authType: AuthType) => {
    if (authType === "login") {
      const user = await loginUser({ email: formData.email, password: formData.password });
      console.log("user: ", user);
    } else {
      const user = await signUpUser({ email: formData.email, password: formData.password });
      console.log("user : ", user);
    }
  };

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-white dark:bg-zinc-950">
      <Navbar plain={true} />
      <Tabs value={isLogin ? "login" : "signup"} defaultValue={isLogin ? "login" : "signup"} className="mx-auto mt-[15%] w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => handleAuthChange("login")} value="login">
            Log in
          </TabsTrigger>
          <TabsTrigger onClick={() => handleAuthChange("signup")} value="signup">
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In to Synergy</CardTitle>
              <CardDescription>Enter your email and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" onChange={handleFormDataChange} type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" onChange={handleFormDataChange} type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleAuth("login")}>Log In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up with Synergy</CardTitle>
              <CardDescription>Enter your email, name and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" onChange={handleFormDataChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" onChange={handleFormDataChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input name="password" id="password" onChange={handleFormDataChange} type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input name="confirmPassword" id="confirmPassword" onChange={handleFormDataChange} type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleAuth("signup")}>Sign Up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
