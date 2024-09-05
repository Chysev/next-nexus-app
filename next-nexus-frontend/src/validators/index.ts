import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const UpdateUserDataSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .optional(),
  role: z.string().optional(),
  avatarUrl: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
});

const UpdateViewUserDataSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .optional(),
  role: z.string().optional(),
});

const ForgotResetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const MailConfigSchema = z.object({
  smtpHost: z.string().min(1, "SMTP Host is required"),
  smtpPort: z.string().min(1, "SMTP Host is required"),
  smtpService: z.string().min(1, "SMTP Service is required"),
  smtpEmail: z.string().email("Invalid email address"),
  smtpPassword: z.string().min(1, "App Password is required"),
});

export {
  LoginSchema,
  RegisterSchema,
  MailConfigSchema,
  ResetPasswordSchema,
  UpdateUserDataSchema,
  UpdateViewUserDataSchema,
  ForgotResetPasswordSchema,
};
