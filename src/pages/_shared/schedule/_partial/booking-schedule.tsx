import {
  Button,
  Divider,
  Group,
  Input,
  Select,
  Stepper,
  Textarea,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../../../const/user-role.const";
import { DatePicker } from "@mantine/dates";
import { useAuthUser } from "../../../../store/auth-user.state";
import DatabaseSearchSelect from "../../../../components/database-search.select";
import { AutoCompleteItemProp } from "../../../../components/auto-complete-item";
import { CustomerModel } from "../../../../model/customer.model";
import { ScheduleSchema } from "../../../../validation/schedule-model.schema";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel } from "../../../../model/user.model";
import { SlotAvailModel, SlotModal } from "../../../../model/slot.model";
import {
  createSchedule,
  getBedAndStaff,
  getDetailSchedule,
  getServicesAndCourse,
  updateStatusSchedule,
} from "../../../../services/schedule.service";
import {
  SearchServicesModel,
  ServiceModel,
} from "../../../../model/service.model";
import { formatDate } from "../../../../utilities/time.helper";
import { StaffModel } from "../../../../model/staff.model";
import { SpaBedModel } from "../../../../model/spa-bed.model";
import DialogDetailAction from "../../../../components/dialog-detail-action";
import {
  ScheduleModel,
  ScheduleStatus,
  ScheduleStatusMap,
  updateScheduleStatus,
} from "../../../../model/schedule.model";
import dayjs from "dayjs";
import { formatPrice } from "../../../../utilities/pricing.helper";

type searchFn<dataType extends object> = (
  key: string
) => Promise<AutoCompleteItemProp<dataType>[]>;

type BookingSchedule = {
  searchCustomer: searchFn<CustomerModel>;
  slotList: SlotModal[] | [];
  customerList: UserModel[];
};

