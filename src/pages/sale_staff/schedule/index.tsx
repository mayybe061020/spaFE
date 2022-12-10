import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import WorkAppointment from "../../_shared/schedule/work-appointment";
import { useAuthUser } from "../../../store/auth-user.state";

const ManageAppointmentSchedule: AppPageInterface = () => {
  const userRole = useAuthUser((s) => s.user?.role);

  return <WorkAppointment userRole={userRole!} />;
};

ManageAppointmentSchedule.routerName = "Manage Appointment";
ManageAppointmentSchedule.guarded = USER_ROLE.sale_staff;

export default ManageAppointmentSchedule;
