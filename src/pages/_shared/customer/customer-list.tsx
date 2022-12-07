import { Table } from "@mantine/core";
import ListHeaderTable from "./_partial/list/_header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import { getItemNo } from "../../../hooks/pagination.hook";
import ListRowTable from "./_partial/list/_row.table";
import { CustomerModel } from "../../../model/customer.model";
import { FC } from "react";

type ListCustomerProps = {
  isLoading?: boolean;
  data?: CustomerModel[];

  page: number;
  pageSize: number;

  // events
  onRowClick?: (dataPerRow: CustomerModel, index: number) => void;
};

const ListCustomer: FC<ListCustomerProps> = ({
  isLoading,
  data,
  page,
  pageSize,
  onRowClick,
}) => {
  return (
    <Table
      className={"table-fixed"}
      withBorder
      withColumnBorders
      highlightOnHover
      striped
      cellSpacing={16}
      horizontalSpacing={16}
      verticalSpacing={16}
    >
      <ListHeaderTable />

      <tbody>
        {isLoading ? (
          <RowPlaceholderTable
            colSpan={5}
            className={"min-h-12"}
            message={
              <div className="text-center font-semibold text-gray-500">
                Loading...
              </div>
            }
          />
        ) : (
          data &&
          data.map((d, i) => (
            <ListRowTable
              key={d.id}
              data={d}
              no={getItemNo(i, page, pageSize)}
              onSelect={(data) => onRowClick && onRowClick(data, i)}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ListCustomer;
