import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useAuthUser } from "../../../store/auth-user.state";
import WorkAppointment from "../../_shared/work-appointment/work-appointment";
import { USER_ROLE } from "../../../const/user-role.const";

const TechStaffAppointmentSchedule: AppPageInterface = () => {
  const userRole = useAuthUser((s) => s.user?.role);

  return <WorkAppointment userRole={userRole!} />;
};

TechStaffAppointmentSchedule.routerName = "View Appointment";
TechStaffAppointmentSchedule.guarded = USER_ROLE.technical_staff;

export default TechStaffAppointmentSchedule;
