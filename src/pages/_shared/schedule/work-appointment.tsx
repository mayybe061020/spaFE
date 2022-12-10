import { Button, Text } from "@mantine/core";
import CalendarController from "./_partial/calendar-controller";
import { useEffect, useState } from "react";
import AppointmentTimeline from "../../../components/appointment-timeline/appointment.timeline";
import AppointmentHeaderTimeline from "../../../components/appointment-timeline/appointment-header.timeline";
import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../const/user-role.const";
import {
  getBed,
  getSchedule,
  getSlot,
} from "../../../services/schedule.service";
import { SlotModal } from "../../../model/slot.model";
import { SpaBedModel } from "../../../model/spa-bed.model";
import { IconPlus } from "@tabler/icons";
import {ScheduleModel} from "../../../model/schedule.model";

type workAppointmentProps = {
  userRole: USER_ROLE;
};

/**
 * Manager xem được tất cả lịch
 * sale_staff: được create và khi mà status là khác chưa đến thì có thể edit lịch
 * technical_staff: read-only lịch của bản thân
 */

const WorkAppointment: AppPageInterface<workAppointmentProps> = ({
  userRole,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [scheduleData, setScheduleData] = useState<ScheduleModel[]>([]);
  const [slotList, setSlotList] = useState<SlotModal[] | []>([]);
  const [bedList, setBedList] = useState<SpaBedModel[] | []>([]);

  const router = useRouter();
  const goToBooking = () => {
    void router.push({
      pathname: `/${userRole}/schedule/schedule-info`,
    });
  };

  // Lấy list slot trong database
  const getSlotList = async () => {
    const slotData = await getSlot();
    setSlotList(slotData);
  };
  useEffect(() => {
    void getSlotList();
  }, []);

  // Lấy list bed trong database
  const getBedList = async () => {
    const betData = await getBed();
    setBedList(betData.data);
  };
  useEffect(() => {
    void getBedList();
  }, []);

  // Lấy data booking trong database
  const getScheduleList = async () => {
    const scheduleList = await getSchedule(selectedDate.toISOString());
    setScheduleData(scheduleList);
  };
  useEffect(() => {
    void getScheduleList();
  }, [selectedDate]);

  return (
    <div className={"flex h-full flex-col space-y-4 px-4"}>
      <div className="flex h-24 flex-row items-center justify-between border-b">
        {userRole === USER_ROLE.sale_staff && (
          <Button leftIcon={<IconPlus />} color={"teal"} onClick={goToBooking}>
            Đặt lịch
          </Button>
        )}
        <CalendarController
          dateData={selectedDate}
          onChange={setSelectedDate}
        />
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className={"flex w-full flex-row"}>
          <div className="h-16 min-w-32 max-w-32 select-none border-x p-4 font-semibold">
            <Text className={"uppercase"}>Bed Number</Text>
          </div>
          <AppointmentTimeline bedList={bedList} />
        </div>
        {slotList.map((slot, i) => {
          return (
             <div key={i}>
               <AppointmentHeaderTimeline
                   key={slot.id}
                   userRole={userRole}
                   title={slot.name}
                   timeFrame={slot.timeline}
                   bedList={bedList}
                   bedsSchedule={scheduleData.filter((s ) => s.slot.id === slot.id)}
               />
             </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkAppointment;