const BookingSchedule = ({
  searchCustomer,
  slotList,
  customerList,
}: BookingSchedule) => {
  const userRole = useAuthUser((s) => s.user?.role);

  // State
  const [active, setActive] = useState(0);
  const [saveBtn, showSave] = useState(false);

  const [bedValue, setBedValue] = useState<string | null>(null);
  const [techStaffValue, setTechStaffValue] = useState<string | null>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<UserModel | null>(
    null
  );

  const [scheduleQueryData, setScheduleQueryData] =
    useState<ScheduleModel | null>(null);

  const [selectedService, setSelectedService] = useState<ServiceModel | null>(
    null
  );
  const [serviceList, setServiceList] = useState<any>([]);
  const [servicesCustomArr, setServicesCustomArr] = useState<any>([]);
  const [slotAvail, setSlotAvail] = useState<SlotAvailModel>({
    beds: [],
    users: [],
  });

  // Card info
  const [slotInfo, setSlotInfo] = useState<SlotModal | null>(null);
  const [staffTechInfo, setStaffTechInfo] = useState<StaffModel | null>(null);
  const [bedInfo, setBedInfo] = useState<SpaBedModel | null>(null);

  // Function
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    resetField,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<z.infer<typeof ScheduleSchema>>({
    resolver: zodResolver(ScheduleSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      status: ScheduleStatus.Waiting,
      saleStaffId: useAuthUser((s) => s.user?.id),
      serviceId: null,
      courseId: null,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.schedule_id) {
      // query data with dataId

      getDetailSchedule(Number(router.query.schedule_id)).then((rs) => {
        console.log(rs);

        // set data
        if (rs) {
          setScheduleQueryData(rs);
          setSelectedCustomer(rs.customer);
          setSelectedService(rs.service ? rs.service : rs.course!);
          setBedInfo(rs.bed);
          setSlotInfo(rs.slot);
          setStaffTechInfo(rs.tech_staff);
        }
        setActive(3);
      });
    } else {
      if (userRole !== USER_ROLE.sale_staff) {
        void router.push("/");
      }
    }
  }, [router, router.query.scheduleId, userRole]);

  const stepByStep = (step: number) => {
    switch (step) {
      case 0:
        setSelectedCustomer(null);
        setSelectedService(null);
        resetField("customerId");
        resetField("serviceId");
        resetField("courseId");
        resetField("date");
        resetField("slotId");
        resetField("bedId");
        resetField("techStaffId");
        break;
      case 1:
        resetField("slotId");
        resetField("bedId");
        resetField("techStaffId");
        break;
      case 2:
        break;
      case 3:
        break;
    }

    // set button show/hide
    setActive(step);
    if (step === 3) {
      showSave(true);
    } else {
      showSave(false);
    }
  };

  const searchService = async (
    keyword = ""
  ): Promise<AutoCompleteItemProp<SearchServicesModel>[]> => {
    if (selectedCustomer) {
      const serviceList = await getServicesAndCourse(
        selectedCustomer.id,
        keyword
      );
      setServiceList(serviceList);

      let servicesArr: any = [];

      Object.keys(serviceList).forEach((key) => {
        if (serviceList[key]) {
          servicesArr = [
            ...servicesArr,
            ...serviceList[key].map((s: ServiceModel) => {
              return {
                value: `${key}-${s.id.toString()}`,
                label: s.name,
                group: key,
                data: {
                  image: s.image ?? null,
                  description: formatPrice(s.price) + " VNĐ",
                },
              };
            }),
          ];
        }
      });

      setServicesCustomArr(servicesArr);
      return servicesArr;
    } else {
      return [];
    }
  };

  const searchBedAvail = async () => {
    setValue("bedId", null);
    setValue("techStaffId", null);

    setBedValue(null);
    setTechStaffValue(null);
    const slotAvailable = await getBedAndStaff(
      getValues().date.toString(),
      getValues().slotId
    );
    setSlotAvail(slotAvailable);
  };

  useEffect(() => {
    const slotInfo = slotList.find((s) => s.id === Number(getValues().slotId));
    setSlotInfo(slotInfo ?? null);
  }, [watch("slotId")]);

  useEffect(() => {
    const techStaff = slotAvail.users.find(
      (u) => u.id === Number(getValues().techStaffId)
    );
    setStaffTechInfo(techStaff ?? null);
  }, [watch("techStaffId")]);

  useEffect(() => {
    const bedData = slotAvail.beds.find(
      (b) => b.id === Number(getValues().bedId)
    );
    setBedInfo(bedData ?? null);
  }, [watch("bedId")]);

  const onSubmit = (payload: any) => {
    createSchedule(payload).then((rs: ScheduleModel) => {
      if (rs) {
        void router.push({
          pathname: "/sale_staff/schedule",
        });
      }
    });
  };

  const updateStatus = () => {
    const payload: updateScheduleStatus = {
      id: Number(router.query.schedule_id),
      status: getValues().status,
    };
    updateStatusSchedule(payload).then((rs) => {
      if (rs) {
        void router.push("/sale_staff/schedule");
      }
    });
  };

  const goToBill = () => {
    if (scheduleQueryData && !scheduleQueryData.isBill) {
      void router.push({
        pathname: "/sale_staff/invoice/create",
        query: {
          schedule_id: scheduleQueryData.id,
        },
      });
    }
  };

  return (
    <div className={"h-max w-full p-12"}>
      <form
        onReset={() => console.log("reset")}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className={"flex w-full flex-col gap-4"}>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="Tìm kiếm khách hàng"
              description="Tìm kiếm theo tên"
              allowStepSelect={false}
            >
              <div className={"flex w-full flex-col gap-4"}>
                <div className={"flex flex-row items-center gap-3"}>
                  <span className={"min-w-48"}>Tìm kiếm khách hàng</span>
                  <Controller
                    render={({ field }) => (
                      <DatabaseSearchSelect
                        className={"w-full"}
                        value={null}
                        displayValue={null}
                        onSearching={searchCustomer}
                        onSelected={(_id) => {
                          const id = _id ? Number(_id) : null;
                          field.onChange(id);

                          // Gán customer selected to state
                          const user = customerList.find(
                            (user) => user.id === id
                          );
                          if (user) {
                            setSelectedCustomer(user);
                          }
                        }}
                      />
                    )}
                    control={control}
                    name={"customerId"}
                  />
                </div>

                <div className={"flex flex-row items-center gap-3"}>
                  <span className={"min-w-48"}>Dịch vụ</span>
                  <DatabaseSearchSelect
                    className={"w-full"}
                    placeholder="Liệu trình/ Dịch vụ"
                    value={null}
                    displayValue={null}
                    onSearching={searchService}
                    disabled={!selectedCustomer}
                    onSelected={(_id) => {
                      const id = _id ?? null;

                      // Gán customer selected to state
                      const service = servicesCustomArr.find(
                        (s: any) => s.value === id
                      );
                      let serviceData: any = null;
                      Object.keys(serviceList).forEach((key: string) => {
                        if (service.group === key) {
                          serviceData = serviceList[key].find(
                            (s: any) =>
                              s.id ===
                              Number(
                                service.value.substring(
                                  service.value.indexOf("-") + 1
                                )
                              )
                          );
                        }
                      });

                      if (serviceData) {
                        setSelectedService({
                          ...serviceData,
                          type: service.group,
                        });
                        if (service.group === "courses") {
                          setValue("courseId", serviceData.id);
                          setValue("serviceId", null);
                        } else {
                          setValue("serviceId", serviceData.id);
                          setValue("courseId", null);
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button
                  type={"button"}
                  onClick={() => stepByStep(1)}
                  disabled={!selectedCustomer || !selectedService}
                >
                  Xác nhận khách hàng
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Step
              label="Chọn ngày"
              description="Chọn ngày khách đến"
              allowStepSelect={false}
            >
              <div className={"flex flex-row gap-3"}>
                <span className={"min-w-48"}>Chọn ngày</span>
                <div className={"flex w-full flex-col gap-4"}>
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        placeholder="Chọn ngày"
                        withAsterisk
                        onChange={(e) => {
                          field.onChange(e ? e.toISOString() : null);
                          field.onBlur();
                        }}
                        minDate={dayjs(new Date()).toDate()}
                        onBlur={field.onBlur}
                        disabled={userRole !== USER_ROLE.sale_staff}
                      />
                    )}
                    name={"date"}
                    control={control}
                  />
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button
                  type={"button"}
                  onClick={() => stepByStep(0)}
                  color={"gray"}
                >
                  Trở lại
                </Button>
                <Button type={"button"} onClick={() => stepByStep(2)}>
                  Xác nhận ngày
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Step
              label="Booking"
              description="Đặt giường và thời gian"
              allowStepSelect={false}
            >
              <div className={"flex flex-row gap-3"}>
                <span className={"min-w-48"}>Booking</span>
                <div className={"flex w-full flex-col gap-4"}>
                  <div className={"flex justify-between gap-4"}>
                    <Controller
                      render={({ field }) => (
                        <Select
                          className={"w-full"}
                          placeholder="Slot"
                          searchable
                          nothingFound="Trống"
                          data={slotList.map((slot) => {
                            return {
                              value: slot.id.toString(),
                              label: slot.name,
                            };
                          })}
                          onChange={(e) => {
                            field.onChange(e ? Number(e) : null);
                            field.onBlur();
                            void searchBedAvail();
                          }}
                          onBlur={field.onBlur}
                          disabled={userRole !== USER_ROLE.sale_staff}
                        ></Select>
                      )}
                      name={"slotId"}
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <Select
                          className={"w-full"}
                          placeholder="Giường"
                          searchable
                          nothingFound="Trống"
                          value={bedValue}
                          data={slotAvail.beds.map((bed) => {
                            return {
                              value: bed.id.toString(),
                              label: bed.name,
                            };
                          })}
                          onChange={(e) => {
                            field.onChange(e ? Number(e) : null);
                            field.onBlur();
                            setBedValue(e);
                          }}
                          onBlur={field.onBlur}
                          disabled={
                            userRole !== USER_ROLE.sale_staff ||
                            !watch("slotId")
                          }
                        ></Select>
                      )}
                      name={"bedId"}
                      control={control}
                    />
                    <Controller
                      render={({ field }) => (
                        <Select
                          className={"w-full"}
                          placeholder="NV kỹ thuật"
                          searchable
                          nothingFound="Trống"
                          value={techStaffValue}
                          data={slotAvail.users.map((user) => {
                            return {
                              value: user.id.toString(),
                              label: user.name,
                            };
                          })}
                          onChange={(e) => {
                            field.onChange(e ? Number(e) : null);
                            field.onBlur();
                            setTechStaffValue(e);
                          }}
                          onBlur={field.onBlur}
                          disabled={
                            userRole !== USER_ROLE.sale_staff ||
                            !watch("slotId")
                          }
                        ></Select>
                      )}
                      name={"techStaffId"}
                      control={control}
                    />
                  </div>
                </div>
              </div>
              <Group className={"mt-4"} position={"center"}>
                <Button
                  type={"button"}
                  onClick={() => stepByStep(1)}
                  color={"gray"}
                >
                  Trở lại
                </Button>
                <Button
                  type={"button"}
                  onClick={() => stepByStep(3)}
                  disabled={!watch("bedId") || !watch("techStaffId")}
                >
                  Xác nhận lịch
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Completed>
              <div className={"flex flex-row gap-3"}>
                <span className={"min-w-48"}>Thông tin khách hàng</span>
                <div className={"flex w-full justify-between gap-4"}>
                  {selectedCustomer && (
                    <div
                      className={
                        "w-full rounded-xl border p-4 text-sm shadow-md"
                      }
                    >
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Tên khách hàng</span>
                        <span>{selectedCustomer.name}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Giới tính</span>
                        <span>{selectedCustomer.gender}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Ngày sinh</span>
                        <span>{formatDate(selectedCustomer.dateOfBirth)}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Địa chỉ</span>
                        <span>{selectedCustomer.address}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>SĐT</span>
                        <span>{selectedCustomer.phone}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Email</span>
                        <span>{selectedCustomer.email}</span>
                      </div>
                    </div>
                  )}
                  {selectedService && (
                    <div
                      className={
                        "w-full rounded-xl border p-4 text-sm shadow-md"
                      }
                    >
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Dịch vụ</span>
                        <span>{selectedService.name}</span>
                      </div>
                      <div className={"flex justify-between gap-2"}>
                        <span className={"font-bold"}>Số buổi</span>
                        <span>
                          {selectedService.count ??
                            selectedService.timeOfUse ??
                            0}{" "}
                          / {selectedService.timeOfUse ?? 0}
                        </span>
                      </div>
                      {slotInfo && (
                        <div className={"flex justify-between gap-2"}>
                          <span className={"font-bold"}>Ca làm việc</span>
                          <span>{slotInfo.name}</span>
                        </div>
                      )}
                      {bedInfo && (
                        <div className={"flex justify-between gap-2"}>
                          <span className={"font-bold"}>Giường</span>
                          <span>{bedInfo.name}</span>
                        </div>
                      )}
                      {staffTechInfo && (
                        <div className={"flex justify-between gap-2"}>
                          <span className={"font-bold"}>NV kỹ thuật</span>
                          <span>{staffTechInfo.name}</span>
                        </div>
                      )}
                      {scheduleQueryData ? (
                        <div className={"flex justify-between gap-2"}>
                          <span className={"font-bold"}>Thời gian</span>
                          <span>{formatDate(scheduleQueryData.date)}</span>
                        </div>
                      ) : (
                        <div className={"flex justify-between gap-2"}>
                          <span className={"font-bold"}>Thời gian</span>
                          <span>{formatDate(getValues().date)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {!router.query.schedule_id && (
                <Group className={"mt-4"} position={"center"}>
                  <Button
                    type={"button"}
                    onClick={() => stepByStep(0)}
                    color={"gray"}
                  >
                    Return
                  </Button>
                </Group>
              )}
            </Stepper.Completed>
          </Stepper>
          <Divider my="xs" variant="dashed" />
          <div className={"flex flex-row items-center gap-3"}>
            <span className={"min-w-48"}>NV kinh doanh</span>
            <Input
              className={"w-full"}
              disabled
              value={useAuthUser((s) => s.user?.name)}
              {...register("saleStaffId")}
            />
          </div>
          {scheduleQueryData && (
            <div className={"flex flex-row items-center gap-3"}>
              <span className={"min-w-48"}>Trạng thái</span>
              <Controller
                render={({ field }) => (
                  <Select
                    className={"w-full"}
                    placeholder="Trạng thái lịch"
                    searchable
                    nothingFound="Trống"
                    defaultValue={String(scheduleQueryData.status)}
                    data={Object.keys(ScheduleStatusMap).map((status) => {
                      const _status =
                        ScheduleStatusMap[
                          status as keyof typeof ScheduleStatusMap
                        ];
                      return {
                        value: String(_status),
                        label: status,
                        disabled:
                          !scheduleQueryData.isBill &&
                          (_status === ScheduleStatus.Serving ||
                            _status === ScheduleStatus.Finish),
                      };
                    })}
                    onChange={(e) => {
                      field.onChange(e ? Number(e) : null);
                      field.onBlur();
                    }}
                    onBlur={field.onBlur}
                    disabled={
                      userRole !== USER_ROLE.sale_staff ||
                      !router.query.schedule_id ||
                      scheduleQueryData?.status === ScheduleStatus.Finish
                    }
                  ></Select>
                )}
                name={"status"}
                control={control}
              />
            </div>
          )}
          <div className={"flex flex-row gap-3"}>
            <span className={"min-w-48"}>Ghi chú</span>
            <Textarea
              className={"w-full"}
              autosize={false}
              rows={4}
              placeholder={"Full address"}
              disabled={
                userRole !== USER_ROLE.sale_staff || !!router.query.schedule_id
              }
              {...register("note")}
            ></Textarea>
          </div>
        </div>

        {userRole === USER_ROLE.sale_staff && saveBtn && (
          <div className={"mt-3 flex justify-end"}>
            <DialogDetailAction
              mode={"create"}
              isDirty={isDirty}
              isValid={isValid}
            />
          </div>
        )}

        {userRole === USER_ROLE.sale_staff &&
          router.query.schedule_id &&
          scheduleQueryData?.status !== ScheduleStatus.Finish && (
            <div className={"mt-3 flex justify-end gap-3"}>
              {scheduleQueryData && !scheduleQueryData.isBill && (
                <Button type={"button"} color={"red"} onClick={goToBill}>
                  Thanh toán hóa đơn
                </Button>
              )}
              <Button type={"button"} onClick={updateStatus}>
                Cập nhật
              </Button>
            </div>
          )}
      </form>
    </div>
  );
};

export default BookingSchedule;
