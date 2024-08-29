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
import { ResetPasswordSchema } from "@/validators";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword } from "@/app/api/auth/index.c";
import { useParams, useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const params = useParams();

  const { data: isLoading, setData: setIsLoading } = useLoadingState();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setIsLoading(true);

    try {
      await ResetPassword(values, params.token as string);

      toast({
        title: "Auth",
        description: "Successfully resetted your password",
      });
      setTimeout(() => {
        router.push("/authorize/login");
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
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your complex password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">New Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="text-md" {...field} />
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
              <p className="text-lg">Reset Password</p>
            </Button>
            <div className="flex space-x-2">
              <p>Remembered your password?</p>
              <Link href="/credentials/login">
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

export default ResetPasswordForm;
