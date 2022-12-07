import { CustomerModel } from "../../../../../model/customer.model";
import { formatDate } from "../../../../../utilities/time.helper";

type RowProps<T extends CustomerModel> = {
  data: T;
  no: number;
  onSelect?: (d: T) => void;
};

const ListRowTable = <T extends CustomerModel>({
  data,
  no,
  onSelect,
}: RowProps<T>) => {
  return (
    <tr className={"cursor-pointer"} onClick={() => onSelect && onSelect(data)}>
      <td className={"text-center"}>{no}</td>
      <td>{data.name}</td>
      <td className={"text-center uppercase"}>{data.gender}</td>
      <td className={"text-center"}>{data.phone}</td>
      <td className={"text-center"}>
        {data.dateOfBirth && formatDate(data.dateOfBirth)}
      </td>
    </tr>
  );
};

export default ListRowTable;
