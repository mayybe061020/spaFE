import { ScheduleStatus } from "../model/schedule.model";

export function mapStatusHelper(status: ScheduleStatus) {
  const statusInfo = {
    status: "",
    color: "",
  };
  switch (status) {
    case ScheduleStatus.Cancel:
      statusInfo.status = "Hủy";
      statusInfo.color = "text-red-700 font-bold";
      break;
    case ScheduleStatus.Waiting:
      statusInfo.status = "Chờ";
      statusInfo.color = "text-stone-600 font-bold";
      break;
    case ScheduleStatus.Serving:
      statusInfo.status = "Đang xử lý";
      statusInfo.color = "text-yellow-700 font-bold";
      break;
    case ScheduleStatus.Finish:
      statusInfo.status = "Hoàn tất";
      statusInfo.color = "text-green-700 font-bold";
  }

  return statusInfo;
}
