import { AppPageInterface } from "../../../interfaces/app-page.interface";
import ListCustomer from "../../_shared/customer/customer-list";
import { useRouter } from "next/router";
import { Button, Divider, Input, Pagination } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons";
import usePaginationHook from "../../../hooks/pagination.hook";
import React, { ChangeEvent } from "react";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { useListCustomerQuery } from "../../../query/model-list";

const SaleStaffCustomerList: AppPageInterface = () => {
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
        {/*  Btn create new customer   */}
        <Button
          component={"a"}
          href={`${router.pathname}/create`}
          color={"teal"}
          leftIcon={<IconPlus />}
        >
          Khách hàng
        </Button>

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

      <Divider my={8}></Divider>

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

export default SaleStaffCustomerList;
