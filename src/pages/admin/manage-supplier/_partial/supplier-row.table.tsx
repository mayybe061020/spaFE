import { SupplierModel } from "../../../../model/supplier.model";
import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { DataRowProps } from "../../../../interfaces/data-table-row.interface";

const SupplierRowTable = ({
  data,
  no,
  onClick,
}: DataRowProps<SupplierModel>) => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr onClick={() => onClick(data)} className={"cursor-pointer"}>
      <td className="text-center">{no}</td>
      <td
        onClick={() => clipboard.copy(data.name)}
        className="overflow-hidden text-ellipsis"
      >
        <Tooltip label={data.name}>
          <span>{data.name}</span>
        </Tooltip>
      </td>

      <td onClick={() => clipboard.copy(data.phone)}>{data.phone}</td>
      <td
        onClick={() => clipboard.copy(data.email)}
        className="overflow-hidden text-ellipsis"
      >
        {data.email}
      </td>
      <td
        onClick={() => clipboard.copy(data.address)}
        className="overflow-hidden text-ellipsis"
      >
        <Tooltip label={data.address}>
          <span>{data.address}</span>
        </Tooltip>
      </td>
    </tr>
  );
};

export default SupplierRowTable;
