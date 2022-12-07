import { Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { BranchModel } from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";

type RecordProps = {
  no?: number;
  data: BranchModel<ManagerModel>;
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
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.manager)}
      >
        <Tooltip label={props.data.manager.name}>
          <span>{props.data.manager.name}</span>
        </Tooltip>
      </td>
      <td onClick={() => clipboard.copy(props.data.phone)}>
        {props.data.phone}
      </td>
      <td
        className="overflow-hidden text-ellipsis"
        onClick={() => clipboard.copy(props.data.email)}
      >
        <Tooltip label={props.data.email}>
          <span>{props.data.email}</span>
        </Tooltip>
      </td>
      <td onClick={() => clipboard.copy(props.data.address)}>
        <Tooltip
          label={
            <div className="flex flex-col">
              <p className="max-w-40 whitespace-pre-wrap">
                {props.data.address}
              </p>
              <small className="text-gray-400">Click để copy</small>
            </div>
          }
        >
          <p
            className={
              "cursor-copy select-none overflow-hidden text-ellipsis whitespace-nowrap"
            }
          >
            {props.data.address}
          </p>
        </Tooltip>
      </td>
      <td className="text-center">{props.action}</td>
    </tr>
  );
}
