import { Text } from "@mantine/core";

type AppointmentBedProps = {
  bedInformation: {
    name: string;
  };
};

const AppointmentColTimeline = ({ bedInformation }: AppointmentBedProps) => {
  return (
    <div className="flex h-full min-w-64 flex-col">
      <div className="flex h-16 items-center justify-center border-x bg-gray-100 font-semibold">
        <Text>{bedInformation.name}</Text>
      </div>
    </div>
  );
};

export default AppointmentColTimeline;
