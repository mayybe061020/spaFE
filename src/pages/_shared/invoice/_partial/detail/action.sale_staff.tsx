import { InvoiceStatus } from "../../../../../model/invoice.model";
import { Button, Text } from "@mantine/core";
import TimeInvoiceInformation from "./time-invoice-information";
import { invoiceStatus } from "../../../../../validation/invoice.schema";

type props = {
  disable?: boolean;
  loading?: boolean;
} & (
  | {
      status?: InvoiceStatus;
      createdDate: string;
    }
  | {
      status?: -1;
      createdDate?: string;
    }
);

const SaleStaffInvoiceAction = ({
  status,
  loading,
  disable,
  createdDate,
}: props) => {
  if (status === invoiceStatus.discarded || status === invoiceStatus.approved) {
    return (
      <div className={"mt-2 flex flex-col"}>
        <Text align={"center"} size={"lg"} color={"dimmed"}>
          {status === invoiceStatus.discarded
            ? "Hóa đơn đã bị hủy"
            : "Hóa đơn đã được xác nhận."}
        </Text>
        <Text align={"center"} size={"xs"} mb={16} color={"dimmed"}>
          Trạng thái của hóa đơn không thể thay đổi.
        </Text>

        {status === invoiceStatus.approved && (
          <TimeInvoiceInformation createdDate={createdDate} />
        )}
      </div>
    );
  }

  if (status === -1) {
    return (
      <Button
        loading={loading}
        disabled={disable}
        title={"Xác nhận hóa đơn"}
        type={"submit"}
        size={"lg"}
        fullWidth
      >
        Xuất Hóa Đơn
      </Button>
    );
  }

  return (
    <div className={"flex flex-col space-y-2"}>
      <Text className={"select-none text-center"} color={"dimmed"} size={"xs"}>
        Hóa đơn này sẽ được tự động xác nhận khi lịch hẹn được hoàn thành.
      </Text>
    </div>
  );
};

export default SaleStaffInvoiceAction;
