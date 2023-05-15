import {
  Card,
  Image,
  Group,
  TextInput,
  ActionIcon,
  Text,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconPhoto, IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface IProps {
  title: string;
  imgUrl?: string;
  index: number;
  onTitleChange: (index: number, title: string) => void;
  deleteOption: (index: number) => void;
}

const OptionCard: FC<IProps> = ({
  title,
  imgUrl,
  index,
  onTitleChange,
  deleteOption,
}) => {
  const theme = useMantineTheme();

  return (
    <Card shadow="sm" p={10} py={0} radius="md" withBorder mt="xs">
      <Group noWrap position="left" align="top" mt="md" mb="xs">
        {imgUrl ? (
          <Image src={imgUrl} height={160} />
        ) : (
          <Stack
            align="center"
            justify="center"
            spacing="xs"
            className="cursor-pointer rounded-md"
            style={{
              backgroundColor:
                theme.colors.gray[theme.colorScheme === "dark" ? 8 : 2],
            }}
            p={20}
          >
            <IconPhoto stroke={1.5} />

            <Text size="sm" align="center" color="dimmed" inline mt={6}>
              Click to upload
            </Text>
          </Stack>
        )}

        <TextInput
          placeholder={`Title ${index + 1}`}
          value={title}
          style={{ width: "100%" }}
          onChange={(e) => {
            onTitleChange(index, e.target.value);
          }}
        />
        <ActionIcon color="red.6" onClick={() => deleteOption(index)}>
          <IconTrash />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default OptionCard;
