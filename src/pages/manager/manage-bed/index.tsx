import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../const/user-role.const";
import { Divider, Text } from "@mantine/core";
import BedInput from "./_partial/bed-input";
import { useListBedQuery } from "../../../query/model-list";
import { useMutation } from "@tanstack/react-query";
import {
  SpaBedCreateEntity,
  SpaBedUpdateEntity,
} from "../../../model/spa-bed.model";
import {
  createSpaBed,
  deleteSpaBed,
  updateSpaBed,
} from "../../../services/spa-bed.service";
import {
  ShowFailedCreate,
  ShowFailedUpdate,
  ShowSuccessCreate,
  ShowSuccessUpdate,
} from "../../../utilities/show-notification";
import { IconArrowUp } from "@tabler/icons";

const ManageBed: AppPageInterface = () => {
  const { data: listBeds, isLoading, refetch } = useListBedQuery();

  const createMutation = useMutation(
    ["create-bed"],
    (data: SpaBedCreateEntity) => createSpaBed(data),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessCreate();
          refetch();
          return;
        }
        ShowFailedCreate();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedCreate();
      },
    }
  );

  const updateMutation = useMutation(
    ["update-bed"],
    (data: SpaBedUpdateEntity) => updateSpaBed(data),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessUpdate();
          refetch();
          return;
        }
        ShowFailedUpdate();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedUpdate();
      },
    }
  );

  // TODO: delete.
  const deleteMutation = useMutation(
    ["delete-bed"],
    (data: { id: number }) => deleteSpaBed(data.id),
    {
      onSuccess: (d) => {
        if (d) {
          ShowSuccessUpdate();
          refetch();
          return;
        }
        ShowFailedUpdate();
      },
      onError: (e) => {
        console.error(e);
        ShowFailedUpdate();
      },
    }
  );

  return (
    <div className={"p-4"}>
      <div className="mx-auto flex w-11/12 max-w-[512px] flex-col space-y-4">
        <h1 className={"text-center text-lg font-semibold capitalize"}>
          Các giường đã đăng kí
        </h1>

        <Divider my={8} />

        <div className="flex flex-col space-y-2">
          {(isLoading ||
            createMutation.isLoading ||
            updateMutation.isLoading) && (
            <span className={"my-4 font-semibold text-gray-400"}>
              loading...
            </span>
          )}
          {(listBeds ?? []).map((b, i) => (
            <BedInput
              rowIndex={`${i + 1}.`}
              key={`${b.name}`}
              data={b}
              onChanged={updateMutation.mutate}
              isResettable
            />
          ))}
        </div>

        <Divider my={8} />

        <div className="flex space-x-2">
          {!(
            isLoading ||
            createMutation.isLoading ||
            updateMutation.isLoading
          ) && (
            <BedInput
              rowIndex={
                <Text weight={"bold"} color={"teal"}>
                  Mới
                </Text>
              }
              submitIcon={<IconArrowUp />}
              onChanged={createMutation.mutate}
              isResettable
            />
          )}
        </div>
      </div>
    </div>
  );
};

ManageBed.guarded = USER_ROLE.manager;

export default ManageBed;
