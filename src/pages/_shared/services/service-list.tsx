import { Table } from "@mantine/core";
import ServiceHeaderTable from "./_partial/service-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import ServiceRowTable from "./_partial/service-row.table";
import { getItemNo } from "../../../hooks/pagination.hook";
import { ServiceModel } from "../../../model/service.model";
import { FC } from "react";

type ListProps = {
  isLoading?: boolean;
  data?: ServiceModel[];

  page: number;
  pageSize: number;

  onRowClick?: (data: ServiceModel, index: number) => void;
};

const ServiceList: FC<ListProps> = ({
  isLoading,
  data,
  onRowClick,
  pageSize,
  page,
}) => {
  return (
    <Table className={"table-fixed"} withBorder highlightOnHover striped>
      <ServiceHeaderTable />

      <tbody>
        {isLoading ? (
          <RowPlaceholderTable
            colSpan={4}
            className={"min-h-12"}
            message={
              <div className="text-center font-semibold text-gray-500">
                Loading...
              </div>
            }
          />
        ) : (
          data &&
          data.map((s, i) => (
            <ServiceRowTable
              onClick={(service) => onRowClick && onRowClick(service, i)}
              key={s.id}
              data={s}
              no={getItemNo(i, page, pageSize)}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ServiceList;
