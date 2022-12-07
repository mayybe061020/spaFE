import AppointmentColTimeline from "./appointment-col.timeline";
import {SpaBedModel} from "../../model/spa-bed.model";
import {FC} from "react";

type AppointmentTimelineProps = {
    bedList: SpaBedModel[];
};

const AppointmentTimeline: FC<AppointmentTimelineProps> = ({bedList}) => {
    return (
        <div className="flex flex-1">
            {bedList.map((bed, i) => {
                return (
                    <AppointmentColTimeline key={i} bedInformation={{name: bed.name}}/>
                );
            })}
        </div>
    );
};

export default AppointmentTimeline;
