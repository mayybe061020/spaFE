import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import { USER_ROLE } from "../../../../const/user-role.const";
import { Button, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import InvoiceEdit from "../../../_shared/invoice/invoice-edit";
import { useInvoiceDetailQuery } from "../../../../query/model-detail";
import { invoiceStatus } from "../../../../validation/invoice.schema";

const ManageInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  const { data, isLoading } = useInvoiceDetailQuery(id, {
    enabled: id !== undefined && !isNaN(id),
  });

  if (isNaN(id) || id <= 0 || (!isLoading && !data)) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.manager}/manage-invoice`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  return (
    <div className={"flex min-h-full flex-col bg-gray-100 p-4"}>
      <div className="mb-8 flex items-center space-x-4">
        <Button
          leftIcon={<IconArrowLeft />}
          onClick={() =>
            navigatePreviousPage(
              previousUrl as string,
              page ? Number(page as string) : undefined
            )
          }
        >
          Quay lại
        </Button>
        <h1 className={"flex flex-1 items-center space-x-4"}>
          <span>Chi tiết Hóa Đơn</span>
          <Text className={"inline select-none"} color={"dimmed"}>
            #{data?.id ?? "-"}
          </Text>
        </h1>
      </div>

      {data && (
        <InvoiceEdit
          data={data}
          footerSection={() => (
            <SaleStaffInvoiceAction
              status={
                data.status === invoiceStatus.pending ? undefined : data.status
              }
              disable={true}
              createdDate={data.createDate}
            />
          )}
        />
      )}
    </div>
  );
};

ManageInvoiceDetail.guarded = USER_ROLE.manager;
ManageInvoiceDetail.routerName = "Hóa Đơn";

export default ManageInvoiceDetail;
