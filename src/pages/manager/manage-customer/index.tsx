import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../_shared/customer/customer-list";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";
import { Divider, Pagination } from "@mantine/core";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useListCustomerQuery } from "../../../query/model-list";

const ManageCustomer: AppPageInterface = () => {
  const router = useRouter();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook(undefined, Number(router.query.page ?? "1"));

  const { data: listUser, isLoading: listUserLoading } = useListCustomerQuery(
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
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex-1">
        <ListCustomer
          page={currentPage}
          pageSize={pageSize}
          data={listUser?.data}
          isLoading={listUserLoading}
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

ManageCustomer.guarded = USER_ROLE.manager;

export default ManageCustomer;
