import { Header, Text } from "@mantine/core";
import ColorSchemeToggle from "./ColorSchemeToggle";

const Navbar = () => {
  return (
    <Header height={{ base: 50, md: 60 }}>
      <div className="mx-auto flex h-full w-3/4 items-center justify-between">
        <Text size="xl" weight="bold">
          Decidr
        </Text>
        <ColorSchemeToggle />
      </div>
    </Header>
  );
};

export default Navbar;
