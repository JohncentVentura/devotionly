import { stackServerApp } from "@/stack/server";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  // Convert to plain object
  const plainUser = user ? user.toClientJson() : null;

  return <NavbarClient user={plainUser} app={app} />;
}
