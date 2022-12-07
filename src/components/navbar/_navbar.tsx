import { Divider, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { FC, useEffect } from "react";
import { USER_ROLE } from "../../const/user-role.const";
import ButtonNavbar from "./button.navbar";
import UserNavbar from "./user.navbar";
import MainLinksNavbar from "./main-links.navbar";
import useSidebarNav from "../../store/sidebar-nav.state";
import useAccessToken from "../../store/access-token.atom";
import { useAuthUser } from "../../store/auth-user.state";

/**
 * This component renders the sidebar of the web.
 * The sidebar contains 3 main sections
 * - User section (get the state from useAuthUser)
 * - Dynamic links section (get the state from useSidebarNav)
 * - Logout section (trigger logout action).
 *
 * NOTE: logout action clears token and user data from both localStorage and memory.
 * The navigation to '/login' route is handled by `needRedirectedOnRole()`
 * in `_app.tsx`.
 * @param props
 * @constructor
 */
const CoreNavbar: FC<{
  userRole: USER_ROLE;
  width?: Partial<Record<string, string | number>> | undefined;
}> = (props) => {
  const { resetToken } = useAccessToken();
  const logoutFn = useAuthUser((s) => s.logout);
  const userRole = useAuthUser((s) => s.user?.role);
  // depends on the user role, the state here will be updated.
  const links = useSidebarNav((s) => s.config);
  const updateConfig = useSidebarNav((s) => s.updateByRole);

  useEffect(() => {
    updateConfig(userRole);
  }, [userRole]);

  function logout() {
    // remove token
    resetToken();
    // remove auth state
    logoutFn();
  }

  return (
    <Navbar
      sx={(t) => ({
        backgroundColor: t.colors.gray[9],
        color: t.white,
      })}
      p="xs"
      width={props.width}
    >
      <Navbar.Section mt="xs">
        <UserNavbar />
      </Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mt="md">
        <MainLinksNavbar links={links} />
      </Navbar.Section>
      <Navbar.Section>
        <Divider my={"1rem"} />
        <ButtonNavbar
          icon={<IconLogout />}
          onClick={() => logout()}
          label="Đăng Xuất"
        ></ButtonNavbar>
      </Navbar.Section>
    </Navbar>
  );
};

export default CoreNavbar;
