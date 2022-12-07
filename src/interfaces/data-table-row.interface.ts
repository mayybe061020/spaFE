export type DataRowProps<dataType> = {
  data: dataType;
  no: number;
  onClick: (data: dataType) => void;
};
