import { useQuery } from "@tanstack/react-query";
import { CourseModel } from "../../model/course.model";
import usePaginationHook from "../../hooks/pagination.hook";
import {
  PaginatedResponse,
  SearchParamUrl,
} from "../../interfaces/api.interface";
import { BranchModel } from "../../model/branch.model";
import { ManagerModel } from "../../model/manager.model";
import { getAllBranch } from "../../services/branch.service";
import { getAllAccount } from "../../services/user.service";
import { USER_ROLE } from "../../const/user-role.const";
import { UserModel } from "../../model/user.model";
import { SupplierModel } from "../../model/supplier.model";
import { getListSupplier } from "../../services/supplier.service";
import { InvoiceModel } from "../../model/invoice.model";
import { ProductModel } from "../../model/product.model";
import { getListProduct } from "../../services/product.service";
import { ServiceModel } from "../../model/service.model";
import { getListSpaServices } from "../../services/spa-service.service";
import { getListSpaCourses } from "../../services/spa-course.service";
import { getAllCustomers } from "../../services/customer.service";
import { getListInvoices } from "../../services/invoice.service";
import { getListSpaBed } from "../../services/spa-bed.service";
import { SpaBedModel } from "../../model/spa-bed.model";

type fnUpdatePagination = ReturnType<typeof usePaginationHook>["update"];

export const useListCourseQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<CourseModel<ServiceModel>>>(
    ["list-course", currentPage, options],
    () =>
      getListSpaCourses(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (d) => updatePagination({ total: d.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListServiceQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<ServiceModel>>(
    ["list-service", currentPage, options],
    () =>
      getListSpaServices(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListProductQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<ProductModel<SupplierModel>>>(
    ["list-product", currentPage, options],
    () => getListProduct(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListBranchQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<BranchModel<ManagerModel>>>(
    ["list-branch", currentPage, options],
    () => getAllBranch(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (res) => updatePagination({ total: res.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListUserQuery = <T extends UserModel>(
  type: USER_ROLE | "staff",
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<T>>(
    [`list-${type}`, currentPage, options],
    () =>
      getAllAccount<T>(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListSupplierQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<SupplierModel>>(
    ["list-supplier", currentPage, options],
    () => getListSupplier(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListCustomerQuery = (
  currentPage: number,
  updatePagination?: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery(
    ["list-customer", currentPage, options],
    () => getAllCustomers(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (data) =>
        updatePagination && updatePagination({ total: data.totalElement }),
      onError: () =>
        updatePagination && updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListInvoiceQuery = (
  currentPage: number,
  updatePagination: fnUpdatePagination,
  options?: {
    pageSize?: number;
    searchQuery?: SearchParamUrl;
  }
) =>
  useQuery<PaginatedResponse<InvoiceModel>>(
    ["list-invoice", currentPage, options],
    () => getListInvoices(currentPage, options?.pageSize, options?.searchQuery),
    {
      onSuccess: (data) => updatePagination({ total: data.totalElement }),
      onError: () => updatePagination({ total: 0, newPage: 1 }),
    }
  );

export const useListBedQuery = () =>
  useQuery<SpaBedModel[]>(["list-bed"], () => getListSpaBed());
