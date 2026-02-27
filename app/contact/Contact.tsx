"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { MailIcon, Send, Facebook, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { externalPaths } from "@/lib/paths";
import { sendContactEmail } from "@/actions/send-contact-email";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("message", form.message);

      await sendContactEmail(formData);
      toast.success("Message sent successfully!");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 xl:px-0">
        <b className="font-semibold text-muted-foreground text-sm uppercase">
          Contact Me
        </b>
        <h2 className="mt-3 font-semibold text-3xl tracking-tight md:text-4xl">
          Connect with Devotionly!
        </h2>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Whether you have feedback, ideas, or prayerful reflections to share,
          I&apos;d love to hear from you. Devotionly is a personal project built
          with care, and every message helps it grow.
        </p>
        <div className="mt-8 flex flex-col gap-16 md:gap-10 lg:flex-row">
          <div className="grid w-full grid-cols-1 gap-1 border bg-muted p-1 *:border *:bg-background *:p-6 sm:grid-cols-2 lg:col-span-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Gmail</h3>
              <p className="my-2.5 text-muted-foreground">
                Email the developer directly for support, ideas, or concerns.
              </p>
              <Link
                className="font-medium text-primary hover:underline active:underline"
                href={externalPaths.gmail}
                target="_blank"
              >
                johncent.developer@gmail.com
              </Link>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
                <Facebook />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Facebook</h3>
              <p className="my-2.5 text-muted-foreground">
                Connect with the creator of Devotionly through his profile.
              </p>
              <Link
                className="font-medium text-primary hover:underline active:underline"
                href={externalPaths.facebook}
                target="_blank"
              >
                Johncent Ventura
              </Link>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
                <Send />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Telegram</h3>
              <p className="my-2.5 text-muted-foreground">
                Send a quick message to the developer through Telegram.
              </p>
              <Link
                className="font-medium text-primary hover:underline active:underline"
                href={externalPaths.telegram}
                target="_blank"
              >
                @JohncentVentura
              </Link>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
                <Github />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Github</h3>
              <p className="my-2.5 text-muted-foreground">
                Explore how Devotionly is built and the source code of the
                project.
              </p>
              <Link
                className="font-medium text-primary hover:underline active:underline"
                href={externalPaths.github}
                target="_blank"
              >
                JohncentVentura/devotionly
              </Link>
            </div>
          </div>
          <div className="w-full border bg-muted p-1">
            <Card className="h-full rounded-none bg-background shadow-none lg:ms-auto">
              <CardHeader>
                <CardTitle>Contact Me</CardTitle>
                <CardDescription>
                  I&apos;d love to hear from you. Please fill out this form.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        name="firstName"
                        id="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        name="lastName"
                        id="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="e.g. name@example.com"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        className="mt-2 bg-background shadow-none"
                        name="message"
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </div>
                  </div>

                  <Button
                    className={`mt-6 w-full 
                    hover:brightness-110 dark:hover:brightness-110 active:brightness-110 dark:active:brightness-110 transition duration-500
                    ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
