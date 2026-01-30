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

export default function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center py-16">
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 xl:px-0">
        <b className="font-semibold text-muted-foreground text-sm uppercase">
          Contact Me
        </b>
        <h2 className="mt-3 font-semibold text-3xl tracking-tight md:text-4xl">
          Connect with Devotionly!
        </h2>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Whether you have feedback, ideas, or prayerful reflections to share, 
          I&apos;d love to hear from you. Devotionly is a personal project built with care, 
          and every message helps it grow.
        </p>
        <div className="mt-16 flex flex-col gap-16 md:gap-10 lg:flex-row">
          <div className="grid w-full max-w-3xl grid-cols-1 gap-1 border bg-muted p-1 *:border *:bg-background *:p-6 sm:grid-cols-2 lg:col-span-2">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/3 bg-foreground/5 text-foreground dark:bg-foreground/10">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Gmail</h3>
              <p className="my-2.5 text-muted-foreground">
                Email the developer directly for support, ideas, or concerns.
              </p>
              <Link
                className="font-medium text-primary"
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
              <Link className="font-medium text-primary" href={externalPaths.facebook} target="_blank">
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
                className="font-medium text-primary"
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
                Explore how Devotionly is built and the source code of the project.
              </p>
              <Link
                className="font-medium text-primary"
                href={externalPaths.github}
                target="_blank"
              >
                JohncentVentura/devotionly
              </Link>
            </div>
          </div>

          <div className="w-full max-w-lg border border-border bg-muted p-1">
            <Card className="relative h-full isolate rounded-none bg-card shadow-none lg:ms-auto">
              <CardHeader>
                <CardTitle>Contact Me</CardTitle>
                <CardDescription>
                  I&apos;d love to hear from you. Please fill out this form.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2">
                <form>
                  <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        id="lastName"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        className="mt-2 h-10 bg-background shadow-none"
                        id="email"
                        placeholder="e.g. name@example.com"
                        type="email"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        className="mt-2 bg-background shadow-none"
                        id="message"
                        placeholder="Type your message here..."
                        rows={6}
                      />
                    </div>
                  </div>
                  <Button className="mt-6 w-full" size="lg">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
};
