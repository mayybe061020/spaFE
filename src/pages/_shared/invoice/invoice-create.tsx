import { BillingProductItem } from "../../../model/invoice.model";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SearchBillingItems from "../../sale_staff/invoice/create/_partial/search-billing-items";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceCreateSchema } from "../../../validation/invoice.schema";
import { z } from "zod";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Divider } from "@mantine/core";
import { BillingItemData } from "../../../model/_price.model";
import AddonsListInformation from "./_partial/detail/addon-list-information";
import ItemAddonEdit from "./_partial/detail/_item-edit.addon";

type InvoiceCreateProps = {
  onAction?: (data?: z.infer<typeof invoiceCreateSchema>) => void;
  customerRender: (
    useFormInstance: ReturnType<
      typeof useForm<z.infer<typeof invoiceCreateSchema>>
    >
  ) => React.ReactNode | JSX.Element;
  itemRender: (
    useFormInstance: ReturnType<
      typeof useForm<z.infer<typeof invoiceCreateSchema>>
    >
  ) => React.ReactNode | JSX.Element;
  onAddonsChanged?: (addons: BillingProductItem[]) => void;
  pricingRender: (
    useFormInstance: ReturnType<
      typeof useForm<z.infer<typeof invoiceCreateSchema>>
    >,
    addons: BillingProductItem[]
  ) => React.ReactNode | JSX.Element;
  defaultValues?: Partial<z.infer<typeof invoiceCreateSchema>>;
  footerRender: (
    formState: ReturnType<typeof useForm>["formState"]
  ) => JSX.Element;
};

const InvoiceCreate = ({
  onAction,
  itemRender,
  customerRender,
  onAddonsChanged,
  pricingRender,
  footerRender,
  defaultValues,
}: InvoiceCreateProps) => {
  const [addons, setAddons] = useState<BillingProductItem[]>([]);
  const useFormInvoice = useForm<z.infer<typeof invoiceCreateSchema>>({
    resolver: zodResolver(invoiceCreateSchema),
    mode: "onBlur",
    defaultValues,
  });

  const { reset, control, formState, handleSubmit } = useFormInvoice;

  const {
    fields: itemsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "addons",
  });

  useEffect(() => onAddonsChanged && onAddonsChanged(addons), [addons]);

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

  const onSubmit = (data: z.infer<typeof invoiceCreateSchema>) => {
    onAction && onAction(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      className="mx-auto flex w-[90vw] max-w-[800px] flex-col space-y-10 rounded-lg bg-white p-4 shadow"
    >
      {/*   Customer section        */}
      {customerRender(useFormInvoice)}

      {itemRender(useFormInvoice)}

      <AddonsListInformation
        removable
        data={itemsArray}
        renderItem={(item, index) => (
          <Controller
            control={control}
            name={`addons.${index}.quantity`}
            render={({ field }) => (
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
            )}
            key={item.id}
          />
        )}
      />

      <div className="flex flex-col space-y-4">
        <SearchBillingItems onChange={onNewItemAdded} />

        <Divider my={16} />

        {pricingRender(useFormInvoice, addons)}
      </div>
      {footerRender && footerRender(formState)}
    </form>
  );
};

export default InvoiceCreate;
