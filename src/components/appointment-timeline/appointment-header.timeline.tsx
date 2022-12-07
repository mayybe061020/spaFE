import AppointmentSlot from "./appointment-slot";
import {FC} from "react";
import {Text} from "@mantine/core";
import {ScheduleModel} from "../../model/schedule.model";
import {useRouter} from "next/router";
import {SpaBedModel} from "../../model/spa-bed.model";
import {mapStatusHelper} from "../../utilities/map-status.helper";
import {USER_ROLE} from "../../const/user-role.const";
import React from "react";

type SlotProps = {
    title: string;
    timeFrame: string;
    bedsSchedule?: ScheduleModel[];
    userRole: string;
    bedList: SpaBedModel[];
};

const AppointmentHeaderTimeline: FC<SlotProps> = ({
                                                      title,
                                                      timeFrame,
                                                      bedsSchedule,
                                                      userRole,
                                                      bedList,
                                                  }) => {
    const router = useRouter();
    const moreInfo = (data: ScheduleModel) => {
        void router.push({
            pathname: `/${userRole}/schedule/schedule-info`,
            query: {
                schedule_id: data.id,
            },
        });
    };

    const returnData = (): Array<ScheduleModel[]> =>
        bedList.map((bed) => {
            return (bedsSchedule ?? []).filter(schedule => bed.id === schedule.bed.id)
        });


    // return bedsSchedule?.filter(schedule => {
    //     if (bed.id === schedule.bed.id) {
    //         return (
    //             <AppointmentSlot key={i} className={"min-w-64"}>
    //                 <div
    //                     className={
    //                         "h-max w-full cursor-pointer rounded-lg bg-yellow-300 p-2 text-sm shadow transition hover:shadow-xl"
    //                     }
    //                     onClick={() => moreInfo(schedule)}
    //                 >
    //                     <div className={"flex justify-between pb-1"}>
    //                         <span>Tên khách hàng</span>
    //                         <span>{schedule.customer?.name}</span>
    //                     </div>
    //                     <div className={"flex justify-between pb-1"}>
    //                         <span>NV kỹ thuật</span>
    //                         <span>{schedule.tech_staff?.name}</span>
    //                     </div>
    //                     {userRole === USER_ROLE.manager && (
    //                         <div className={"flex justify-between pb-1"}>
    //                             <span>NV bán hàng</span>
    //                             <span>{schedule.sale_staff?.name}</span>
    //                         </div>
    //                     )}
    //                     <div className={"flex justify-between pb-1"}>
    //                         <span>Dịch vụ</span>
    //                         <span>
    //                           {schedule.service
    //                               ? schedule.service.name
    //                               : schedule.course!.name}
    //                         </span>
    //                     </div>
    //                     <div className={"flex justify-between"}>
    //                         <span>Tình trạng</span>
    //                         <span className={mapStatusHelper(schedule.status).color}>
    //                           {mapStatusHelper(schedule.status).status}
    //                         </span>
    //                     </div>
    //                 </div>
    //             </AppointmentSlot>
    //         );
    //     }
    //     return <AppointmentSlot key={i} className={"min-w-64"}></AppointmentSlot>
    // })

    return (
        <div className={"flex h-max"}>
            <AppointmentSlot
                className={"flex min-w-32 select-none flex-col justify-center"}
            >
                <Text className={"font-semibold"}>{title}</Text>
                <Text size={"sm"} color={"dimmed"}>
                    {timeFrame}
                </Text>
            </AppointmentSlot>

            {
                returnData().map((bed, bedIndex) => {
                    if (bed.length === 0) {
                        return <AppointmentSlot key={bedIndex} className={"min-w-64"}></AppointmentSlot>
                    }

                    return <React.Fragment key={bedIndex}>
                        {bed.map((schedule, scheduleIndex) =>
                            <AppointmentSlot key={`${bedIndex}-${scheduleIndex}`} className={"min-w-64"}>
                                <div
                                    className={
                                        "h-max w-full cursor-pointer rounded-lg bg-yellow-300 p-2 text-sm shadow transition hover:shadow-xl"
                                    }
                                    onClick={() => moreInfo(schedule)}
                                >
                                    <div className={"flex justify-between pb-1"}>
                                        <span>Tên khách hàng</span>
                                        <span>{schedule.customer?.name}</span>
                                    </div>
                                    <div className={"flex justify-between pb-1"}>
                                        <span>NV kỹ thuật</span>
                                        <span>{schedule.tech_staff?.name}</span>
                                    </div>
                                    {userRole === USER_ROLE.manager && (
                                        <div className={"flex justify-between pb-1"}>
                                            <span>NV bán hàng</span>
                                            <span>{schedule.sale_staff?.name}</span>
                                        </div>
                                    )}
                                    <div className={"flex justify-between pb-1"}>
                                        <span>Dịch vụ</span>
                                        <span>{schedule.service ? schedule.service?.name : schedule.course?.name}</span>
                                    </div>
                                    <div className={"flex justify-between"}>
                                        <span>Tình trạng</span>
                                        <span
                                            className={mapStatusHelper(schedule.status).color}>{mapStatusHelper(schedule.status).status}</span>
                                    </div>
                                </div>
                            </AppointmentSlot>
                        )}
                    </React.Fragment>
                })
            }
        </div>
    );
};

export default AppointmentHeaderTimeline;
