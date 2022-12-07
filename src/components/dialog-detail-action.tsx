import { Button } from "@mantine/core";
import { FC } from "react";

type DialogDetailActionProps = {
  mode: "view" | "create";
  readonly?: boolean;
  isDirty: boolean;
  isValid: boolean;
};

const DialogDetailAction: FC<DialogDetailActionProps> = ({
  mode,
  isDirty,
  isValid,
  readonly,
}) => {
  return mode === "view" ? (
    isDirty ? (
      <div className={"flex space-x-2"}>
        <Button variant={"subtle"} type={"reset"}>
          Hủy
        </Button>
        {!readonly && (
          <Button
            sx={{ width: "160px" }}
            color={"orange"}
            type={"submit"}
            disabled={!isValid}
          >
            Cập Nhật
          </Button>
        )}
      </div>
    ) : (
      <Button type={"reset"}>Hủy</Button>
    )
  ) : (
    <div className="flex space-x-2">
      <Button variant={"subtle"} type={"reset"}>
        Hủy
      </Button>
      {!readonly && (
        <Button
          sx={{ width: "160px" }}
          type={"submit"}
          color={"teal"}
          disabled={!isValid}
        >
          Tạo
        </Button>
      )}
    </div>
  );
};

export default DialogDetailAction;
