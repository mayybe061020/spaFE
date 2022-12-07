import React from "react";
import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

type InformationBlockProps<T extends object, K extends keyof T> = {
  data: {
    from?: T | null;
    title: string;
    key: K;
    allowCopy?: boolean;
    parser?: (d: T[K]) => string | null;
  };
} & Omit<React.HTMLAttributes<HTMLDivElement>, "data">;

const InformationBlock = <T extends object, K extends keyof T>({
  data,
  ...divProps
}: InformationBlockProps<T, K>) => {
  const defaultClass = `overflow-hidden text-ellipsis whitespace-nowrap ${
    data.allowCopy !== false && "cursor-pointer"
  }`;
  const clipboard = useClipboard({ timeout: 500 });
  const parser = data.parser ?? ((d: T[keyof T]) => d);

  return (
    <Tooltip
      disabled={data.allowCopy === false}
      label={
        <div className="flex flex-col">
          <p className="max-w-64 whitespace-pre-wrap">
            {data.from && (parser(data.from[data.key]) as string)}
          </p>
          {data.allowCopy !== false && (
            <small className="text-gray-400">Click để copy</small>
          )}
        </div>
      }
    >
      <div
        {...divProps}
        onClick={(e) => {
          data.allowCopy !== false &&
            data.from &&
            clipboard.copy(parser(data.from[data.key]) as string);
          divProps.onClick && divProps.onClick(e);
        }}
        className={`${defaultClass} ${divProps.className}`}
      >
        <span className={"font-semibold"}>{data.title}:</span>
        <span className={"ml-2"}>
          {data.from && (parser(data.from[data.key]) as string)}
        </span>
      </div>
    </Tooltip>
  );
};

export default InformationBlock;
