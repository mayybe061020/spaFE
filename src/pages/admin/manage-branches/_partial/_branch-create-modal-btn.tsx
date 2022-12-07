import { Button, Modal } from "@mantine/core";
import { IconCheck, IconPlus, IconX } from "@tabler/icons";
import { useState } from "react";
import CreateBranch from "../_create-branch";
import { BranchCreateEntity } from "../../../../model/branch.model";
import { useMutation } from "@tanstack/react-query";
import { createBranch } from "../../../../services/branch.service";
import { IErrorResponse } from "../../../../interfaces/api.interface";
import { showNotification } from "@mantine/notifications";

type BranchModalProps = {
  onChanged: (updated?: boolean) => void;
};

const BranchCreateModalBtn = ({ onChanged }: BranchModalProps) => {
  const [newBranchModal, setNewBranchModal] = useState<boolean>(false);

  const branchMutation = useMutation<
    boolean,
    IErrorResponse,
    BranchCreateEntity
  >(["branch-mutation"], (entity) => createBranch(entity), {
    onSuccess: () => {
      showNotification({
        title: "Success!",
        message: "You have create a new branch!",
        color: "teal",
        icon: <IconCheck />,
      });
      onChanged && onChanged(true);
      setNewBranchModal(false);
    },
    onError: () => {
      showNotification({
        title: "Failed!",
        message: "Cannot create the branch. Please try again!",
        color: "red",
        icon: <IconX />,
      });
    },
  });

  return (
    <>
      {/* Button add new branch -> trigger modal*/}
      <Button
        onClick={() => setNewBranchModal(true)}
        color={"green"}
        leftIcon={<IconPlus />}
      >
        Thêm Chi Nhánh
      </Button>
      <Modal
        title={
          <h1 className="text-center font-thin capitalize">Chi Nhánh Mới</h1>
        }
        opened={newBranchModal}
        onClose={() => {
          console.log("closed");
          // close dialog without update to the list screen
          setNewBranchModal(false);
          onChanged();
        }}
        closeOnClickOutside={false}
      >
        <CreateBranch
          onSave={(e) => {
            if (e) {
              return branchMutation.mutate(e);
            }
            // close dialog and update to the list screen
            onChanged(false);
            setNewBranchModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default BranchCreateModalBtn;
