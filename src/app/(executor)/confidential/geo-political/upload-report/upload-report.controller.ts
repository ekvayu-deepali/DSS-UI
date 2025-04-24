import { useMemo } from "react";

import { RoutePathEnum } from "@/enum";
import { IBreadcrumbDisplay } from "@/components";

interface useUploadReportController {
  getters: {
    breadcrumbs: IBreadcrumbDisplay;
  };
}

export const useUploadReportController = () => {
  const breadcrumbs = useMemo(
    () => [
      {
        name: "Dashboard",
        path: RoutePathEnum.DASHBOARD,
        forwardParam: false,
      },
      {
        name: "Geo Political",
        path: RoutePathEnum.GEO_POLITICAL,
        forwardParam: false,
      },
      {
        name: "Upload Report",
        path: RoutePathEnum.NONE,
        forwardParam: true,
      },
    ],
    []
  );

  return {
    getters: {
      breadcrumbs,
    },
  };
};
