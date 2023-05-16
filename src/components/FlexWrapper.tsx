import { Flex } from "@mantine/core";
import type { ReactNode, FC } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

const FlexWrapper: FC<IProps> = ({ children, className }) => {
  return (
    <Flex
      gap="lg"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="nowrap"
      mt="xl"
      mb={className ? "" : "xl"}
      className={className}
    >
      {children}
    </Flex>
  );
};

export default FlexWrapper;
