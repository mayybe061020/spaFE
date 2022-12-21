import { FC, FormEvent } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Button,
  Divider,
  Image,
  Modal,
  NumberInput,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import DialogDetailAction from "../../../components/dialog-detail-action";
import FormErrorMessage from "../../../components/form-error-message";
import { DatePicker } from "@mantine/dates";
import { IconPercentage, IconPlus } from "@tabler/icons";
import { MAX_PRICE } from "../../../const/_const";
import {
  formatterNumberInput,
  parserNumberInput,
} from "../../../utilities/fn.helper";
import ProductInServiceRowTable from "./_partial/product-in-service-row.table";
import ProductInServiceHeaderTable from "./_partial/product-in-service-header.table";
import { getServiceModelSchema } from "../../../validation/service-model.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { stateInputProps } from "../../../utilities/mantine.helper";
import { DialogSubmit } from "../../../utilities/form-data.helper";
import { DialogProps } from "../../../interfaces/dialog-detail-props.interface";
import {
  ServiceCreateEntity,
  ServiceModel,
  ServiceUpdateEntity,
} from "../../../model/service.model";
import ImageUpload from "../../../components/image-upload";
import { linkImage } from "../../../utilities/image.helper";

const ServiceDetailDialog: FC<
  DialogProps<ServiceModel, ServiceUpdateEntity, ServiceCreateEntity>
