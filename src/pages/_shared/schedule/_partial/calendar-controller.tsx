import { DatePicker } from "@mantine/dates";
import { Button } from "@mantine/core";

type calendarProps = {
  dateData?: Date;
  onChange?: (selectedDate: Date) => void;
};

const CalendarController = ({ dateData, onChange }: calendarProps) => {
  return (
    <div className="flex items-center gap-4">
      <DatePicker
        placeholder="Pick date"
        label="Lịch hẹn tại ngày"
        value={dateData}
        onChange={onChange}
        withAsterisk
      />
      <Button
        className={"mt-6"}
        onClick={() => onChange && onChange(new Date())}
      >
        Hôm nay
      </Button>
    </div>
  );
};

export default CalendarController;
