import { AppPageInterface } from "../../../interfaces/app-page.interface";
import { useDialogDetailRow } from "../../../hooks/modal-detail-row.hook";
import { CourseModel } from "../../../model/course.model";
import { ServiceModel } from "../../../model/service.model";
import usePaginationHook, { getItemNo } from "../../../hooks/pagination.hook";
import { useListCourseQuery } from "../../../query/model-list";
import { Divider, Input, Pagination, Table } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import CourseHeaderTable from "../../admin/manage-treatment-courses/_partial/course-header.table";
import RowPlaceholderTable from "../../../components/row-placeholder.table";
import CourseRowTable from "../../admin/manage-treatment-courses/_partial/course-row.table";
import CourseDetailDialog from "../../admin/manage-treatment-courses/_course-detail.dialog";
import { USER_ROLE } from "../../../const/user-role.const";

const Index: AppPageInterface = () => {
  const { modal, openModal, resetModal } =
    useDialogDetailRow<CourseModel<ServiceModel>>();
  const {
    pageSize,
    currentPage,
    totalRecord,
    update: updatePagination,
  } = usePaginationHook();

  const { data: course, isLoading } = useListCourseQuery(
    currentPage,
    updatePagination
  );

  return (
    <div className={"flex min-h-full flex-col space-y-4 p-4"}>
      <div className="flex justify-end space-x-2">
        <Input
          icon={<IconSearch />}
          placeholder={"tên liệu trình..."}
          type={"text"}
          className="w-56"
        />
      </div>

      <Divider my={8} />

      <div className="flex-1">
        <Table className={"table-fixed"} withBorder highlightOnHover striped>
          <CourseHeaderTable />

          <tbody>
            {isLoading ? (
              <RowPlaceholderTable
                colSpan={7}
                className={"min-h-12"}
                message={
                  <div className="text-center font-semibold text-gray-500">
                    Loading...
                  </div>
                }
              />
            ) : (
              course &&
              course.data.map((s, i) => (
                <CourseRowTable
                  onClick={(service) => openModal("view", service)}
                  key={s.id}
                  data={s}
                  no={getItemNo(i, currentPage, pageSize)}
                />
              ))
            )}
          </tbody>
        </Table>
        {modal && (
          <CourseDetailDialog
            mode={modal.mode as never} // silent the TS-error
            data={modal.data}
            opened={!!modal}
            readonly={true}
            onClosed={() => resetModal()}
          />
        )}
      </div>

      <Divider my={8} />

      <Pagination
        position={"center"}
        page={currentPage}
        onChange={(page) => updatePagination({ newPage: page })}
        total={totalRecord / pageSize}
      />
    </div>
  );
};

Index.guarded = USER_ROLE.manager;

export default Index;
