import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { StaffModel } from "../../../../model/staff.model";

type RecordProps = {
  no?: number;
  data: StaffModel;
  action: JSX.Element;
};

export default function TableRecord(props: RecordProps) {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <tr>
      <td className="text-center">{props.no}</td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.name)}
      >
        <Tooltip label={props.data.name}>
          <span>{props.data.name}</span>
        </Tooltip>
      </td>

      <td
        className="text-center overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.role)}
      >
        <Tooltip label={props.data.role}>
          <span>{props.data.role}</span>
        </Tooltip>
      </td>

      <td className="text-center overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.phone)}>
        {props.data.phone}
      </td>

      <td className="text-center">{props.action}</td>
    </tr>
  );
}
