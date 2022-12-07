import { Avatar, NavLink, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { useRouter } from "next/router";
import { useAuthUser } from "../../store/auth-user.state";

const UserNavbar = () => {
  const user = useAuthUser((s) => s.user);
  const theme = useMantineTheme();
  const router = useRouter();

  if (!user) {
    return <></>;
  }

  return (
    <NavLink
      href={"/profile"}
      component={"a"}
      active={router.pathname.startsWith("/profile")}
      icon={<Avatar src={user.image} radius="xl" />}
      label={
        <Tooltip label={user.email}>
          <Text size="sm" weight={500}>
            {user.name}
          </Text>
        </Tooltip>
      }
      description={
        <Text color="dimmed" className={"uppercase"} size="xs">
          {user.role}
        </Text>
      }
      rightSection={<IconChevronRight size={18} />}
      className="hover:!bg-gray-700"
      sx={{
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colors.dark[0],
      }}
    ></NavLink>
  );
};

export default UserNavbar;
