import create from "zustand";
import { NavLinkItemProp } from "../interfaces/nav-item.interface";
import { USER_ROLE } from "../const/user-role.const";
import {
  branchAdminConfig,
  branchManagerConfig,
  branchSaleStaffConfig,
  branchTechStaffConfig,
} from "../const/sidebar-navigation.const";

type SidebarNavState = {
  config: NavLinkItemProp[];
  // update the state with the sidebar config for the corresponding role.
  updateByRole: (userRole?: USER_ROLE) => void;
};

function decidingConfigByRole(userRole: USER_ROLE) {
  switch (userRole) {
    case USER_ROLE.admin:
      return branchAdminConfig;
    case USER_ROLE.manager:
      return branchManagerConfig;
    case USER_ROLE.sale_staff:
      return branchSaleStaffConfig;
    case USER_ROLE.technical_staff:
      return branchTechStaffConfig;
  }
  console.warn(
    "Navigation config for this role cannot be found. Role:",
    userRole
  );
  return [];
}

const useSidebarNav = create<SidebarNavState>((set) => ({
  config: [],
  updateByRole: (role) =>
    set(() => ({ config: role ? decidingConfigByRole(role) : [] })),
}));

export default useSidebarNav;
