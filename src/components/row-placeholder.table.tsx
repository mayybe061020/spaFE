import React, { FC } from "react";

type RecordSpanType = {
  colSpan?: number;
  rowSpan?: number;
  message: React.ReactNode;
  tdClassName?: string;
  className?: string;
};

/**
 * Dummy table row. Useful when you want to have a placeholder
 * in a table while API is pending.
 * @param className
 * @param tdClassName
 * @param colSpan
 * @param rowSpan
 * @param message
 * @constructor
 */
const RowPlaceholderTable: FC<RecordSpanType> = ({
  className,
  tdClassName,
  colSpan,
  rowSpan,
  message,
}) => {
  return (
    <tr className={className}>
      <td className={tdClassName} rowSpan={rowSpan} colSpan={colSpan}>
        {message}
      </td>
    </tr>
  );
};

export default RowPlaceholderTable;
