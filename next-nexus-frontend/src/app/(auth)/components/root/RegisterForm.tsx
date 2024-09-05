"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/validators";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Register } from "@/app/api/auth/index.c";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadingState, useShowPasswordState } from "@/state/states";

const RegisterForm = () => {
  const { toast } = useToast();

  const { data: showPassword, setData: setShowPassword } =
    useShowPasswordState();
  const { data: isLoading, setData: setIsLoading } = useLoadingState();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);

    try {
      const response = await Register(values);

      toast({
        title: "Auth",
        description: response.data.message,
      });
    } catch (error) {
      toast({
        title: "Auth",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="m-auto shadow-slate-100 shadow-sm rounded-lg p-5  max-w-[500px] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="items-center">
            <CardTitle>Register</CardTitle>
            <CardDescription>Authorization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-md"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-md"
                      placeholder="example@example.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="text-md"
                        {...field}
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              disabled={isLoading as boolean}
              className="w-full"
              variant="default"
              type="submit"
            >
              <p className="text-lg">Register</p>
            </Button>
            <div className="flex space-x-2">
              <p>Already have an account?</p>
              <Link href="/authorize/login">
                <p className="text-green-600 font-semibold hover:text-green-400">
                  Login
                </p>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
