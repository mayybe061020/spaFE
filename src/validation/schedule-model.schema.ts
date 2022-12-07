import {z} from "zod";
import {ScheduleStatus} from "../model/schedule.model";

export const ScheduleSchema = z.object({
    date: z.string(),
    bedId: z.number().nullable(),
    slotId: z.number(),
    saleStaffId: z.number(),
    techStaffId: z.number().nullable(),
    customerId: z.number(),
    courseId: z.number().nullable(),
    serviceId: z.number().nullable(),
    status: z.nativeEnum(ScheduleStatus),
    note: z.string().nullable(),
})
