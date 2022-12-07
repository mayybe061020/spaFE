import { AppShell } from "@mantine/core";
import { PropsWithChildren } from "react";
import { USER_ROLE } from "../../const/user-role.const";
import CoreNavbar from "../navbar/_navbar";

const SidebarLayout = ({
  children,
  role,
}: PropsWithChildren<{ role: USER_ROLE }>) => {
  return (
    <AppShell
      padding={0}
      navbar={<CoreNavbar userRole={role} width={{ base: 256 }} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
      {children}
    </AppShell>
  );
};

export default SidebarLayout;
