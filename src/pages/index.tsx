import { Card, Flex, Text } from "@mantine/core";
import { type NextPage } from "next";
import PollCreator from "~/components/PollCreator";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <Flex
          mih={50}
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
          <Card withBorder shadow="md" className="w-1/2 px-12 py-8">
            <PollCreator />
          </Card>
        </Flex>
      </main>
    </>
  );
};

export default Home;
