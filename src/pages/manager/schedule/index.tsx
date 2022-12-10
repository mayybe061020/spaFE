import { AppPageInterface } from "../../../interfaces/app-page.interface";
import WorkAppointment from "../../_shared/schedule/work-appointment";
import { useAuthUser } from "../../../store/auth-user.state";

const ManageAppointmentSchedule: AppPageInterface = () => {
  const userRole = useAuthUser((s) => s.user?.role);

  return <WorkAppointment userRole={userRole!} />;
};

ManageAppointmentSchedule.routerName = "Manage Appointment";

export default ManageAppointmentSchedule;
