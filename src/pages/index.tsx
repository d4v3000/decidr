import { Card, Flex, Text } from "@mantine/core";
import { type NextPage } from "next";
import PollCreator from "~/components/PollCreator";

const Home: NextPage = () => {
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
      <Text size={36} weight="bold">
        Create a Poll
      </Text>
      <Card
        withBorder
        shadow="md"
        className="w-full flex-1 px-12 py-8 lg:w-3/4 xl:w-1/2"
      >
        <PollCreator />
      </Card>
    </Flex>
  );
};

export default Home;
