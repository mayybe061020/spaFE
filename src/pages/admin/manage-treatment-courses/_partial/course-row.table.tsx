import { FC } from "react";
import { DataRowProps } from "../../../../interfaces/data-table-row.interface";
import { CourseModel } from "../../../../model/course.model";
import { Image, Text, Tooltip } from "@mantine/core";
import SalePriceTableCell from "../../../../components/cell-sale-price.table";
import { ServiceModel } from "../../../../model/service.model";
import { linkImage } from "../../../../utilities/image.helper";

const CourseRowTable: FC<DataRowProps<CourseModel<ServiceModel>>> = ({
  onClick,
  data,
  no,
}) => {
  return (
    <tr onClick={() => onClick(data)} className={"cursor-pointer"}>
      <td className={"text-center"}>{no}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          <Image
            width={"92px"}
            height={"92px"}
            fit={"cover"}
            src={linkImage(data.image)}
            alt={data.name}
          />
        </div>
      </td>
      <td>
        <Tooltip label={data.name}>
          <Text weight={"bold"} size={"md"} className={"line-clamp-2"}>
            {data.name}
          </Text>
        </Tooltip>
      </td>

      <td>
        <Text className={"line-clamp-2"}>{data.description}</Text>
      </td>

      <td className={"text-center"}>{data.timeOfUse}</td>
      <td className={"text-center"}>{data.duration}</td>
      <td>
        <SalePriceTableCell priceModel={data} />
      </td>
    </tr>
  );
};

export default CourseRowTable;
