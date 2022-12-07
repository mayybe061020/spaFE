import InformationBlock from "./_information-block";
import { CustomerModel } from "../../../../../model/customer.model";
import { FC, ReactNode } from "react";
import { formatDate } from "../../../../../utilities/time.helper";
import { Divider, ThemeIcon } from "@mantine/core";
import { IconFileInvoice } from "@tabler/icons";

type InformationProps = {
  customer: CustomerModel;
  error?: JSX.Element | ReactNode | string;
};

const CustomerInformationBlock: FC<InformationProps> = ({
  customer,
  error,
}) => {
  return (
    <div className="flex items-start space-x-4">
      <ThemeIcon radius={"xl"} size={"xl"}>
        <IconFileInvoice />
      </ThemeIcon>

      <div className="flex flex-col">
        <label className={"text-xs font-semibold text-gray-400"}>
          Khách Hàng
        </label>
        <h1 className="text-2xl font-semibold leading-none">{customer.name}</h1>
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

export default CustomerInformationBlock;
