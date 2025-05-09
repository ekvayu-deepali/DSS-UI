import { IMenuItem } from "@/interfaces";
import {
  faGlobe,
  faFileLines,
  faDashboard,
  faFile,
  faShareNodes,
  faShieldAlt,
  faCloudSunRain,
  faBoxArchive,
  faSitemap,
  faGraduationCap,
  faBrain,
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
        icon: faCloudSunRain,
      },
      {
        title: "Miscellaneous",
        path: "/confidential/miscellaneous",
        icon: faBoxArchive,
      },
      {
        title: "Organisation and Management",
        path: "/confidential/organisation-and-management",
        icon: faSitemap,
      },
      {
        title: "Training",
        path: "/confidential/training",
        icon: faGraduationCap,
      },
      {
        title: "Intelligence",
        path: "/confidential/intelligence",
        icon: faBrain,
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
        icon: faCloudSunRain,
      },
      {
        title: "Miscellaneous",
        path: "/osint/miscellaneous",
        icon: faBoxArchive,
      },
      {
        title: "Organisation and Management",
        path: "/osint/organisation-and-management",
        icon: faSitemap,
      },
      {
        title: "Training",
        path: "/osint/training",
        icon: faGraduationCap,
      },
      {
        title: "Intelligence",
        path: "/osint/intelligence",
        icon: faBrain,
      },
    ],
  },
  {
    title: "Report",
    icon: faFile,
    submenu: [
      {
        title: "Monthly Report",
        path: "/report/monthly-report",
        icon: faFileLines,
      },
      {
        title: "Consolidated Report",
        path: "/report/consolidated-report",
        icon: faFileLines,
      },
      {
        title: "Merge Report",
        path: "/report/merge-report",
        icon: faGlobe,
      },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: faFileLines,
  },
];
