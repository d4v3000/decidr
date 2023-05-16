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
import type { FileWithPath } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { api } from "~/utils/api";

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

  const createPresignedUrlMutation =
    api.pollRouter.createPresignedUrl.useMutation();

  const deleteImageMutation = api.pollRouter.deleteImage.useMutation();

  const uploadImage = async (file: FileWithPath) => {
    const { url, fields } = await createPresignedUrlMutation.mutateAsync();

    const data: Record<string, Blob | string> = {
      ...fields,
      "Content-Type": file.type,
      file,
    };

    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]!);
    }

    await fetch(url, {
      method: "POST",
      body: formData,
    });

    onImgUrlChange(index, url + (fields.key as string));
  };

  const deleteImage = async () => {
    if (imgUrl) {
      const key = imgUrl.replace(
        "https://decidr-images.s3.eu-central-1.amazonaws.com/",
        ""
      );
      await deleteImageMutation.mutateAsync({ key: key });
      onImgUrlChange(index, "");
    }
  };

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
          <div className="relative">
            <Image
              src={imgUrl}
              width={250}
              fit="contain"
              alt={`Option ${index + 1} image`}
            />
            <div
              className="absolute right-1 top-1 rounded-full border border-white"
              onClick={() => void deleteImage()}
            >
              <IconX color="white" className="cursor-pointer" />
            </div>
          </div>
        ) : (
          <Dropzone
            onDrop={(file) => void uploadImage(file[0]!)}
            onReject={(file) => console.log("rejected files", file)}
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
