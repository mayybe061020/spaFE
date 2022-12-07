import {Button, Modal} from "@mantine/core";
import {IconPlus} from "@tabler/icons";
import {useState} from "react";
import StaffCreate from "../_create-staff";
import {USER_ROLE} from "../../../../const/user-role.const";
import {useMutation} from "@tanstack/react-query";
import {IErrorResponse} from "../../../../interfaces/api.interface";
import {ManagerCreateEntity} from "../../../../model/manager.model";
import {createUser} from "../../../../services/user.service";
import {StaffCreateEntity} from "../../../../model/staff.model";
// import CreateStaff from "../_create-branch";

type StaffModalProps = {
    onChanged: (updated?: boolean) => void;
    userRole: string;
};

const StaffCreateModalBtn = ({onChanged, userRole}: StaffModalProps) => {
    const [newStaffModal, setNewStaffModal] = useState<boolean>(false);

    const createMutation = useMutation<
        boolean,
        IErrorResponse,
        StaffCreateEntity
        >((v: StaffCreateEntity) => createUser(v), {
        onSuccess: (result) => {
            if (result) {
                setNewStaffModal(false);
                return onChanged(true);
            }
            onChanged(false);
        },
        onError: (error) => {
            console.warn(error);
            // TODO better error system
            alert(error.message);
        },
    });

    return (
        <>
            {
                userRole === USER_ROLE.manager &&
                <Button onClick={() => setNewStaffModal(true)}
                        color={"green"}
                        leftIcon={<IconPlus/>}>
                    Tạo nhân viên
                </Button>
            }
            <Modal
                title={<h1 className="text-center font-thin capitalize">Tạo nhân viên mới</h1>}
                opened={newStaffModal}
                size={"auto"}
                onClose={() => {
                    onChanged();
                    setNewStaffModal(false);
                }}
                closeOnClickOutside={false}
            >
                <StaffCreate
                    onClosed={async (staff) => {
                        if (staff) {
                            // action and event will be handled by mutation process.
                            await createMutation.mutate(staff);
                            return;
                        }
                        onChanged(false);
                        setNewStaffModal(false);
                    }}
                />
            </Modal>
        </>
    );
};

export default StaffCreateModalBtn;
