"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { User } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEditState } from "@/state/states";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/app/api/users/index.c";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserData } from "@/app/api/users/index.s";
import { UpdateViewUserDataSchema } from "@/validators";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const ViewUserForm = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();
  const params = useParams();

  const { data: Edit, setData: setEdit } = useEditState();

  const { data: user }: UseQueryResult<{ data: User }> = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      return await getUserData(params.id as string);
    },
  });

  const form = useForm<z.infer<typeof UpdateViewUserDataSchema>>({
    resolver: zodResolver(UpdateViewUserDataSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.data.name,
        email: user?.data.email,
        role: user?.data.role,
      });
    }
  }, [user, form]);

  const onSubmit = async (value: z.infer<typeof UpdateViewUserDataSchema>) => {
    try {
      const response = await updateUser(
        params?.id as string,
        value,
        sessionToken as string
      );

      if (response.status === 200) {
        toast({
          title: "Action",
          description: "Information has been updated",
        });
        setEdit(false);
      }
    } catch (error) {
      toast({
        title: "Action",
        description: "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-2xl m-auto w-full rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p>{user?.data?.name}&apos;s Profile</p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <IoArrowBackCircleOutline onClick={() => router.back()} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!Edit}
                        className="text-md"
                        placeholder={user?.data?.name}
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
                        disabled={!Edit}
                        className="text-md"
                        placeholder={user?.data?.email}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger disabled={!Edit}>
                        <SelectValue placeholder={user?.data.role} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {Edit && (
                <div className="space-x-2">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
              {!Edit && (
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
              )}
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p>Create Next Nexus App</p>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default ViewUserForm;
