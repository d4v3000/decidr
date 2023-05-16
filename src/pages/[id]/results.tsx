import { Loader, Table, Text } from "@mantine/core";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import FlexWrapper from "~/components/FlexWrapper";
import { api } from "~/utils/api";

const Results: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: poll, isLoading } = api.pollRouter.get.useQuery({ id: id });

  if (isLoading) {
    return (
      <FlexWrapper>
        <Loader />
      </FlexWrapper>
    );
  }

  if (!poll) {
    return (
      <FlexWrapper>
        <Text size={36} weight="bold">
          Poll not found
        </Text>
      </FlexWrapper>
    );
  }

  const rows = poll.options.map((option) => {
    return (
      <tr key={option.id}>
        <td>{option.name}</td>
        <td>{option.rating}</td>
      </tr>
    );
  });

  return (
    <FlexWrapper>
      <Text size={36} weight="bold">
        {poll.title}
      </Text>
      <Table verticalSpacing="xs">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </FlexWrapper>
  );
};

export default Results;
