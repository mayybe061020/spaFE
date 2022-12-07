import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { Button, Divider, Pagination, Table, TextInput } from "@mantine/core";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import SupplierHeaderTable from "./_partial/supplier-header.table";
import SupplierRowTable from "./_partial/supplier-row.table";
import { useListSupplierQuery } from "../../../query/model-list";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import {
  SupplierCreateEntity,
  SupplierModel,
  SupplierUpdateEntity,
} from "../../../model/supplier.model";
import SupplierDetailDialog from "./_supplier-detail.dialog";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../interfaces/api.interface";
import {
  createSupplier,
  updateSupplier,
} from "../../../services/supplier.service";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconPlus, IconSearch, IconX } from "@tabler/icons";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";

const Index: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } = useDialogDetailRow<SupplierModel>();
  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  // query to get the list of the supplier
  const {
    data: suppliers,
    isLoading,
    refetch,
  } = useListSupplierQuery(currentPage, updatePagination, {
    pageSize,
    searchQuery: searchKey
      ? {
          name: searchKey,
        }
      : undefined,
  });

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    SupplierUpdateEntity
  >(["update-supplier"], (data: SupplierUpdateEntity) => updateSupplier(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have updated the supplier!",
        color: "teal",
        icon: <IconCheck />,
      });
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot update the supplier. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  const createMutation = useMutation<
    boolean,
    IErrorResponse,
    SupplierCreateEntity
  >(["create-supplier"], (data: SupplierCreateEntity) => createSupplier(data), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have created a new supplier!",
        color: "teal",
        icon: <IconCheck />,
      });
      resetModal();
      refetch();
    },
    onError: (e) => {
      console.error(e);
      showNotification({
        title: "Failed!",
        message: "Cannot create new supplier. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      {/*  Search section   */}
      <div className="flex justify-end space-x-2">
        {/*  Btn create new supplier   */}
        <Button onClick={() => openModal("create")} leftIcon={<IconPlus />}>
          Thêm Đ/V Cung Ứng
        </Button>
        {/*Search by name*/}
        <TextInput
          icon={<IconSearch />}
          placeholder={"Tên đơn vị..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>

      <Divider my={8}></Divider>

      <div className="flex-1">
        <Table
          className={"table-fixed"}
          withBorder
          withColumnBorders
          highlightOnHover
          striped
        >
          <SupplierHeaderTable />

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
              suppliers &&
              suppliers.data.map((d, i) => (
                <SupplierRowTable
                  onClick={(s) => openModal("view", s)}
                  key={d.id}
                  data={d}
                  no={getItemNo(i, currentPage, pageSize)}
                />
              ))
            )}
          </tbody>
        </Table>

        {modal && (
          <SupplierDetailDialog
            mode={modal.mode as never}
            data={modal.data}
            opened={!!modal}
            onClosed={async (
              u?: SupplierUpdateEntity | SupplierCreateEntity
            ) => {
              if (u) {
                if (modal.mode === "create") {
                  await createMutation.mutateAsync(u as SupplierCreateEntity);
                  return;
                } else {
                  await updateMutation.mutateAsync(u as SupplierUpdateEntity);
                  return;
                }
              }
              resetModal();
            }}
          />
        )}
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

Index.guarded = USER_ROLE.admin;
Index.routerName = "Manage Supplier";

export default Index;
