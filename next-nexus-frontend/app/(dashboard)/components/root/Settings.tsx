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
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import UserData from "@/hooks/user-data";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { UpdateUser } from "@/app/api/users/";
import { MdFileUpload } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { UpdateUserDataSchema } from "@/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Settings = ({ sessionToken }: { sessionToken: string }) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [Edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const params = useParams();

  const { data: user } = UserData(sessionToken, router);

  const form = useForm<z.infer<typeof UpdateUserDataSchema>>({
    resolver: zodResolver(UpdateUserDataSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      description: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const {
    // getRootProps
    getInputProps,
  } = useDropzone({
    onDrop,
    disabled: !Edit,
  });

  const removeAvatar = () => {
    setAvatar("");
  };

  const onSubmit = async (value: z.infer<typeof UpdateUserDataSchema>) => {
    try {
      const response = await UpdateUser(
        params?.id as string,
        value,
        sessionToken as string
      );

      if (response.status === 200) {
        toast({
          title: "Settings",
          description: "Information has been updated",
        });
        setEdit(false);
      }
    } catch (error) {
      toast({
        title: "Settings",
        description: "Something went wrong",
      });
    }
  };

  const AvatarUpload = () => {
    return (
      <Avatar className="h-full border w-full flex items-center justify-center">
        {avatar ? (
          <AvatarImage src={avatar as string} alt="Avatar" />
        ) : (
          <div>
            <label htmlFor="file-upload">
              <MdFileUpload
                className={`cursor-pointer h-10 w-10 hover:shadow-2xl hover:border rounded-full transition-all ${
                  Edit ? "opacity-1" : "opacity-5 hover:cursor-not-allowed"
                }`}
              />
            </label>
            <Input
              id="file-upload"
              {...getInputProps()}
              disabled={!Edit}
              className="hidden"
            />
          </div>
        )}
        {avatar && (
          <FiX
            onClick={removeAvatar}
            className="absolute cursor-pointer h-10 w-10 text-black"
          />
        )}
      </Avatar>
    );
  };

  return (
    <Form {...form}>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-4xl m-auto w-full rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p>Settings</p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/dashboard">
                      <GoHome />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-6">
            {showUpload ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80 flex items-center justify-center">
                  <AvatarUpload />
                </div>
                <Button onClick={() => setShowUpload(false)} className="mt-4">
                  Save
                </Button>
              </div>
            ) : (
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
                          placeholder={user?.data?.user?.name}
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
                          placeholder={user?.data?.user?.email}
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
                            disabled={!Edit}
                            type={
                              Edit
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : "password"
                            }
                            className="text-md"
                            {...field}
                          />
                          <span
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? (
                              <FaEyeSlash
                                className={`${
                                  Edit
                                    ? "opacity-1"
                                    : "opacity-5 hover:cursor-not-allowed"
                                }`}
                              />
                            ) : (
                              <FaEye
                                className={`${
                                  Edit
                                    ? "opacity-1"
                                    : "opacity-5 hover:cursor-not-allowed"
                                }`}
                              />
                            )}
                          </span>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          maxLength={256}
                          className="text-md"
                          disabled={!Edit}
                          placeholder={user?.data?.user?.description}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {Edit && (
                  <div className="space-y-2">
                    <p
                      className="text-blue-600 flex lg:hidden"
                      onClick={() => setShowUpload(true)}
                    >
                      Change Profile Image
                    </p>
                    <div className="space-x-2">
                      <Button type="submit">Save</Button>
                      <Button
                        variant="destructive"
                        onClick={() => setEdit(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                {!Edit && (
                  <Button variant="default" onClick={() => setEdit(true)}>
                    Edit
                  </Button>
                )}
              </form>
            )}
            <div className="lg:flex-shrink-0 lg:flex hidden">
              <div className="h-40 w-40 md:h-60 md:w-60 lg:h-80 lg:w-80 flex items-center justify-center">
                <AvatarUpload />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p>Create Next Nexus App</p>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
};

export default Settings;
