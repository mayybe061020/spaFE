import { ActionIcon, Image, Text } from "@mantine/core";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { IconX } from "@tabler/icons";
import { ServiceModel } from "../../../../model/service.model";
import { rawToAutoItem } from "../../../../utilities/fn.helper";
import DatabaseSearchSelect from "../../../../components/database-search.select";
import { formatTime } from "../../../../utilities/time.helper";
import { getListSpaServices } from "../../../../services/spa-service.service";
import { formatPrice } from "../../../../utilities/pricing.helper";
import { useServiceDetailQuery } from "../../../../query/model-detail";
import { linkImage } from "../../../../utilities/image.helper";

type rowProps = {
  no: number;
  disableServices?: number[];
  serviceId: number | null;
  onSelected: (id: number | null) => void;
  onRemoved: (index: number) => void;
  readonly: boolean;
};

const ServiceInCourseRowTable = ({
  no,
  serviceId,
  onSelected,
  onRemoved,
  disableServices,
  readonly,
}: rowProps) => {
  const fnHelper = (s: ServiceModel) => ({
    id: s.id,
    name: s.name,
    description: `${formatPrice(s.price)} VND`,
  });

  const { data: viewingService, isLoading: viewLoading } =
    useServiceDetailQuery(serviceId);

  async function searchService(
    serviceName: string,
    disableList: number[]
  ): Promise<AutoCompleteItemProp<ServiceModel>[]> {
    const paginateProducts = await getListSpaServices(1, 50, {
      name: serviceName,
    });
    return paginateProducts.data.map((i) => ({
      ...rawToAutoItem(i, fnHelper),
      disabled: disableList.includes(i.id),
    }));
  }

  return (
    <tr key={serviceId}>
      <td>{no + 1}</td>
      <td>
        <div className="aspect-square w-full overflow-hidden rounded shadow-lg">
          {viewingService && (
            <Image
              width={"44px"}
              height={"44px"}
              fit={"cover"}
              src={linkImage(viewingService.image)}
              alt={viewingService.name}
            />
          )}
        </div>
      </td>
      <td>
        {!readonly ? (
          viewLoading ? (
            <>loading...</>
          ) : (
            <DatabaseSearchSelect
              value={serviceId ? String(serviceId) : null}
              displayValue={
                viewingService
                  ? {
                      ...rawToAutoItem(viewingService, fnHelper),
                      disabled: true,
                    }
                  : null
              }
              onSearching={(k) => searchService(k, disableServices ?? [])}
              onSelected={(_id) => {
                const id = _id ? Number(_id) : null;
                onSelected(id);
              }}
            />
          )
        ) : (
          <Text>{viewingService?.name}</Text>
        )}
      </td>
      <td>
        {viewingService && formatTime(viewingService.duration, "minutes")}
      </td>
      <td>{viewingService?.price && formatPrice(viewingService.price)}</td>
      {!readonly && (
        <td>
          <ActionIcon onClick={() => onRemoved(no)} color={"red"}>
            <IconX size={18} />
          </ActionIcon>
        </td>
      )}
    </tr>
  );
};

export default ServiceInCourseRowTable;
