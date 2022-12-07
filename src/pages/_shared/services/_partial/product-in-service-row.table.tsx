import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  Path,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { getServiceModelSchema } from "../../../../validation/service-model.schema";
import { z } from "zod";
import { ActionIcon, Image, NumberInput, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { useQuery } from "@tanstack/react-query";
import { rawToAutoItem } from "../../../../utilities/fn.helper";
import { ProductModel } from "../../../../model/product.model";
import FormErrorMessage from "../../../../components/form-error-message";
import DatabaseSearchSelect from "../../../../components/database-search.select";
import { useState } from "react";
import { stateInputProps } from "../../../../utilities/mantine.helper";
import {
  getListProduct,
  getProductById,
} from "../../../../services/product.service";
import { formatPrice } from "../../../../utilities/pricing.helper";
import { linkImage } from "../../../../utilities/image.helper";

type ParentSchema = ReturnType<typeof getServiceModelSchema>;
type inferParentSchema = z.infer<ParentSchema>;

type NestedArrayRowProps = {
  control: Control<inferParentSchema>;
  field: FieldArrayWithId<inferParentSchema, "products">;
  register: UseFormRegister<inferParentSchema>;
  index: number;
  errors?: FieldErrors;
  remove: UseFieldArrayRemove;
  readonly?: boolean;
};

const ProductInServiceRowTable = ({
  control,
  field,
  index,
  errors,
  remove,
  readonly,
}: NestedArrayRowProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(field.productId);

  const { data: viewingProduct, isLoading: viewLoading } =
    useQuery<ProductModel | null>(["available-product", selectedId], () => {
      if (selectedId === undefined || selectedId === null) {
        return null;
      }
      return getProductById(selectedId);
    });

  const fnHelper = (s: ProductModel) => ({
    id: s.id,
    name: s.name,
    description: `${formatPrice(s.price)} VND`,
  });

  async function searchProduct(
    productName: string
  ): Promise<AutoCompleteItemProp<ProductModel>[]> {
    const paginateProducts = await getListProduct(1, 50, {
      name: productName,
    });
    return paginateProducts.data.map((i) =>
      rawToAutoItem({ ...i, supplier: i.supplier.id }, fnHelper)
    );
  }

  return (
    <tr key={field.id}>
      <td className={"text-center"}>{index + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          {viewingProduct && (
            <Image
              width={"100%"}
              fit={"cover"}
              src={linkImage(viewingProduct.image)}
              alt={viewingProduct.name}
            />
          )}
        </div>
      </td>
      <td className={"overflow-hidden text-ellipsis whitespace-nowrap"}>
        {viewLoading ? (
          <>loading...</>
        ) : (
          <Controller
            render={({ field: ControlledField }) =>
              readonly ? (
                <Text>{viewingProduct?.name}</Text>
              ) : (
                <DatabaseSearchSelect
                  value={selectedId ? String(selectedId) : null}
                  displayValue={
                    viewingProduct
                      ? {
                          ...rawToAutoItem(viewingProduct, fnHelper),
                          disabled: true,
                        }
                      : null
                  }
                  onSearching={searchProduct}
                  onSelected={(_id) => {
                    const id = _id ? Number(_id) : null;
                    ControlledField.onChange(id);
                    setSelectedId(id);
                  }}
                />
              )
            }
            control={control}
            name={`products.${index}.productId` as Path<inferParentSchema>}
          />
        )}

        <FormErrorMessage
          noPreHeight={true}
          errors={errors}
          name={`products.${index}.productId`}
        />
      </td>
      <td className={"text-center"}>{viewingProduct?.dose}</td>
      <td
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap text-center"
        }
      >
        {viewingProduct?.unit}
      </td>
      <td>
        <Controller
          name={`products.${index}.usage`}
          control={control}
          render={({ field }) => (
            <NumberInput
              defaultValue={field.value}
              onChange={(v) => field.onChange(v)}
              onBlur={field.onBlur}
              hideControls
              {...stateInputProps(undefined, readonly, {
                required: true,
                variant: "default",
                size: "sm",
                placeholder: "amount of quantity per use",
              })}
            />
          )}
        ></Controller>
        <FormErrorMessage
          noPreHeight={true}
          errors={errors}
          name={`products.${index}.usage`}
        />
      </td>
      <td>
        {!readonly && (
          <ActionIcon onClick={() => remove(index)} color={"red"}>
            <IconX size={18} />
          </ActionIcon>
        )}
      </td>
    </tr>
  );
};

export default ProductInServiceRowTable;
