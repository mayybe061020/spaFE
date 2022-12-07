import { BillingProductItem, InvoiceModel } from "../../../model/invoice.model";
import CustomerInformationBlock from "./_partial/detail/customer-information";
import PurchaseItemInformation from "./_partial/detail/purchase-item-information";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AddonsListInformation from "./_partial/detail/addon-list-information";
import SearchBillingItems from "../../sale_staff/invoice/create/_partial/search-billing-items";
import ItemAddonEdit from "./_partial/detail/_item-edit.addon";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  invoiceCreateItemSchema,
  invoiceStatus,
  invoiceStatusSchema,
} from "../../../validation/invoice.schema";
import { z } from "zod";
import { FormEventHandler, useEffect, useState } from "react";
import { Divider } from "@mantine/core";
import { BillingItemData } from "../../../model/_price.model";
import { idDbSchema, priceSchema } from "../../../validation/field.schema";
import ItemAddonReadonly from "./_partial/detail/_item-readonly.addon";
import PricingInformation from "./_partial/detail/pricing-information";
import { useAuthUser } from "../../../store/auth-user.state";
import { USER_ROLE } from "../../../const/user-role.const";

const editSchema = z.object({
  id: idDbSchema,
  addons: z.array(invoiceCreateItemSchema).min(1),
  priceBeforeTax: priceSchema,
  priceAfterTax: priceSchema,
  status: invoiceStatusSchema,
});

type props = {
  onAction?: (data?: z.infer<typeof editSchema>) => void;
  data: InvoiceModel;

  footerSection: (
    formState: ReturnType<typeof useForm>["formState"]
  ) => JSX.Element;
};

const InvoiceEdit = ({ onAction, data, footerSection }: props) => {
  const [addons, setAddons] = useState<BillingProductItem[]>([]);
  const userRole = useAuthUser((s) => s.user?.role);

  const { reset, control, formState, handleSubmit, setValue } = useForm<
    z.infer<typeof editSchema>
  >({
    resolver: zodResolver(editSchema),
    mode: "onBlur",
    defaultValues: {
      id: data.id,
      priceBeforeTax: data.priceBeforeTax,
      priceAfterTax: data.priceAfterTax,
      status: data.status,
    },
  });

  const {
    fields: itemsArray,
    append,
    remove,
    replace,
  } = useFieldArray({
    control,
    name: "addons",
  });

  useEffect(() => {
    const newSetData: BillingProductItem[] = [];
    const parsedData = data.addons.map((i) => {
      newSetData.push(i);
      return {
        itemId: i.item.id,
        quantity: i.quantity,
      };
    });
    setAddons(newSetData);
    replace(parsedData);
  }, [data.addons]);

  const onNewItemAdded = (item: BillingItemData) => {
    const data = {
      itemId: item.id,
      quantity: 1,
    };
    append(data);
    setAddons((i) => [
      ...i,
      {
        item: item,
        quantity: 1,
      },
    ]);
  };

  const onRemoveBillingItem = (index: number) => {
    remove(index);
    setAddons((i) => {
      const cloneArr = [...i];
      // remove the item at position
      cloneArr.splice(index, 1);
      return cloneArr;
    });
  };

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    reset();
    onAction && onAction();
  };

  const onSubmit = (data: z.infer<typeof editSchema>) => {
    onAction && onAction(data);
  };

  const onPriceCalculation = ({
    priceAfterTax,
    priceBeforeTax,
  }: Pick<InvoiceModel, "priceAfterTax" | "priceBeforeTax">) => {
    setValue("priceBeforeTax", priceBeforeTax, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("priceAfterTax", priceAfterTax, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      className="mx-auto flex w-[90vw] max-w-[800px] flex-col space-y-10 rounded-lg bg-white p-4 shadow"
    >
      {/*   Customer section        */}
      <CustomerInformationBlock customer={data.customer} />

      <PurchaseItemInformation item={data.item} itemType={data.itemType} />

      <AddonsListInformation
        removable={data.status === invoiceStatus.pending}
        data={itemsArray}
        renderItem={(item, index) => (
          <Controller
            control={control}
            name={`addons.${index}.quantity`}
            render={({ field }) =>
              data.status === invoiceStatus.pending &&
              userRole === USER_ROLE.sale_staff ? (
                <ItemAddonEdit
                  addon={addons[index]}
                  itemNo={index}
                  onRemove={onRemoveBillingItem}
                  onQuantityChange={(quantity) => {
                    field.onChange(quantity);
                    field.onBlur();
                    setAddons((s) => {
                      const clone = [...s];
                      const itemToChange = clone.at(index);
                      if (itemToChange) {
                        itemToChange.quantity = quantity ?? 1;
                      }
                      return clone;
                    });
                  }}
                />
              ) : (
                <ItemAddonReadonly data={addons[index]!} no={index} />
              )
            }
            key={item.id}
          />
        )}
      />

      <div className="flex flex-col space-y-4">
        {data.status === invoiceStatus.pending && (
          <SearchBillingItems onChange={onNewItemAdded} />
        )}

        <Divider my={16} />

        <PricingInformation
          item={data.item}
          addons={addons}
          onChange={onPriceCalculation}
        />
      </div>
      {footerSection && footerSection(formState)}
    </form>
  );
};

export default InvoiceEdit;
