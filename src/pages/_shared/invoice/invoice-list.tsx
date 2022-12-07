import { FC } from "react";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import { Table } from "@mantine/core";
import { InvoiceModel } from "../../../model/invoice.model";
import HeaderTable from "./_partial/list/_header.table";
import RowTable from "./_partial/list/_row.table";
import { getItemNo } from "../../../hooks/pagination.hook";

type ListProps = {
  isLoading?: boolean;
  data?: InvoiceModel[];

  page: number;
  pageSize: number;

  onRowClick?: (data: InvoiceModel, index: number) => void;
};

const InvoiceList: FC<ListProps> = ({
  isLoading,
  data,
  onRowClick,
  pageSize,
  page,
}) => {
  return (
    <Table
      className="table-fixed"
      withBorder
      withColumnBorders
      highlightOnHover
    >
      <HeaderTable />
      <tbody>
        {isLoading ? (
          <RowPlaceholderTable
            colSpan={6}
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
            <RowTable
              key={d.id}
              no={getItemNo(i, page, pageSize)}
              data={d}
              onSelect={(d) => onRowClick && onRowClick(d, i)}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};

export default InvoiceList;
