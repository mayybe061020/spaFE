import { Divider, Table } from "@mantine/core";
import {
  BillingProductCreateEntity,
  BillingProductItem,
} from "../../../../../model/invoice.model";

type BillItemsInformationProps<
  T extends BillingProductItem | BillingProductCreateEntity
> = {
  data: T[];
  removable?: boolean;
  renderItem: (item: T, index: number) => JSX.Element;
};

const AddonsListInformation = <
  T extends BillingProductItem | BillingProductCreateEntity
>({
  data,
  removable,
  renderItem,
}: BillItemsInformationProps<T>) => {
  return (
    <div className="flex flex-col">
      <h1 className="select-none text-lg font-semibold capitalize text-gray-500">
        Sản phẩm kèm theo
      </h1>

      <Divider my={8} />

      <Table
        horizontalSpacing={"xs"}
        verticalSpacing={"xs"}
        className={"table-fixed"}
        highlightOnHover
        fontSize={"sm"}
      >
        <colgroup>
          <col className={"w-12"} />
          <col className={"w-14"} />
          <col />
          <col className={"w-[88px]"} />
          <col className={"w-28"} />
          <col className={"w-24"} />
          {removable && <col className={"w-12"} />}
        </colgroup>
        <thead>
          <tr>
            <th className={"!text-right"}>No.</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Số Lượng</th>
            <th>Giá (VND)</th>
            <th>Thành Tiền</th>
            {removable && <th />}
          </tr>
        </thead>
        <tbody>{data.map((item, index) => renderItem(item, index))}</tbody>
      </Table>
    </div>
  );
};

export default AddonsListInformation;
