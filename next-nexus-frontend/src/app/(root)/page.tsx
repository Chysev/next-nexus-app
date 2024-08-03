"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <AuroraBackground className="block">
        <div className="relative flex flex-col items-center justify-center px-6 py-12 lg:py-24 w-full">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-center leading-tight mb-8 animate-fadeIn">
            Welcome to <span className="text-green-400">Nexus Boilerplate</span>
          </h1>
          <p className="text-center text-lg lg:text-xl max-w-4xl mx-auto mb-12 animate-fadeIn">
            Nexus Boilerplate is your ultimate solution for building
            production-ready web applications. With full Docker support,
            seamless deployment, and a powerful tech stack, it&apos;s never been
            easier to get your project up and running.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {[
              {
                title: "Frontend with Next.js 14",
                description:
                  "Advanced frontend stack with Next.js 14, Zod, and React Hook Form.",
                link: "https://nextjs.org/",
              },
              {
                title: "Backend with Express",
                description:
                  "Powerful backend setup with Express, Passport, and TypeScript.",
                link: "https://expressjs.com/",
              },
              {
                title: "Modular & Scalable",
                description:
                  "Organized and scalable architecture for efficient project management.",
                link: "",
              },
              {
                title: "Reusable Components",
                description:
                  "Pre-built components and middleware for faster development.",
                link: "https://ui.shadcn.com/",
              },
              {
                title: "Developer Support",
                description:
                  "Fully supported by the developer of this boilerplate and you can also contribute too!",
                link: "https://github.com/Chysev",
              },
              {
                title: "Hosting Flexibility",
                description:
                  "Compatible with various hosting solutions for easy deployment.",
                link: "https://vercel.com/",
              },
              {
                title: "Authentication Ready",
                description:
                  "Integrated authentication with Passport for secure user management.",
                link: "https://jwt.io/",
              },
              {
                title: "Database Ready",
                description:
                  "Integrated prisma orm for various database such as SQL, PostgresSQL, and MongoDB",
              },
              {
                title: "TypeScript Integration",
                description:
                  "TypeScript support for better type safety and developer experience.",
                link: "https://www.typescriptlang.org/",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="cursor-pointer border-t-4 border-green-400">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      <Link
                        href={`${feature.link as string}`}
                        target="_blank"
                        className="underline"
                      >
                        {" "}
                        {feature.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-700">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/authorize/register"
              className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Get Started
            </Link>
            <p className="mt-4 text-gray-600">
              Dive into the{" "}
              <Link href="/docs" className="text-green-500 underline">
                documentation
              </Link>{" "}
              for setup and more details.
            </p>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
};

export default page;
