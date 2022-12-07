import { Text, Tooltip } from "@mantine/core";
import SalePriceTableCell from "../../../../components/cell-sale-price.table";
import { ServiceModel } from "../../../../model/service.model";
import { FC } from "react";
import { DataRowProps } from "../../../../interfaces/data-table-row.interface";

const ServiceRowTable: FC<DataRowProps<ServiceModel>> = ({
  onClick,
  data,
  no,
}) => {
  return (
    <>
      <tr onClick={() => onClick(data)} className={"cursor-pointer"}>
        <td className={"text-center"}>{no}</td>
        <td className={"font-semibold"}>
          <Tooltip label={data.name}>
            <Text size={"md"} className={"line-clamp-2"}>
              {data.name}
            </Text>
          </Tooltip>
        </td>
        <td>
          <SalePriceTableCell priceModel={data} />
        </td>
        <td>
          <Text className={"line-clamp-2"}>{data.description}</Text>
        </td>
      </tr>
    </>
  );
};

export default ServiceRowTable;
