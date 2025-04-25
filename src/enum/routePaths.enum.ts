export enum RoutePathEnum {
  NONE = "",
  HOME = "/",

  FORGET_PASSWORD = "/auth/reset-password",
  ADMIN_LOGIN = "/auth/login",

  DASHBOARD = "/admin",
  PROFILE = "/profile",

  ERROR_401 = "/401",
  ERROR_403 = "/403",
  ERROR_404 = "/404",
  ERROR_500 = "/500",
  ENVIRONMENT = "ENVIRONMENT",

  GEO_POLITICAL = "/confidential/geo-political",
  GEO_POLITICAL_UPLOAD_REPORT = "/confidential/geo-political/upload-report",


  GENERATED_REPORT = "/view-report/generated-report",
  GENERATED_REPORT_UPLOAD_REPORT = "/view-report/generated-report/upload-report",

  ADMIN_APPROVER = "/admin/approver",
  ADMIN_EXECUTOR = "/admin/executor",
}

export default RoutePathEnum;
