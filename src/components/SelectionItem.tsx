import { Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { FC } from "react";

interface IProps {
  index: number;
  onClick: () => Promise<void>;
  title?: string;
  imgUrl?: string | null;
}

const SelectionItem: FC<IProps> = ({ index, onClick, title, imgUrl }) => {
  const mdBreakpoint = useMediaQuery("(min-width: 64em)");
  const xlBreakpoint = useMediaQuery("(min-width: 90em)");

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onClick={void onClick}
    >
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={`Option ${index + 1} image`}
          fit="cover"
          width={xlBreakpoint ? 600 : mdBreakpoint ? 450 : 300}
          height={xlBreakpoint ? 400 : mdBreakpoint ? 300 : 200}
          caption={title}
          styles={{
            caption: { fontSize: 28 },
          }}
        />
      ) : (
        <Text size={24} weight="bold">
          {title}
        </Text>
      )}
    </div>
  );
};

export default SelectionItem;
