import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router";
import { signUpUser, loginUser } from "@/actions/user";
import { useUserStore } from "@/hooks/useUserStore";
import toast from "react-hot-toast";
import { STD_ERR_MSG } from "@/utils/constants";

export default function Auth() {
  const setUser = useUserStore((state) => state.setUser);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormData>(emptyFormData);
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const location = useLocation();

  const visibleFields = isLogin ? formFields.filter((field) => field.login) : formFields;

  const handleAuthChange = (authType: AuthType) => {
    setErrors((prev) => ({ ...prev, ...emptyFormData }));
    setIsLogin(authType === "login");
  };

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAuth = async (authType: AuthType) => {
    try {
      const result = validate(formData, authType);
      if (!result.isValid) {
        setErrors(result.errors || emptyFormData);
        return;
      }

      setErrors(emptyFormData);
      setIsLoading(true);

      let response;
      if (authType === "login") {
        response = await loginUser({ email: formData.email, password: formData.password });
      } else {
        response = await signUpUser({
          name: formData.name,
          confirmPassword: formData.confirmPassword,
          email: formData.email,
          password: formData.password,
        });
      }

      if (response?.data) {
        setUser(response.data);
      } else if (response.error && typeof response.error.message) {
        if (errorCodeToFieldMap[response.error.code])
          setErrors((prev) => ({
            ...prev,
            [errorCodeToFieldMap[response.error.code]]: response.error.message,
          }));
      } else {
        toast.error(STD_ERR_MSG);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(STD_ERR_MSG);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-screen h-screen bg-white dark:bg-zinc-950">
      <Tabs value={isLogin ? "login" : "signup"} defaultValue={isLogin ? "login" : "signup"} className="mx-auto mt-[15%] w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => handleAuthChange("login")} value="login">
            Log in
          </TabsTrigger>
          <TabsTrigger onClick={() => handleAuthChange("signup")} value="signup">
            Sign up
          </TabsTrigger>
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent key={index} value={tab.value}>
            <Card>
              <CardHeader>
                <CardTitle>{tab.title}</CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {visibleFields.map((field, index) => (
                  <div key={index} className="space-y-1 mb-1">
                    <Label htmlFor={field.key}>{field.label}</Label>
                    <Input name={field.key} type={field.type} id={field.key} onChange={handleFormDataChange} />
                    {errors[field.key as keyof FormData] && <span className="text-red-500">{errors[field.key as keyof FormData]}</span>}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button disabled={isLoading} onClick={() => handleAuth(tab.value as AuthType)}>
                  {tab.value === "login" ? "Log In" : "Sign Up"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const formDataSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginFormDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Invalid Password"),
});

type AuthType = "login" | "signup";

type FormData = z.infer<typeof formDataSchema>;

const emptyFormData: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formFields = [
  {
    label: "Name",
    type: "text",
    key: "name",
  },
  {
    label: "Email",
    type: "email",
    key: "email",
    login: true,
  },
  {
    label: "Password",
    type: "password",
    key: "password",
    login: true,
  },
  {
    label: "Confirm Password",
    type: "password",
    key: "confirmPassword",
  },
];

const tabs = [
  { label: "Log In", title: "Log in to Synergy", description: "Enter your email and password", value: "login" },
  { label: "Sign Up", title: "Sign up with Synergy", description: "Enter your email, name and password", value: "signup" },
];

const errorCodeToFieldMap: Record<string, keyof FormData> = {
  "invalid-email": "email",
  "email-already-in-use": "email",
};

const validate = (formData: FormData, authType: AuthType) => {
  const errors = { ...emptyFormData };
  const { success, error } = authType === "login" ? loginFormDataSchema.safeParse(formData) : formDataSchema.safeParse(formData);
  if (error && error.issues?.length) {
    error.issues?.forEach((issue) => {
      errors[issue.path[0] as keyof FormData] = issue.message;
    });
  }
  return { isValid: success, errors };
};
