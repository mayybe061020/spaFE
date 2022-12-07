import { Divider, Input, Pagination } from "@mantine/core";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { IconSearch } from "@tabler/icons";
import InvoiceList from "../../_shared/invoice/invoice-list";
import { useRouter } from "next/router";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useListInvoiceQuery } from "../../../query/model-list";
import { USER_ROLE } from "../../../const/user-role.const";

const Index: AppPageInterface = () => {
  const router = useRouter();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook(undefined, Number(router.query.page ?? "1"));

  const { data: bills, isLoading } = useListInvoiceQuery(
    currentPage,
    updatePagination,
    {
      pageSize,
    }
  );

  function navigateToDetail(id: number, currentPage: number) {
    const url = `${router.pathname}/detail/${id}`;
    void router.push(
      {
        pathname: url,
        query: {
          previousUrl: router.pathname,
          page: currentPage,
        },
      },
      url
    );
  }

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        {/*Search by name*/}
        <Input
          icon={<IconSearch />}
          placeholder={"Bill name..."}
          type={"text"}
          className="w-56"
        />
      </div>
      <Divider my={8} />
      <div className="flex-1">
        <InvoiceList
          page={currentPage}
          pageSize={pageSize}
          data={bills?.data}
          isLoading={isLoading}
          onRowClick={(d) => navigateToDetail(d.id, currentPage)}
        />
      </div>
      <Divider my={8} />
      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalPage}
      />
    </div>
  );
};

Index.routerName = "List of Bill";
Index.guarded = USER_ROLE.manager;

export default Index;
