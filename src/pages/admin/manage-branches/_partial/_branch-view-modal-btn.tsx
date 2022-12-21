import { useState } from "react";
import { IconCheck, IconSettings, IconX } from "@tabler/icons";
import { ActionIcon, Modal, Tooltip } from "@mantine/core";
import BranchInfo from "../_view-branch";
import {
  BranchModel,
  BranchUpdateEntity,
} from "../../../../model/branch.model";
import { ManagerModel } from "../../../../model/manager.model";
import { useMutation } from "@tanstack/react-query";
import { updateBranch } from "../../../../services/branch.service";
import { showNotification } from "@mantine/notifications";

type ModalProps = {
  onChanged?: (updated?: boolean) => void;
  branchData: BranchModel<ManagerModel>;
};

const BranchViewModalBtn = ({ onChanged, branchData }: ModalProps) => {
  const [viewBranch, setViewBranch] = useState<boolean>(false);
  const updateMutation = useMutation(
    ["update-branch"],
    (branchData: BranchUpdateEntity) => updateBranch(branchData),
    {
      onSuccess: () => {
        showNotification({
          title: "Success!",
          message: "You have updated the branch!",
          color: "teal",
          icon: <IconCheck />,
        });
        onChanged && onChanged(true);
        setViewBranch(false);
      },
      onError: () => {
        showNotification({
          title: "Failed!",
          message: "Cannot update the branch. Please try again!",
          color: "red",
          icon: <IconX />,
        });
      },
    }
  );

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
          <h1 className="text-center font-thin capitalize">Thông tin chi nhánh</h1>
        }
        opened={viewBranch}
        size={"auto"}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          onChanged && onChanged();
          setViewBranch(false);
        }}
        closeOnClickOutside={false}
      >
        <BranchInfo
          onClose={async (e) => {
            if (e) {
              await updateMutation.mutateAsync(e);
              return;
            }
            // close dialog and update to the list screen
            onChanged && onChanged(false);
            setViewBranch(false);
          }}
          branchData={branchData}
        />
      </Modal>
    </>
  );
};

export default BranchViewModalBtn;
