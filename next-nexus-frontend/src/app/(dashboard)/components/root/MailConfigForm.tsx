"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { Mail } from "@/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoadingState } from "@/state/states";
import { useToast } from "@/components/ui/use-toast";
import { MailConfigSchema } from "@/validators/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { setMailConfig } from "@/app/api/config/index.c";
import { getMailConfig } from "@/app/api/config/index.s";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const MailConfigForm = ({ sessionToken }: { sessionToken: string }) => {
  const { toast } = useToast();

  const { data: isLoading, setData: setIsLoading } = useLoadingState();

  const { data: config }: UseQueryResult<{ data: Mail }> = useQuery({
    queryKey: ["config", "mail"],
    queryFn: async () => await getMailConfig(),
    refetchInterval: 1000,
  });

  const form = useForm<z.infer<typeof MailConfigSchema>>({
    resolver: zodResolver(MailConfigSchema),
    defaultValues: {
      smtpHost: config?.data.smtpHost,
      smtpPort: config?.data.smtpPort || "",
      smtpService: config?.data.smtpService,
      smtpEmail: config?.data.smtpEmail,
      smtpPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MailConfigSchema>) => {
    setIsLoading(true);
    try {
      await setMailConfig(values, sessionToken);

      toast({
        title: "Mail Configuration",
        description: "Configuration saved successfully.",
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
    <Card className="m-auto shadow-slate-100 shadow-sm rounded-lg p-5 max-w-[600px] w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="items-center">
            <CardTitle>Mail Configuration</CardTitle>
            <CardDescription>Set up your mail settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="smtpHost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">SMTP Host</FormLabel>
                  <FormControl>
                    <Input
                      className="text-md"
                      placeholder={config?.data.smtpHost}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smtpPort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">SMTP Port</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="text-md"
                      placeholder={config?.data.smtpPort}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smtpService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">SMTP Service</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={config?.data.smtpService}
                      className="text-md"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smtpEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-md"
                      placeholder={config?.data.smtpEmail}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smtpPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">App Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="text-md"
                      placeholder="Your app password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={isLoading as boolean}
              className="w-full"
              variant="default"
              type="submit"
            >
              Save Configuration
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default MailConfigForm;
