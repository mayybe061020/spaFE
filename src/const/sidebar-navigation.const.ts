import { NavLinkItemProp } from "../interfaces/nav-item.interface";
import { USER_ROLE } from "./user-role.const";

// sidebar link config for admin.
export const branchAdminConfig: NavLinkItemProp[] = [
  { href: `/${USER_ROLE.admin}/manage-branches`, label: "Quản Lý Chi Nhánh" },
  { href: `/${USER_ROLE.admin}/manage-manager`, label: "Quản Lý Tài Khoản" },
  {
    href: `/${USER_ROLE.admin}/manage-supplier`,
    label: "Quản Lý Nhà Cung Cấp",
  },
  { href: `/${USER_ROLE.admin}/manage-products`, label: "Quản Lý Sản Phẩm" },
  { href: `/${USER_ROLE.admin}/manage-services`, label: "Quản Lý Dịch Vụ" },
  {
    href: `/${USER_ROLE.admin}/manage-treatment-courses`,
    label: "Quản Lý Liệu Trình",
  },
  { href: `/${USER_ROLE.admin}/reports`, label: "Báo Cáo" },
];

export const branchManagerConfig: NavLinkItemProp[] = [
  {
    label: "Quản Lý Khách Hàng",
    href: `/${USER_ROLE.manager}/manage-customer`,
  },
  {
    label: "Quản Lý Lịch Làm Việc",
    nested: [
      {
        href: `/${USER_ROLE.manager}/schedule`,
        label: "Quản Lý Cuộc Hẹn",
      },
    ],
  },
  {
    href: `/${USER_ROLE.manager}/manage-invoice`,
    label: "Quản Lý Hoá Đơn",
  },
  {
    href: `/${USER_ROLE.manager}/manage-staff`,
    label: "Quản lý nhân viên",
  },
  {
    isDivider: true,
  },
  {
    href: `/${USER_ROLE.manager}/manage-course`,
    label: "Danh sách Liệu Trình",
  },
  {
    href: `/${USER_ROLE.manager}/manage-service`,
    label: "Danh sách Dịch Vụ",
  },
  {
    href: `/${USER_ROLE.manager}/manage-product`,
    label: "Danh sách Sản Phẩm",
  },
];

export const branchSaleStaffConfig: NavLinkItemProp[] = [
  {
    href: `/${USER_ROLE.sale_staff}/schedule`,
    label: "Quản Lý Cuộc Hẹn",
  },
  {
    href: `/${USER_ROLE.sale_staff}/invoice`,
    label: "Quản Lý Hoá Đơn",
  },
  {
    href: `/${USER_ROLE.sale_staff}/customer`,
    label: "Quản Lý Khách Hàng",
  },
  {
    isDivider: true,
  },
  {
    href: `/${USER_ROLE.sale_staff}/course`,
    label: "Danh sách Liệu Trình",
  },
  {
    href: `/${USER_ROLE.sale_staff}/service`,
    label: "Danh sách Dịch Vụ",
  },
  {
    href: `/${USER_ROLE.sale_staff}/product`,
    label: "Danh sách Sản Phẩm",
  },
];

export const branchTechStaffConfig: NavLinkItemProp[] = [
  {
    href: `/${USER_ROLE.technical_staff}/schedule`,
    label: "Lịch Hẹn",
  },
  {
    isDivider: true,
  },
  {
    href: `/${USER_ROLE.technical_staff}/course`,
    label: "Danh sách Liệu Trình",
  },
  {
    href: `/${USER_ROLE.technical_staff}/service`,
    label: "Danh sách Dịch Vụ",
  },
  {
    href: `/${USER_ROLE.technical_staff}/product`,
    label: "Danh sách Sản Phẩm",
  },
];
