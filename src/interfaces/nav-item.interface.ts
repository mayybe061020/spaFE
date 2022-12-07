import React from "react";

/**
 * NavLink for non-nested route.
 */
export type NavLinkItemBaseProp = {
  href: string;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

/**
 * NavLink, which contains nested routes.
 */
export type NavLinkItemNestedProp = Omit<NavLinkItemBaseProp, "href"> & {
  nested: NavLinkItemBaseProp[];
};

export type NavDivider = {
  isDivider: boolean;
};

export type NavLinkItemProp =
  | NavDivider
  | NavLinkItemBaseProp
  | NavLinkItemNestedProp;
