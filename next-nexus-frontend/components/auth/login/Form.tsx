"use client";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/validators";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SetTokenAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);

    try {
      const response = await SetTokenAction(values);

      if (response?.success === true) {
        toast({
          title: "Auth",
          description: "Logged in!",
        });
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }

      if (response?.success === false) {
        toast({
          title: "Auth",
          description: `${response?.message}`,
        });
      }
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
            <CardTitle>Login</CardTitle>
            <CardDescription>Authorization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
                    <Input className="text-md" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-md text-right hover:underline">
              <Link href="/credentials/forgot-password">Forgot Password?</Link>
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              disabled={isLoading}
              className="w-full"
              variant="default"
              type="submit"
            >
              <p className="text-lg">Login</p>
            </Button>
            <div className="flex space-x-2">
              <p>Don&apos;t have an account yet?</p>
              <Link href="/authorize/register">
                <p className="text-red-600 font-semibold hover:text-red-400">
                  Register
                </p>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
