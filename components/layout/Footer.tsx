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
      <div className="bg-muted/90 px-0 md:px-8 xl:px-24">
        <div className="pt-12 pb-8 flex flex-col justify-start items-center">
          <Logo />
          <ul className="mt-6 flex items-center gap-4 flex-wrap">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground active:text-foreground transition-colors duration-300"
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
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-muted-foreground hover:text-primary active:text-primary transition-colors duration-300">
              &copy; {new Date().getFullYear()}{" "}
              <Link
                href={externalPaths.gmail}
                target="_blank"
                rel="noopener noreferrer"
              >
                johncent.developer@gmail.com
              </Link>
            </span>
            <span className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">
              <Link
                href={externalPaths.freeBibleImages}
                target="_blank"
                rel="noopener noreferrer"
              >
                Illustrations provided by freebibleimages.org
              </Link>
            </span>
          </div>

          <div className="flex justify-center items-center gap-6 text-muted-foreground">
            <Link
              href={externalPaths.facebook}
              target="_blank"
              className="hover:text-primary active:text-primary hover:scale-125 transition-all duration-300 transform"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
            </Link>
            <Link
              href={externalPaths.telegram}
              target="_blank"
              className="hover:text-primary active:text-primary hover:scale-125 transition-all duration-300 transform"
              aria-label="Telegram"
            >
              <Send className="size-5" />
            </Link>
            <Link
              href={externalPaths.github}
              target="_blank"
              className="hover:text-primary active:text-primary hover:scale-125 transition-all duration-300 transform"
              aria-label="GitHub"
            >
              <Github className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
