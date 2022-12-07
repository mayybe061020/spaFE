import {
  Avatar,
  Group,
  MantineColor,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { forwardRef } from "react";

export interface AutoCompleteItemProp<T extends object>
  extends SelectItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  data: T & {
    color?: MantineColor;
    description: string;
    image?: string;
  };
}

const AutoCompleteItem = forwardRef<
  HTMLDivElement,
  AutoCompleteItemProp<object>
>(({ data, label, ...others }: AutoCompleteItemProp<object>, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={data?.image} />

      <div>
        <Text>{label}</Text>
        <Text size="xs" color="dimmed">
          {data?.description}
        </Text>
      </div>
    </Group>
  </div>
));

AutoCompleteItem.displayName = "AutoCompleteItem";

export default AutoCompleteItem;
