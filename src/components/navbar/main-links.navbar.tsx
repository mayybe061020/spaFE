import { FC } from "react";
import LinkNavbar from "./link.navbar";
import { NavLinkItemProp } from "../../interfaces/nav-item.interface";

type MainLinksNavbarProps = {
  links: NavLinkItemProp[];
};

const MainLinksNavbar: FC<MainLinksNavbarProps> = ({ links }) => {
  return (
    <>
      {links.map((link, i) => (
        <LinkNavbar key={i} {...link}></LinkNavbar>
      ))}
    </>
  );
};

export default MainLinksNavbar;
