import { Flex } from "@mantine/core";
import { ReactNode, FC } from "react";

interface IProps {
  children: ReactNode;
}

const FlexWrapper: FC<IProps> = ({ children }) => {
  return (
    <Flex
      gap="lg"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="nowrap"
      mt="xl"
      className="h-[calc(100dvh-96px)]"
    >
      {children}
    </Flex>
  );
};

export default FlexWrapper;
