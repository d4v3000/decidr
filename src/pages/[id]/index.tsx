import { Button, Loader, rem, Text } from "@mantine/core";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ClipboardButton from "~/components/ClipboardButton";
import FlexWrapper from "~/components/FlexWrapper";
import SelectionItem from "~/components/SelectionItem";
import { api } from "~/utils/api";

const Poll: NextPage = () => {
  const router = useRouter();
  const pollId = router.query.id as string;
  const [index, setIndex] = useState(0);

  const { data: poll, isLoading } = api.pollRouter.get.useQuery(
    { id: pollId },
    { enabled: !!pollId }
  );
  const { mutateAsync: incrRating } =
    api.pollRouter.incrementRating.useMutation();

  const selectOption = async (id: string | undefined) => {
    if (id) {
      await incrRating({ id: id });
    }
    if (poll?.options) {
      if (index + 2 < poll.options.length) {
        setIndex(index + 2);
      } else {
        void router.push(`/${pollId}/results`);
      }
    }
  };

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

  return (
    <FlexWrapper className="h-[calc(100dvh-104px)]">
      <Text size={36} weight="bold">
        {poll.title}
      </Text>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-16 md:flex-row">
        {poll.options[index] && (
          <SelectionItem
            index={index}
            title={poll.options[index]?.name}
            imgUrl={poll.options[index]?.imgUrl}
            onClick={() => selectOption(poll.options[index]?.id)}
          />
        )}
        <p className="text-3xl">VS</p>
        {poll.options[index + 1] ? (
          <SelectionItem
            index={index}
            title={poll.options[index + 1]?.name}
            imgUrl={poll.options[index + 1]?.imgUrl}
            onClick={() => selectOption(poll.options[index + 1]?.id)}
          />
        ) : (
          <SelectionItem
            index={index}
            title={poll.options[0]?.name}
            imgUrl={poll.options[0]?.imgUrl}
            onClick={() => selectOption(poll.options[0]?.id)}
          />
        )}
      </div>
      <ClipboardButton url={`https://decidr.vercel.app/${pollId}`} />
      <Button
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
          rightIcon: { marginLeft: rem(22) },
        }}
        onClick={() => void router.push(`/${pollId}/results`)}
      >
        See Results
      </Button>
    </FlexWrapper>
  );
};

export default Poll;
