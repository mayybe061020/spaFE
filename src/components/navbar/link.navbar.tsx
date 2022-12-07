import { Divider, NavLink, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import {
  NavLinkItemBaseProp,
  NavLinkItemNestedProp,
  NavLinkItemProp,
} from "../../interfaces/nav-item.interface";
import Link from "next/link";

const NavWithHref = (props: NavLinkItemBaseProp) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <NavLink
      component={Link}
      href={props.href}
      color={"black"}
      active={router.asPath.startsWith(props.href)}
      icon={props.leftIcon}
      label={props.label}
      description={props.description}
      rightSection={props.rightIcon}
      sx={{
        fontWeight: 600,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        color: theme.colors.dark[0],
        "&[data-active]": {
          backgroundColor: theme.colors.dark[8],
        },
        "&[data-active]:hover": {
          backgroundColor: theme.colors.dark[7],
        },
        "&:hover": {
          backgroundColor: theme.colors.dark[7],
        },
      }}
    ></NavLink>
  );
};

const NavNested = (props: NavLinkItemNestedProp) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [parentActive, setParentActive] = useState(false);

  useEffect(() => {
    const currentPath = router.asPath;

    const childActive = props.nested.some((c) =>
      currentPath.startsWith(c.href)
    );
    console.log(childActive);
    setParentActive(childActive);
  }, [router.asPath, props.nested]);

  {
    /*TODO: defaultOpened dynamic does not work...*/
  }
  return (
    <NavLink
      childrenOffset={28}
      label={props.label}
      color={"black"}
      icon={props.leftIcon}
      description={props.description}
      rightSection={props.rightIcon}
      sx={{
        fontWeight: 600,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        color: theme.colors.dark[0],
        "&[data-active]": {
          backgroundColor: theme.colors.dark[8],
        },
        "&[data-active]:hover": {
          backgroundColor: theme.colors.dark[7],
        },
        "&:hover": {
          backgroundColor: theme.colors.dark[7],
        },
      }}
      defaultOpened={parentActive}
    >
      {props.nested.map((c) => (
        <NavLink
          component={Link}
          key={c.href}
          href={c.href}
          color={"black"}
          icon={c.leftIcon}
          rightSection={c.rightIcon}
          description={c.description}
          label={c.label}
          active={router.asPath.startsWith(c.href)}
          sx={{
            fontWeight: 600,
            padding: theme.spacing.md,
            borderRadius: theme.radius.sm,
            color: theme.colors.dark[0],
            "&[data-active]": {
              backgroundColor: theme.colors.dark[8],
            },
            "&[data-active]:hover": {
              backgroundColor: theme.colors.dark[7],
            },
            "&:hover": {
              backgroundColor: theme.colors.dark[7],
            },
          }}
        />
      ))}
    </NavLink>
  );
};

const LinkNavbar: FC<NavLinkItemProp> = (item) => {
  if (Object.hasOwn(item, "isDivider")) {
    return <Divider my={12} />;
  }

  return Object.hasOwn(item, "href") ? (
    <NavWithHref {...(item as NavLinkItemBaseProp)} />
  ) : (
    <NavNested {...(item as NavLinkItemNestedProp)} />
  );
};

export default LinkNavbar;
