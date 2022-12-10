import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import InvoiceCreate from "../../../_shared/invoice/invoice-create";
import { Button, LoadingOverlay } from "@mantine/core";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import SaleStaffInvoiceAction from "../../../_shared/invoice/_partial/detail/action.sale_staff";
import {
  BillingProductItem,
  InvoiceCreateEntity,
  InvoiceModel,
} from "../../../../model/invoice.model";
import { useScheduleDetailQuery } from "../../../../query/model-detail";
import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../../../../services/invoice.service";
import { showNotification } from "@mantine/notifications";
import PurchaseItemInformation from "../../../_shared/invoice/_partial/detail/purchase-item-information";
import React, { useState } from "react";
import CustomerInformationBlock from "../../../_shared/invoice/_partial/detail/customer-information";
import PricingInformation from "../../../_shared/invoice/_partial/detail/pricing-information";
import CustomerInformationEdit from "../../../_shared/invoice/_partial/detail/customer-information-editable";
import PurchaseItemInformationEditable from "../../../_shared/invoice/_partial/detail/purchase-item-information-editable";
import { BillingItemData } from "../../../../model/_price.model";

const SaleStaffInvoiceCreate: AppPageInterface = () => {
  const router = useRouter();
  const { previousUrl, schedule_id } = router.query;

  const [_, setAddons] = useState<BillingProductItem[]>([]);
  const [item, setItem] = useState<BillingItemData>();

  const { data: schedule, isLoading } = useScheduleDetailQuery(
    Number(schedule_id as string),
    {
      enabled: router.isReady,
    }
  );

  const { mutateAsync, isLoading: mutateLoading } = useMutation(
    ["create-invoice"],
    (payload: InvoiceCreateEntity) => createInvoice(payload),
    {
      onSuccess: (status) => {
        if (status) {
          showNotification({
            title: "Thành công!",
            message: "Đã tạo mới hóa đơn",
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

  function navigatePreviousPage(previousUrl?: string): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.sale_staff}/invoice`;
    void router.push({
      pathname: mainPath,
    });
  }

  function onInvoiceClose(data?: InvoiceCreateEntity) {
    if (!data) {
      return;
    }
    console.log(data);
    void mutateAsync(data);
  }

  if (!router.isReady) {
    return <>loading...</>;
  }

  if (!schedule && schedule_id) {
    if (isLoading) {
      return <>loading...</>;
    }

    void router.replace("/404");
    return <>Navigating...</>;
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
        <h1 className={"flex-1"}>Tạo thông tin hóa đơn</h1>
      </div>

      <InvoiceCreate
        onAction={onInvoiceClose}
        onAddonsChanged={setAddons}
        defaultValues={{
          scheduleId: schedule?.id,
          customerId: schedule?.customer.id,
          itemId: (schedule?.service ?? schedule?.course)?.id,
          itemType: schedule?.service ? "service" : "course",
        }}
        customerRender={(control) => {
          if (schedule) {
            return <CustomerInformationBlock customer={schedule.customer} />;
          }

          return (
            <CustomerInformationEdit
              onSelected={(e) =>
                control.setValue("customerId", e?.id as number)
              }
              error={<>{control.formState.errors?.customerId}</>}
            />
          );
        }}
        itemRender={(control) => {
          if (schedule) {
            return (
              <PurchaseItemInformation
                item={(schedule.service ?? schedule.course)!}
                itemType={schedule.service ? "service" : "course"}
              />
            );
          }
          control.setValue("itemType", "service");

          return (
            <PurchaseItemInformationEditable
              onSelected={(e) => {
                control.setValue("itemId", e?.id as number);
                setItem(e ?? undefined);
              }}
            />
          );
        }}
        pricingRender={(control, addons) => {
          const onPriceCalculation = ({
            priceAfterTax,
            priceBeforeTax,
          }: Pick<InvoiceModel, "priceAfterTax" | "priceBeforeTax">) => {
            control.setValue("priceBeforeTax", priceBeforeTax, {
              shouldDirty: true,
              shouldValidate: true,
            });
            control.setValue("priceAfterTax", priceAfterTax, {
              shouldDirty: true,
              shouldValidate: true,
            });
          };
          if (schedule) {
            return (
              <PricingInformation
                item={(schedule.service ?? schedule.course)!}
                addons={addons}
                onChange={onPriceCalculation}
              />
            );
          }

          return (
            <PricingInformation
              item={item}
              addons={addons}
              onChange={onPriceCalculation}
            />
          );
        }}
        footerRender={(a) => (
          <SaleStaffInvoiceAction status={-1} disable={!a.isValid} />
        )}
      />
    </div>
  );
};

export default SaleStaffInvoiceCreate;
