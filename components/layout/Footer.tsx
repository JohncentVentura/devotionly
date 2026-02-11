import { Separator } from "@/components/ui/separator";
import { MailIcon, Send, Facebook, Github } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { externalPaths } from "@/lib/paths";
import { TopGradient } from "../PageGradient";

const footerLinks = [
  {
    title: "Devotions",
    href: "/devotions",
  },
  {
    title: "Bible",
    href: "/bible",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="relative flex flex-col w-full">
      <TopGradient />
      <div className="bg-muted/50 px-0 md:px-8 xl:px-24">
        <div className="py-12 flex flex-col justify-start items-center">
          <Logo />
          <ul className="mt-6 flex items-center gap-4 flex-wrap">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href={externalPaths.gmail}
              target="_blank"
              rel="noopener noreferrer"
            >
              johncent.developer@gmail.com
            </Link>
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link href={externalPaths.facebook} target="_blank">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href={externalPaths.telegram} target="_blank">
              <Send className="h-5 w-5" />
            </Link>
            <Link href={externalPaths.github} target="_blank">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
