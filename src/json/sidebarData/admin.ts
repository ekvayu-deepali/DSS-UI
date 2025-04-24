import { IMenuItem } from "@/interfaces";
import {
  faDashboard,
  faUserShield,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";


// Admin menu items
export const adminMenuItems: IMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: faDashboard,
  },
  {
    title: "Approver",
    path: "/approver",
    icon: faUserShield,
  },
  {
    title: "Executor",
    path: "/executor",
    icon: faUsers,
  },
];
