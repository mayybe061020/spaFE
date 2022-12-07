import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../../services/customer.service";
import { InvoiceModel } from "../../model/invoice.model";
import { getUserDetail } from "../../services/user.service";
import { getCourseDetail } from "../../services/spa-course.service";
import { UserModel } from "../../model/user.model";
import { getDetailSpaService } from "../../services/spa-service.service";
import { getDetailInvoice } from "../../services/invoice.service";
import { getDetailSchedule } from "../../services/schedule.service";
import { ScheduleModel } from "../../model/schedule.model";
import { CustomerModel } from "../../model/customer.model";
import { ServiceModel } from "../../model/service.model";

export const useCustomerDetailQuery = (
  customerId?: number,
  options?: Parameters<typeof useQuery<CustomerModel | null>>[2]
) =>
  useQuery(
    ["customer-detail", customerId],
    () => {
      if (customerId === undefined) {
        return null;
      }
      return getCustomerById(customerId);
    },
    options
  );

export const useStaffDetailQuery = <T extends UserModel>(staffId?: number) =>
  useQuery(["staff-detail", staffId], async () => {
    if (staffId === undefined) {
      return null;
    }

    return getUserDetail<T>(staffId);
  });

export const useCourseDetailQuery = (courseId?: number) =>
  useQuery(["course-detail", courseId], async () => {
    if (courseId === undefined) {
      return null;
    }

    return getCourseDetail(courseId);
  });

export const useServiceDetailQuery = (
  serviceId?: number | null,
  options?: Parameters<typeof useQuery<ServiceModel | null>>[2]
) =>
  useQuery(
    ["service-detail", serviceId],
    async () => {
      if (!serviceId) {
        return null;
      }

      return getDetailSpaService(serviceId);
    },
    options
  );

export const useInvoiceDetailQuery = (
  invoiceId?: number,
  options?: Parameters<typeof useQuery<InvoiceModel | null>>[2]
) =>
  useQuery<InvoiceModel | null>(
    ["invoice-detail", invoiceId],
    async () => {
      if (!invoiceId) {
        return null;
      }

      return getDetailInvoice(invoiceId);
    },
    options
  );

export const useScheduleDetailQuery = (
  scheduleId?: number,
  options?: Parameters<typeof useQuery<ScheduleModel | null>>[2]
) =>
  useQuery<ScheduleModel | null>(
    ["schedule-detail", scheduleId],
    async () => {
      if (!scheduleId) {
        return null;
      }

      return getDetailSchedule(scheduleId);
    },
    options
  );
