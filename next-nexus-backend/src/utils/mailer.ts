import nodemailer, { Transporter } from "nodemailer";

import config from "@/config/services/mailConfig.json";

const createMailTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: parseInt(config.smtpPort || "587"),
    service: config.smtpService,
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export default createMailTransporter;
