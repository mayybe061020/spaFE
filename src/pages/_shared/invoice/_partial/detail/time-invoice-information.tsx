import { Text, Tooltip } from "@mantine/core";
import { timeToDate, timeToHours } from "../../../../../utilities/time.helper";
import { useClipboard } from "@mantine/hooks";
import dayjs from "dayjs";

type TimeInvoiceProps = {
  createdDate?: string;
};

const TimeInvoiceInformation = (data?: TimeInvoiceProps) => {
  const copyHook = useClipboard({ timeout: 500 });

  function copyFormat(dateRaw?: string) {
    if (!dateRaw) return "Không có sẵn";
    return dayjs(dateRaw).format("DD/MM/YYYY - HH:mm:ss");
  }

  return (
    <Tooltip label={data?.createdDate ? "Click để copy" : undefined}>
      <div
        onClick={() => copyHook.copy(copyFormat(data?.createdDate))}
        className="flex flex-1 cursor-pointer flex-col items-center rounded-lg bg-blue-600 p-4"
      >
        <h4 className={"text-md font-thin text-white"}>Được xác nhận đơn lúc</h4>
        <Text color={"white"} size={"lg"} weight={"bolder"}>
          {data?.createdDate && timeToDate(data?.createdDate)}
        </Text>
        <Text color={"white"}>
          {data?.createdDate && timeToHours(data?.createdDate)}
        </Text>
      </div>
    </Tooltip>
  );
};

export default TimeInvoiceInformation;