> = ({ readonly, mode, data, onClosed, opened }) => {
  const validateSchema = getServiceModelSchema(mode);
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid, dirtyFields },
  } = useForm<z.infer<typeof validateSchema>>({
    resolver: zodResolver(validateSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues:
      mode === "view" && data
        ? {
          ...data,
          discountStart: data.discountStart
            ? dayjs(data.discountStart).toDate()
            : null,
          discountEnd: data.discountEnd
            ? dayjs(data.discountEnd).toDate()
            : null,
          discountPercent: data.discountPercent ?? null,
          products: data.products.map((p) => ({
            productId: p.product.id,
            usage: p.usage,
          })),
        }
        : undefined,
  });

  const {
    fields: productsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "products",
  });

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClosed && onClosed();
  };

  return (
    <Modal
      onClose={() => reset()}
      opened={opened}
      closeOnClickOutside={false}
      withCloseButton={false}
      size={"auto"}
      padding={0}
    >
      <fieldset
        className={`rounded-[4px] border-2 ${mode === "view" && isDirty
            ? "border-yellow-600"
            : "border-transparent"
          }`}
        disabled={readonly}
      >
        <h2 className={"m-4 text-xl font-semibold uppercase"}>
          {mode === "view" ? "Chi tiết Dịch vụ" : "Tạo Dịch vụ"}
        </h2>

        <form
          className="flex w-[800px] flex-wrap p-4"
          onReset={handleReset}
          onSubmit={handleSubmit(
            DialogSubmit(mode, dirtyFields, onClosed, data)
          )}
        >
          <div className="flex flex-1 flex-col">
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Thông Tin
            </h2>
            <TextInput
              {...register("name")}
              {...stateInputProps("Tên dịch vụ", readonly, {
                required: true,
                variant: "default",
              })}
            />
            <FormErrorMessage errors={errors} name={"name"} />

            <Textarea
              {...register("description")}
              {...stateInputProps("Miêu tả", readonly, {
                required: true,
                variant: "default",
                size: "sm",
              })}
            />
            <FormErrorMessage errors={errors} name={"description"} />

            <Controller
              name={"duration"}
              control={control}
              render={({ field }) => (
                <NumberInput
                  hideControls
                  min={1}
                  precision={0}
                  step={1}
                  max={90}
                  defaultValue={field.value ?? undefined}
                  onChange={(v) => field.onChange(v ?? null)}
                  onBlur={field.onBlur}
                  rightSectionWidth={75}
                  rightSection={
                    <Text color={"dimmed"} size={"sm"}>
                      phút
                    </Text>
                  }
                  {...stateInputProps("Thời gian", readonly, {
                    required: true,
                    variant: "default",
                    size: "sm",
                    placeholder: "perform duration (1 - 90 phút)...",
                  })}
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"duration"} />

            <Divider my={8} />

            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Sự kiện khuyến mãi
              <small className={"block w-full text-xs text-gray-400"}>
                Phần tùy chọn
              </small>
            </h2>

            <Controller
              render={({ field }) => (
                <DatePicker
                  minDate={dayjs(new Date()).toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  {...stateInputProps("Khuyến mãi bắt đầu", readonly, {
                    variant: "default",
                    size: "sm",
                    placeholder: "Phải sau hiện tại",
                  })}
                />
              )}
              name={"discountStart"}
              control={control}
            />
            <FormErrorMessage errors={errors} name={"discountStart"} />

            <Controller
              render={({ field }) => (
                <DatePicker
                  minDate={dayjs(new Date()).toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    field.onBlur();
                  }}
                  defaultValue={field.value}
                  onBlur={field.onBlur}
                  {...stateInputProps("Khuyến mãi kết thúc", readonly, {
                    variant: "default",
                    size: "sm",
                    placeholder: "phải sau ngày bắt đầu khuyến mãi",
                  })}
                />
              )}
              name={"discountEnd"}
              control={control}
            />
            <FormErrorMessage errors={errors} name={"discountEnd"} />

            <Controller
              name={"discountPercent"}
              control={control}
              render={({ field }) => (
                <NumberInput
                  disabled={!watch("discountStart") && !watch("discountEnd")}
                  hideControls
                  min={0}
                  precision={2}
                  step={0.05}
                  max={100}
                  defaultValue={field.value ?? undefined}
                  onChange={(v) => field.onChange(v ?? null)}
                  onBlur={field.onBlur}
                  rightSection={
                    <IconPercentage color={"#939393"} className={"mr-2"} />
                  }
                  {...stateInputProps("% Khuyến Mãi", readonly, {
                    required: true,
                    variant: "default",
                    size: "sm",
                    placeholder: "5%, 10%...",
                  })}
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"discountPercent"} />
          </div>

          <Divider mx={16} orientation={"vertical"} />

          <div className="flex w-48 flex-col">
            <label
              htmlFor="file"
              className="text-[14px] font-[500] text-gray-900"
            >
              Minh họa dịch vụ <span className="text-red-500">*</span>
            </label>
            <small className="mb-1 text-[12px] leading-tight text-gray-400">
              Hình ảnh phải nhỏ hơn 5 MB, ở định dạng *.PNG, *.JPEG hoặc *.WEBP.
            </small>
            <Controller
              name={"image"}
              control={control}
              render={({ field }) => (
                <ImageUpload
                  onChange={(f) => {
                    field.onChange(f);
                    field.onBlur();
                  }}
                  defaultSrc={field.value as string}
                  render={(file) => (
                    <Image
                      radius={4}
                      width={160}
                      height={160}
                      fit={"cover"}
                      className={"rounded border"}
                      src={linkImage(file)}
                      alt="service image"
                    />
                  )}
                />
              )}
            />
            <FormErrorMessage
              className={"text-sm"}
              errors={errors}
              name={"image"}
            />

            <Controller
              name={"price"}
              control={control}
              render={({ field }) => (
                <NumberInput
                  hideControls
                  min={0}
                  max={MAX_PRICE}
                  defaultValue={field.value}
                  onChange={(v) => field.onChange(v)}
                  onBlur={field.onBlur}
                  parser={parserNumberInput}
                  formatter={formatterNumberInput}
                  rightSection={<span className={"text-xs"}>VND</span>}
                  {...stateInputProps("Giá sản phẩm", readonly, {
                    required: true,
                    variant: "default",
                    placeholder: "giá của sản phẩm...",
                  })}
                />
              )}
            ></Controller>
            <FormErrorMessage errors={errors} name={"price"} />
          </div>

          <div className="mt-4 flex w-full flex-col">
            <Divider my={8} />
            <h2
              className={
                "mb-2 select-none border-l pl-2 text-lg font-semibold uppercase text-gray-500"
              }
            >
              Sản phẩm
              <small className={"block w-full text-xs text-gray-400"}>
                Sản phẩm bao gồm trong dịch vụ
              </small>
            </h2>
            <Table className={"table-fixed"}>
              <ProductInServiceHeaderTable />
              <tbody>
                {productsArray.map((item, index) => (
                  <ProductInServiceRowTable
                    control={control}
                    key={item.id}
                    field={item}
                    index={index}
                    remove={remove}
                    errors={errors}
                    register={register}
                    readonly={readonly}
                  />
                ))}
                <tr className={"border-b"}>
                  <td colSpan={7}>
                    {!readonly && (
                      <Button
                        onClick={() =>
                          append({
                            productId: null as unknown as number,
                            usage: 0,
                          })
                        }
                        leftIcon={<IconPlus />}
                        color={"green"}
                        fullWidth
                      >
                        Thêm sản phẩm
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="mt-4 flex w-full justify-end">
            {!readonly ? (
              <DialogDetailAction
                mode={mode}
                isDirty={isDirty && Object.keys(dirtyFields).length > 0}
                isValid={isValid}
                readonly={readonly}
              />
            ) : (
              <div
                className={
                  "cursor-pointer rounded bg-blue-500 px-6 py-2 font-semibold text-white hover:bg-blue-600"
                }
                onClick={() => onClosed()}
              >
                Hủy
              </div>
            )}
          </div>
        </form>
      </fieldset>
    </Modal>
  );
};

export default ServiceDetailDialog;
