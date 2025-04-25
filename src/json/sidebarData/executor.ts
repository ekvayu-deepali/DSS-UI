import { IMenuItem } from "@/interfaces";
import {
  faGlobe,
  faFileLines,
  faDashboard,
  faFile,
  faShareNodes,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

export const executorMenuItems: IMenuItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: faDashboard,
  },
  {
    title: "Confidential",
    icon: faShieldAlt,
    submenu: [
      {
        title: "Geo Political",
        path: "/confidential/geo-political",
        icon: faGlobe,
      },
      {
        title: "Metrology",
        path: "/confidential/metrology",
        icon: faFileLines,
      },
      {
        title: "Miscellaneous",
        path: "/confidential/miscellaneous",
        icon: faFileLines,
      },
      {
        title: "Organization and Management",
        path: "/confidential/organization-and-management",
        icon: faFileLines,
      },
      {
        title: "Training",
        path: "/confidential/training",
        icon: faFileLines,
      },
    ],
  },

  {
    title: "OSINT",
    icon: faShareNodes,
    submenu: [
      {
        title: "Geo Political",
        path: "/osint/geo-political",
        icon: faGlobe,
      },
      {
        title: "Metrology",
        path: "/osint/metrology",
        icon: faFileLines,
      },
      {
        title: "Miscellaneous",
        path: "/osint/miscellaneous",
        icon: faFileLines,
      },
      {
        title: "Organization and Management",
        path: "/osint/organization-and-management",
        icon: faFileLines,
      },
      {
        title: "Training",
        path: "/osint/training",
        icon: faFileLines,
      },
    ],
  },
  {
    title: "Report",
    icon: faFile,
    submenu: [
      {
        title: "Merge Report",
        path: "/report/merge-report",
        icon: faGlobe,
      },
      {
        title: "Generated Report",
        path: "/report/generated-report",
        icon: faFileLines,
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: faFileLines,
  },

];
