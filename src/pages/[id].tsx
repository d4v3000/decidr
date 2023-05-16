import { Loader, Text } from "@mantine/core";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import FlexWrapper from "~/components/FlexWrapper";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const {
    data: poll,
    isLoading,
    error,
  } = api.pollRouter.get.useQuery({ id: id });

  if (isLoading) {
    return (
      <FlexWrapper>
        <Loader />
      </FlexWrapper>
    );
  }

  if (!poll) {
    console.log(error);
    return (
      <FlexWrapper>
        <Text size={36} weight="bold">
          Poll not found
        </Text>
      </FlexWrapper>
    );
  }

  return (
    <FlexWrapper>
      <Text size={36} weight="bold">
        {poll.title}
      </Text>
    </FlexWrapper>
  );
};

export default Home;
