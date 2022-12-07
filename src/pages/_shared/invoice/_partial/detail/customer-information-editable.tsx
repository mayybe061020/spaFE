import InformationBlock from "./_information-block";
import { CustomerModel } from "../../../../../model/customer.model";
import { FC, ReactNode, useState } from "react";
import { formatDate } from "../../../../../utilities/time.helper";
import { Divider, ThemeIcon } from "@mantine/core";
import { IconFileInvoice } from "@tabler/icons";
import {
  AutoItemGenericType,
  rawToAutoItem,
} from "../../../../../utilities/fn.helper";
import { stateInputProps } from "../../../../../utilities/mantine.helper";
import DatabaseSearchSelect from "../../../../../components/database-search.select";
import { getAllCustomers } from "../../../../../services/customer.service";
import { AutoCompleteItemProp } from "../../../../../components/auto-complete-item";
import { useCustomerDetailQuery } from "../../../../../query/model-detail";

type InformationProps = {
  onSelected: (customer: CustomerModel | null) => void;
  error?: JSX.Element | ReactNode | string;
};

const CustomerInformationEditBlock: FC<InformationProps> = ({
  onSelected,
  error,
}) => {
  const [selectedId, setSelectedId] = useState<number>();

  const { data: customer } = useCustomerDetailQuery(selectedId, {
    onSuccess: (data) => onSelected(data),
  });

  const parserFn = (customer: CustomerModel) =>
    ({
      id: customer.id,
      name: customer.name,
      description: customer.phone,
    } as AutoItemGenericType<CustomerModel>);

  async function findCustomerByName(name: string) {
    const mc = await getAllCustomers(1, 100, {
      name: name,
    });
    return mc.data.map(
      (r) => rawToAutoItem(r, parserFn) as AutoCompleteItemProp<CustomerModel>
    );
  }

  return (
    <div className="flex items-start space-x-4">
      <ThemeIcon radius={"xl"} size={"xl"}>
        <IconFileInvoice />
      </ThemeIcon>

      <div className="flex flex-1 flex-col">
        <DatabaseSearchSelect
          value={selectedId ? String(selectedId) : null}
          displayValue={
            customer
              ? {
                  ...rawToAutoItem(customer, parserFn),
                  disabled: true,
                }
              : null
          }
          onSearching={findCustomerByName}
          onSelected={(id) => setSelectedId(id ? Number(id) : undefined)}
          {...stateInputProps("Khách Hàng", false, {
            required: true,
          })}
        />
        {error}

        <Divider my={8} />

        <div className="flex w-full flex-wrap gap-x-6 gap-y-4 overflow-hidden text-[14px]">
          <InformationBlock
            data={{
              from: customer,
              key: "phone",
              title: "SĐT",
            }}
          />

          <InformationBlock
            data={{
              from: customer,
              key: "gender",
              title: "Giới Tính",
              allowCopy: false,
            }}
          />

          <InformationBlock
            data={{
              from: customer,
              key: "dateOfBirth",
              title: "Ngày Sinh",
              parser: (d) => {
                if (!d) {
                  return "-";
                }

                return formatDate(d);
              },
            }}
          />

          <InformationBlock
            data={{
              from: customer,
              key: "email",
              title: "Email",
            }}
            className={"w-full"}
          />

          <InformationBlock
            className={"max-w-[500px]"}
            data={{
              from: customer,
              key: "address",
              title: "Địa Chỉ",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationEditBlock;
