import {StaffModel} from "./staff.model";
import {SpaBedModel} from "./spa-bed.model";

export type SlotModal = {
    id: number;
    name: string;
    timeline: string
}

export type SlotAvailModel = {
    beds: SpaBedModel[],
    users: StaffModel[]
}
