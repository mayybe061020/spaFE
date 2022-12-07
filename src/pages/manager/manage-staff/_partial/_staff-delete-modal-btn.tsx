import { useState } from "react";
import { IconTrash } from "@tabler/icons";
import { ActionIcon, Button, Group, Modal, Tooltip } from "@mantine/core";
import { StaffModel } from "../../../../model/staff.model";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  staffData: StaffModel;
};

const StaffViewModalBtn = ({ onChanged, staffData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  const onClose = () => {
    setViewBranch(false)
  }

  const onSubmit = () => {
    // Xác nhận xóa Staff
    onClose()
  }

  return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip onClick={() => setViewBranch(true)} label={"Delete"}>
        <ActionIcon className="!inline-flex" color="red" variant="filled">
          <IconTrash size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Staff Delete</h1>
        }
        opened={viewBranch}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewBranch(false);
        }}
      >
        Are you sure you want to delete staff <span className={'font-bold'}>{staffData.name}</span> from system ?
        <div className={"mt-3"}>
          <Group position="center">
            <Button onClick={() => {onClose()}}>Cancel</Button>
            <Button onClick={() => {onSubmit()}}>Submit</Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default StaffViewModalBtn;
