import { ActionIcon, Header, Text } from "@mantine/core";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <Header height={{ base: 50, md: 60 }}>
      <div className="mx-auto flex h-full w-full items-center justify-between px-4 md:w-3/4 md:px-0">
        <Text size="xl" weight="bold">
          Decidr
        </Text>
        <div className="flex items-center gap-4">
          <ActionIcon
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            })}
            size="xl"
            onClick={() => router.push("https://www.github.com/d4v3000/decidr")}
          >
            <IconBrandGithubFilled />
          </ActionIcon>
          <ColorSchemeToggle />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
