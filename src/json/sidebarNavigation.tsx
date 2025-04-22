import { type Navigation } from "@toolpad/core/AppProvider";
import { MuiIcons } from "@/components/common/icon";

export const NAVIGATION: Navigation = [
  {
    segment: "admin",
    title: "Dashboard",
    icon: <MuiIcons.DashboardIcon />,
  },
  {
    segment: "admin/plugin",
    title: "Plugin",
    icon: <MuiIcons.ExtensionIcon />,
    children: [
      {
        segment: "available-license",
        title: "Available license",
        icon: <MuiIcons.VpnKeyIcon />,
      },
      {
        segment: "agent-installed",
        title: "Agent installed",
        icon: <MuiIcons.ComputerIcon />,
      },
      {
        segment: "allocated-license",
        title: "Allocated license",
        icon: <MuiIcons.AssignmentIcon />,
      },
      {
        segment: "all-license-report",
        title: "All license report",
        icon: <MuiIcons.AssessmentIcon />,
      },
    ],
  },
  {
    segment: "admin/phishing-mails",
    title: "Phishing mails",
    icon: <MuiIcons.EmailIcon />,
  },
  {
    segment: "admin/disputes",
    title: "Disputes",
    icon: <MuiIcons.GavelIcon />,
  },
  {
    segment: "admin/report",
    title: "Report",
    icon: <MuiIcons.AssessmentIcon />,
  },
  {
    segment: "admin/sandbox",
    title: "Sandbox",
    icon: <MuiIcons.SecurityIcon />,
    children: [
      {
        segment: "running-sandbox",
        title: "Running Sandbox",
        icon: <MuiIcons.PlayArrowIcon />,
      },
      {
        segment: "completed-sandbox",
        title: "Completed Sandbox",
        icon: <MuiIcons.DoneIcon />,
      },
    ],
  },
  {
    segment: "admin/quarantine",
    title: "Quarantine",
    icon: <MuiIcons.FolderSpecialIcon />,
  },
  {
    segment: "admin/rogue-db",
    title: "RogueDB",
    icon: <MuiIcons.StorageIcon />,
    children: [
      {
        segment: "urls",
        title: "Urls",
        icon: <MuiIcons.LinkIcon />,
      },
      {
        segment: "domains",
        title: "Domains",
        icon: <MuiIcons.DomainIcon />,
      },
      {
        segment: "mails",
        title: "Mails",
        icon: <MuiIcons.MailIcon />,
      },
    ],
  },
  {
    segment: "admin/logs-report",
    title: "Logs report",
    icon: <MuiIcons.BugReportIcon />,
    children: [
      {
        segment: "exception-logs",
        title: "Exception Logs",
        icon: <MuiIcons.WarningIcon />,
      },
      {
        segment: "error-logs",
        title: "Error Logs",
        icon: <MuiIcons.ErrorIcon />,
      },
    ],
  },
  {
    segment: "profile",
    title: "Profile",
    icon: <MuiIcons.PersonIcon />,
  },
];
