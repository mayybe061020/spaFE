import { PropsWithChildren } from "react";

type SlotProps = PropsWithChildren & {
  className?: string;
};

const AppointmentSlot = ({ children, className }: SlotProps) => {
  return <div className={`border min-h-24 p-2 ${className ?? ''}`}>{children}</div>;
};

export default AppointmentSlot;
