import { Card, Text } from "@mantine/core";
import { type NextPage } from "next";
import FlexWrapper from "~/components/FlexWrapper";
import PollCreator from "~/components/PollCreator";

const Home: NextPage = () => {
  return (
    <FlexWrapper>
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
    </FlexWrapper>
  );
};

export default Home;
