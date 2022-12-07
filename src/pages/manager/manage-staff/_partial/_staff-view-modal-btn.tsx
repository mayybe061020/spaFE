import { useState } from "react";
import { IconSettings } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import ViewStaff from "../_view-staff";
import { BranchModel } from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";
import { StaffModel } from "../../../../model/staff.model";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  staffData: StaffModel;
};

const StaffViewModalBtn = ({ onChanged, staffData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

    return (
    <>
      {/* Button view branch -> trigger modal*/}
      <Tooltip onClick={() => setViewBranch(true)} label={"View / Edit"}>
        <ActionIcon className="!inline-flex" color="orange" variant="filled">
          <IconSettings size={12} />
        </ActionIcon>
      </Tooltip>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Staff Detail</h1>
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
        <ViewStaff
          onClosed={(e) => {
            //  TODO: handle API call
            console.log(e);
            // close dialog and update to the list screen
            onChanged && onChanged(true);
            setViewBranch(false);
          }}
          staffData={staffData}
        />
      </Modal>
    </>
  );
};

export default StaffViewModalBtn;
