import { NextComponentType, NextPageContext } from "next";
import { USER_ROLE } from "../const/user-role.const";

/**
 * Extended interface from NextComponentType.
 * It allows us to strong-typing some custom methods.
 */
export type AppPageInterface<Props = unknown> = NextComponentType<
  NextPageContext,
  unknown,
  Props
> & {
  /**
   * Specify the wrapper layout of this page.
   * @param renderPage Is this rendering page. You will wrap this in a layout component.
   */
  useLayout?: (renderPage: JSX.Element) => JSX.Element;
  // This page is restricted to a specific role.
  // The validation happens in `_app.tsx` at `needRedirectedOnRole()`.
  // Visit `USER_ROLE` for more details.
  guarded?: USER_ROLE | USER_ROLE[];
  // TODO: use for breadcrumbs.
  routerName?: string;
};
