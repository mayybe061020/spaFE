import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../_shared/customer/customer-list";
import { USER_ROLE } from "../../../const/user-role.const";
import { useRouter } from "next/router";
import { Divider, Input, Pagination } from "@mantine/core";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useListCustomerQuery } from "../../../query/model-list";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { IconSearch } from "@tabler/icons";
import { ChangeEvent } from "react";

const ManageCustomer: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
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
      searchQuery: searchKey ? { name: searchKey } : undefined,
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
      <div className="flex justify-end space-x-2">
        <Input
          icon={<IconSearch />}
          placeholder={"Tên khách hàng..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>

      <Divider />

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
