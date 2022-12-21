import { FC, useEffect, useState } from "react";
import { Button, Table, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import ServiceInCourseRowTable from "./service-in-course-row.table";

type TableProps = {
  services?: number[];
  onChange: (serviceId: (number | null)[]) => void;
  readonly: boolean;
};

const ServiceInCourseTable: FC<TableProps> = ({
  services,
  onChange,
  readonly,
}) => {
  const [serviceIds, setServiceIds] = useState<(number | null)[]>(
    services ?? []
  );

  function addingService() {
    setServiceIds((existing) => [...existing, null]);
  }

  function removeService(atIndex: number) {
    const arr = [...serviceIds];
    arr.splice(atIndex, 1);
    setServiceIds(arr);
  }

  function onServiceChanged(rowIndex: number, id: number | null) {
    const arr = [...serviceIds];
    arr.splice(rowIndex, 1, id);
    setServiceIds(arr);
  }

  useEffect(() => {
    onChange(serviceIds);
  }, [serviceIds]);

  return (
    <Table className={"table-fixed"}>
      <colgroup>
        <col className={"w-14"} />
        <col className={"w-16"} />
        <col />
        <col className={"w-32"} />
        <col className={"w-32"} />
        {!readonly && <col className={"w-14"} />}
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>Hình ảnh</th>
          <th>Tên</th>
          <th>
            Thời lượng{" "}
            <Text size={"xs"} color={"dimmed"}>
              (phút)
            </Text>
          </th>
          <th>
            Giá{" "}
            <Text size={"xs"} color={"dimmed"}>
              (VND)
            </Text>
          </th>
          {!readonly ?? <th></th>}
        </tr>
      </thead>
      <tbody>
        {serviceIds.map((item, index) => (
          <ServiceInCourseRowTable
            key={index}
            no={index}
            onRemoved={removeService}
            onSelected={(i) => onServiceChanged(index, i)}
            serviceId={item}
            disableServices={services}
            readonly={readonly}
          />
        ))}
        {!readonly && (
          <tr className={"border-b"}>
            <td colSpan={6}>
              <Button
                onClick={() => addingService()}
                leftIcon={<IconPlus />}
                color={"green"}
                fullWidth
              >
                Dịch vụ
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ServiceInCourseTable;
