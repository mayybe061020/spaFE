import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceEdit from "../../../_shared/invoice/invoice-edit";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import { USER_ROLE } from "../../../../const/user-role.const";
import { useRouter } from "next/router";
import { InvoiceUpdateEntity } from "../../../../model/invoice.model";
import { useInvoiceDetailQuery } from "../../../../query/model-detail";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import { useMutation } from "@tanstack/react-query";
import { updateInvoiceStatus } from "../../../../services/invoice.service";
import { showNotification } from "@mantine/notifications";

const SaleStaffInvoiceDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  const { data, isLoading } = useInvoiceDetailQuery(id, {
    enabled: id !== undefined && !isNaN(id),
  });

  const { mutateAsync, isLoading: mutateLoading } = useMutation(
    ["edit-invoice"],
    (payload: InvoiceUpdateEntity) => updateInvoiceStatus(payload),
    {
      onSuccess: (status) => {
        if (status) {
          showNotification({
            title: "Thành công!",
            message: "Đã cập nhật mới hóa đơn",
            color: "teal",
            icon: <IconCheck />,
          });
          return navigatePreviousPage();
        }
        showNotification({
          title: "Thất Bại!",
          message: "Không thể lưu thông tin, hãy thử lại",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

  if (isNaN(id) || id <= 0 || (!isLoading && !data)) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  function onInvoiceClose(data?: InvoiceUpdateEntity) {
    if (!data) {
      return;
    }

    void mutateAsync(data);
  }

  return (
    <div className={"relative flex min-h-full flex-col bg-gray-100 p-4"}>
      <LoadingOverlay visible={isLoading || mutateLoading} overlayBlur={2} />
      <div className="mb-8 flex items-center space-x-4">
        <Button
          onClick={() => navigatePreviousPage(previousUrl as string)}
          leftIcon={<IconArrowLeft />}
        >
          Quay lại
        </Button>
        <h1 className={"flex-1"}>
          <span>Chi tiết Hóa Đơn</span>
          <Text className={"inline select-none"} color={"dimmed"}>
            #{data?.id ?? "-"}
          </Text>
        </h1>
      </div>

      {data && (
        <InvoiceEdit
          onAction={onInvoiceClose}
          data={data}
          footerSection={(a) => (
            <SaleStaffInvoiceAction
              status={data.status}
              disable={!a.isValid}
              createdDate={data.createDate}
            />
          )}
        />
      )}
    </div>
  );
};

export default SaleStaffInvoiceDetail;
