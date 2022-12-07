import { Divider, Input, Pagination, Table, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import ProductHeaderTable from "../../admin/manage-products/_partial/product-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import ProductRowTable from "../../admin/manage-products/_partial/product-row.table";
import { ProductModel } from "../../../model/product.model";
import ProductDetailDialog from "../../_shared/products/_product-detail-dialog";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import { SupplierModel } from "../../../model/supplier.model";
import { useListProductQuery } from "../../../query/model-list";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import useDebounceHook from "../../../hooks/use-debounce.hook";
import { ChangeEvent } from "react";

const ListProducts: AppPageInterface = () => {
  const { value: searchKey, onChange: setSearchWord } = useDebounceHook();
  const { modal, openModal, resetModal } =
    useDialogDetailRow<ProductModel<SupplierModel>>();

  const {
    pageSize,
    currentPage,
    totalPage,
    update: updatePagination,
  } = usePaginationHook();

  const { data: products, isLoading } = useListProductQuery(
    currentPage,
    updatePagination,
    {
      pageSize,
      searchQuery: searchKey ? { name: searchKey } : undefined,
    }
  );

  return (
    <div className="flex min-h-full flex-col space-y-4 p-4">
      <div className="flex justify-end space-x-2">
        <Input
          icon={<IconSearch />}
          placeholder={"product name..."}
          type={"text"}
          className="w-56"
        />

        <TextInput
          icon={<IconSearch />}
          placeholder={"Tên sản phẩm..."}
          type={"text"}
          className="w-56"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchWord(e.currentTarget.value)
          }
        />
      </div>
      <Divider my={8} />
      <div className="flex-1">
        <Table withBorder className="table-fixed">
          <ProductHeaderTable />
          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={7}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              products &&
              products.data.map((p, i) => (
                <ProductRowTable
                  onClick={(product) => openModal("view", product)}
                  key={p.id}
                  data={p}
                  no={getItemNo(i, currentPage, pageSize)}
                />
              ))
            )}
          </tbody>
        </Table>
        {modal && (
          <ProductDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            readonly={true}
            onClosed={async () => resetModal()}
          />
        )}
      </div>
      <Divider my={8} />
      {/*Total record / 10 (per-page)*/}
      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(pageNo) => updatePagination({ newPage: pageNo })}
        total={totalPage}
      ></Pagination>
    </div>
  );
};

ListProducts.guarded = USER_ROLE.technical_staff;

export default ListProducts;
