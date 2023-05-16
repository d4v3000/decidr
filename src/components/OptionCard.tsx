import {
  Card,
  Image,
  Group,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Flex,
  Text,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { FC } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

interface IProps {
  title: string;
  imgUrl?: string;
  index: number;
  onTitleChange: (index: number, title: string) => void;
  onImgUrlChange: (index: number, imgUrl?: string) => void;
  deleteOption: (index: number) => void;
}

const OptionCard: FC<IProps> = ({
  title,
  imgUrl,
  index,
  onTitleChange,
  onImgUrlChange,
  deleteOption,
}) => {
  const theme = useMantineTheme();

  return (
    <Card shadow="sm" p={10} py={0} radius="md" withBorder mt="xs">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="flex-start"
        gap="md"
        mt="md"
        mb="xs"
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            width={250}
            fit="contain"
            alt={`Option ${index + 1} image`}
          />
        ) : (
          <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: "rem(220)", pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size="2rem"
                  stroke={1.5}
                  color={
                    theme.colors.blue[theme.colorScheme === "dark" ? 4 : 6]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="2rem" stroke={1.5} />
              </Dropzone.Idle>

              <Text size="md" inline align="center">
                Upload image
              </Text>
            </Group>
          </Dropzone>
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
      </Flex>
    </Card>
  );
};

export default OptionCard;
