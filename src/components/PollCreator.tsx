import {
  TextInput,
  Button,
  Group,
  Box,
  Text,
  Flex,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useRef, useState } from "react";
import OptionCard from "./OptionCard";

const PollCreator = () => {
  const form = useForm({
    initialValues: {
      title: "",
      options: [] as { title: string; imgUrl?: string }[],
    },
    validate: {
      title: (value) => (value.length < 1 ? "Title is required" : null),
      options: (value) =>
        value.length < 2
          ? "At least 2 options required"
          : value.find((element) => element.title === "")
          ? "Title for every option required"
          : null,
    },
  });

  const [shouldScroll, setShouldScroll] = useState(false);

  const viewport = useRef<HTMLDivElement>(null);

  const addOption = () => {
    form.setFieldValue("options", [
      ...form.values.options,
      { title: "", imgUrl: "" },
    ]);
    setShouldScroll(true);
  };

  const onOptionTitleChanged = (index: number, title: string) => {
    form.setFieldValue(
      "options",
      form.values.options.map((option, i) => {
        if (i === index) {
          return { ...option, title: title };
        } else {
          return option;
        }
      })
    );
  };

  const onOptionImgChanged = (index: number, imgUrl?: string) => {
    form.setFieldValue(
      "options",
      form.values.options.map((option, i) => {
        if (i === index) {
          return { ...option, imgUrl: imgUrl };
        } else {
          return option;
        }
      })
    );
  };

  const onOptionDeleted = (index: number) => {
    form.setFieldValue(
      "options",
      form.values.options.filter((option, i) => i !== index)
    );
  };

  useEffect(() => {
    if (shouldScroll) {
      viewport.current?.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  return (
    <Box className="h-full">
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        className="flex h-full flex-col justify-between"
      >
        <Flex gap="md" direction="column" className="h-[92%]">
          <TextInput
            placeholder="Type your Question here"
            label="Title"
            size="md"
            withAsterisk
            {...form.getInputProps("title")}
            styles={{ label: { marginBottom: 8 } }}
          />
          <Text>Answer Options</Text>
          <ScrollArea
            offsetScrollbars
            viewportRef={viewport}
            className="h-full"
          >
            {form.values.options.map((option, i) => (
              <OptionCard
                title={option.title}
                imgUrl={option.imgUrl}
                index={i}
                onTitleChange={onOptionTitleChanged}
                onImgUrlChange={onOptionImgChanged}
                deleteOption={onOptionDeleted}
                key={`options_${i}`}
              />
            ))}
          </ScrollArea>
          {form.errors ? (
            <div className="text-red-600">{form.errors["options"]}</div>
          ) : (
            <></>
          )}
          <Button
            variant="outline"
            color="gray"
            onClick={addOption}
            fullWidth
            mih={40}
          >
            Add option
          </Button>
        </Flex>

        <Group position="right" mt="md">
          <Button variant="outline" type="submit" px={60}>
            Create Poll
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PollCreator;
