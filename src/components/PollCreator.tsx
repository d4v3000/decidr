import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

const PollCreator = () => {
  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Invalid title" : null),
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          placeholder="Type your Question here"
          label="Title"
          size="md"
          withAsterisk
          {...form.getInputProps("title")}
        />

        <Group position="right" mt="md">
          <Button variant="outline" type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default PollCreator;
