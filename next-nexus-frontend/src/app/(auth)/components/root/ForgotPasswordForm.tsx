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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoadingState } from "@/state/states";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotResetPasswordSchema } from "@/validators";
import { ForgotResetPassword } from "@/app/api/auth/index.c";

const ForgotPasswordForm = () => {
  const { toast } = useToast();

  const { data: isLoading, setData: setIsLoading } = useLoadingState();

  const form = useForm<z.infer<typeof ForgotResetPasswordSchema>>({
    resolver: zodResolver(ForgotResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ForgotResetPasswordSchema>
  ) => {
    setIsLoading(true);

    try {
      await ForgotResetPassword(values);

      toast({
        title: "Auth",
        description: "Reset link sent!",
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
    <Card className="m-auto shadow-slate-100 shadow-sm rounded-lg p-5 max-w-[500px] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="items-center">
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to reset your password
            </CardDescription>
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              disabled={isLoading as boolean}
              className="w-full"
              variant="default"
              type="submit"
            >
              <p className="text-lg">Send Reset Link</p>
            </Button>
            <div className="flex space-x-2">
              <p>Remembered your password?</p>
              <Link href="/authorize/login">
                <p className="text-red-600 font-semibold hover:text-red-400">
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

export default ForgotPasswordForm;
