import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import { ServiceModel } from "../../../model/service.model";
import usePaginationHook from "../../../hooks/pagination.hook";
import { useListServiceQuery } from "../../../query/model-list";
import { Divider, Input, Pagination, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import ServiceList from "../../_shared/services/service-list";
import { USER_ROLE } from "../../../const/user-role.const";
import ServiceDetailDialog from "../../_shared/services/service-detail.dialog";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";

const Index: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } = useDialogDetailRow<ServiceModel>();
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  const { data: services, isLoading } = useListServiceQuery(
    currentPage,
    updatePagination,
    {
      pageSize,
      searchQuery: searchKey ? { name: searchKey } : undefined,
    }
  );

  return (
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Input
          icon={<IconSearch />}
          placeholder={"tên dịch vụ..."}
          type={"text"}
          className="w-56"
        />
      </div>
      {/*Search by name*/}
      <TextInput
        icon={<IconSearch />}
        placeholder={"Tên dịch vụ..."}
        type={"text"}
        className="w-56"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchWord(e.currentTarget.value)
        }
      />
      <Divider my={8} />

      <div className="flex-1">
        <ServiceList
          pageSize={pageSize}
          page={currentPage}
          data={services?.data}
          isLoading={isLoading}
          onRowClick={(d) => openModal("view", d)}
        />
        {modal && (
          <ServiceDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            readonly={true}
            onClosed={() => resetModal()}
          />
        )}
      </div>

      <Divider my={8} />

      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.sale_staff;

export default Index;
