import { stackServerApp } from "@/stack/server";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const urls = stackServerApp.urls;

  // Convert to plain object
  const plainUser = user ? user.toClientJson() : null;

  return <NavbarClient user={plainUser} urls={urls} />;
};

export default Navbar;
