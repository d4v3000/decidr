import { Card, Flex, Text } from "@mantine/core";
import { type NextPage } from "next";
import PollCreator from "~/components/PollCreator";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Flex
          gap="lg"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          mt="xl"
        >
          <Text size={36} weight="bold">
            Create a Poll
          </Text>
          <Card withBorder shadow="md" className="w-full px-12 py-8 md:w-1/2">
            <PollCreator />
          </Card>
        </Flex>
      </main>
    </>
  );
};

export default Home;
