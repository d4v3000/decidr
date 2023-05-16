import { Button, Image, Loader, rem, Text } from "@mantine/core";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import ClipboardButton from "~/components/ClipboardButton";
import FlexWrapper from "~/components/FlexWrapper";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: poll, isLoading } = api.pollRouter.get.useQuery({ id: id });
  const { mutate: incrRating } = api.pollRouter.incrementRating.useMutation();

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
    <FlexWrapper>
      <Text size={36} weight="bold">
        {poll.title}
      </Text>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-16 md:flex-row">
        {poll.options.map((option, index) => (
          <div
            className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center"
            key={option.id}
            onClick={() => {
              incrRating({ id: option.id });
              void router.push(`/${id}/results`);
            }}
          >
            {option.imgUrl ? (
              <Image
                src={option.imgUrl}
                alt={`Option ${index + 1} image`}
                fit="contain"
              />
            ) : (
              <></>
            )}
            <Text size={24} weight="bold">
              {option.name}
            </Text>
          </div>
        ))}
        <p className="absolute text-3xl">VS</p>
      </div>
      <ClipboardButton url={`https://decidr.vercel.app/${id}`} />
      <Button
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: rem(14), height: rem(48) },
          rightIcon: { marginLeft: rem(22) },
        }}
        onClick={() => void router.push(`/${id}/results`)}
      >
        See Results
      </Button>
    </FlexWrapper>
  );
};

export default Home;
