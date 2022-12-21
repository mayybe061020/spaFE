import { useState } from "react";
import { IconSettings } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import ViewStaff from "../_view-staff";
import { StaffModel, StaffUpdateEntity } from "../../../../model/staff.model";
import { useMutation } from "@tanstack/react-query";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { updateUser } from "../../../../services/user.service";
import {
  ShowFailedUpdate,
  ShowSuccessUpdate,
} from "../../../../utilities/show-notification";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  staffData: StaffModel;
};

const StaffViewModalBtn = ({ onChanged, staffData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);

  const updateMutation = useMutation<
    boolean,
    IErrorResponse,
    StaffUpdateEntity
  >(["update-staff"], (payload) => updateUser(payload), {
    onSuccess: (result) => {
      if (result) {
        ShowSuccessUpdate();
        // close dialog and update to the list screen
        onChanged && onChanged(true);
        setViewBranch(false);
        return;
      }
      ShowFailedUpdate();
    },
    onError: (e) => {
      console.error(e);
      ShowFailedUpdate();
    },
  });

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
            if (e) {
              updateMutation.mutate(e);
              return;
            }
            setViewBranch(false);
          }}
          staffData={staffData}
        />
      </Modal>
    </>
  );
};

export default StaffViewModalBtn;
