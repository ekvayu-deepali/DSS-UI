import {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { useSnackbar } from "notistack";
import { SelectChangeEvent } from "@mui/material";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";
import { IBreadcrumbDisplay } from "@/components/common/breadcrumb/interface";
import { RoutePathEnum } from "@/enum";
import { DateTime } from "luxon";
import useMeasure from "react-use-measure";

// Report categories and subcategories based on sidebar structure
export const REPORT_CATEGORIES = [
  { value: "confidential", label: "Confidential" },
  { value: "osint", label: "OSINT" },
];

export const REPORT_SUBCATEGORIES = {
  confidential: [
    { value: "geo-political", label: "Geo Political" },
    { value: "metrology", label: "Metrology" },
    { value: "miscellaneous", label: "Miscellaneous" },
    {
      value: "organisation-and-management",
      label: "Organisation and Management",
    },
    { value: "training", label: "Training" },
    { value: "intelligence", label: "Intelligence" },
  ],
  osint: [
    { value: "geo-political", label: "Geo Political" },
    { value: "metrology", label: "Metrology" },
    { value: "miscellaneous", label: "Miscellaneous" },
    {
      value: "organisation-and-management",
      label: "Organisation and Management",
    },
    { value: "training", label: "Training" },
    { value: "intelligence", label: "Intelligence" },
  ],
};

// Processing queue item structure
export interface ProcessingItem {
  id: string;
  name: string;
  status: "completed" | "processing" | "failed";
  time: string;
}

interface IMergeReportControllerResponse {
  getters: {
    documentName: string;
    documentCategory: string;
    keywords: string;
    topic: string;
    breadcrumbs: IBreadcrumbDisplay[];
    reportCategory: string;
    reportSubcategory: string;
    availableSubcategories: { value: string; label: string }[];
    selectedMonth: DateTime | null;
    showReports: boolean;
    processingQueue: ProcessingItem[];
    height: number;
    // Combined report states
    confidentialSelected: boolean;
    osintSelected: boolean;
    confidentialSubcategory: string;
    osintSubcategory: string;
    availableConfidentialSubcategories: { value: string; label: string }[];
    availableOsintSubcategories: { value: string; label: string }[];
    showCombinedReports: boolean;
    combinedProcessingQueue: ProcessingItem[];
  };
  handlers: {
    onDocumentNameChange: (event: ITextInputFieldData) => void;
    onDocumentCategoryChange: (event: ITextInputFieldData) => void;
    onKeywordsChange: (event: ITextInputFieldData) => void;
    onTopicChange: (event: ITextInputFieldData) => void;
    handleSubmit: () => Promise<void>;
    handleReportCategoryChange: (event: SelectChangeEvent<string>) => void;
    handleReportSubcategoryChange: (event: SelectChangeEvent<string>) => void;
    handleMonthChange: (date: DateTime | null) => void;
    handleProcessingItemClick: (id: string) => void;
    // Combined report handlers
    handleConfidentialCheckboxChange: (checked: boolean) => void;
    handleOsintCheckboxChange: (checked: boolean) => void;
    handleConfidentialSubcategoryChange: (event: SelectChangeEvent<string>) => void;
    handleOsintSubcategoryChange: (event: SelectChangeEvent<string>) => void;
    handleCombinedSubmit: () => Promise<void>;
  };
  ref: {
    documentNameRef: RefObject<ITextInputFieldRef | null>;
    documentCategoryRef: RefObject<ITextInputFieldRef | null>;
    keywordsRef: RefObject<ITextInputFieldRef | null>;
    topicRef: RefObject<ITextInputFieldRef | null>;
    dashboardRef: RefObject<HTMLDivElement| null>;
  };
}

export const useMergeReportController = (): IMergeReportControllerResponse => {
  const { enqueueSnackbar } = useSnackbar();
  const [ref, { height }] = useMeasure();

  // States
  const [documentName, setDocumentName] = useState<string>("");
  const [documentCategory, setDocumentCategory] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [reportCategory, setReportCategory] = useState<string>("confidential");
  const [reportSubcategory, setReportSubcategory] = useState<string>("");
  const [availableSubcategories, setAvailableSubcategories] = useState(
    REPORT_SUBCATEGORIES.confidential
  );
  const [selectedMonth, setSelectedMonth] = useState<DateTime | null>(
    DateTime.now()
  );
  const [showReports, setShowReports] = useState<boolean>(false);
  const [processingQueue, setProcessingQueue] = useState<ProcessingItem[]>([]);

  // Combined report states
  const [confidentialSelected, setConfidentialSelected] = useState<boolean>(false);
  const [osintSelected, setOsintSelected] = useState<boolean>(false);
  const [confidentialSubcategory, setConfidentialSubcategory] = useState<string>("");
  const [osintSubcategory, setOsintSubcategory] = useState<string>("");
  const [availableConfidentialSubcategories, setAvailableConfidentialSubcategories] = useState(
    REPORT_SUBCATEGORIES.confidential
  );
  const [availableOsintSubcategories, setAvailableOsintSubcategories] = useState(
    REPORT_SUBCATEGORIES.osint
  );
  const [showCombinedReports, setShowCombinedReports] = useState<boolean>(false);
  const [combinedProcessingQueue, setCombinedProcessingQueue] = useState<ProcessingItem[]>([]);

  // Update subcategories when report category changes
  useEffect(() => {
    if (reportCategory) {
      setAvailableSubcategories(
        REPORT_SUBCATEGORIES[
          reportCategory as keyof typeof REPORT_SUBCATEGORIES
        ] || []
      );
      setReportSubcategory(""); // Reset subcategory when category changes
      setShowReports(false); // Hide reports when category changes
    }
  }, [reportCategory]);

  // Refs
  const documentNameRef = useRef<ITextInputFieldRef | null>(null);
  const documentCategoryRef = useRef<ITextInputFieldRef | null>(null);
  const keywordsRef = useRef<ITextInputFieldRef | null>(null);
  const topicRef = useRef<ITextInputFieldRef | null>(null);
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  // Breadcrumbs
  const breadcrumbs: IBreadcrumbDisplay[] = useMemo(
    () => [
      {
        name: "Dashboard",
        path: RoutePathEnum.DASHBOARD,
        forwardParam: false,
      },
      {
        name: "Report",
        path: RoutePathEnum.GENERATED_REPORT,
        forwardParam: false,
      },
      {
        name: "Merge Report",
        path: RoutePathEnum.NONE,
        forwardParam: true,
      },
    ],
    []
  );

  const onDocumentNameChange = useCallback(
    (event: ITextInputFieldData): void => {
      setDocumentName(event.value);
    },
    []
  );

  const onDocumentCategoryChange = useCallback(
    (event: ITextInputFieldData): void => {
      setDocumentCategory(event.value);
    },
    []
  );

  const onKeywordsChange = useCallback((event: ITextInputFieldData): void => {
    setKeywords(event.value);
  }, []);

  const onTopicChange = useCallback((event: ITextInputFieldData): void => {
    setTopic(event.value);
  }, []);

  const handleReportCategoryChange = useCallback(
    (event: SelectChangeEvent<string>): void => {
      setReportCategory(event.target.value);
    },
    []
  );

  const handleReportSubcategoryChange = useCallback(
    (event: SelectChangeEvent<string>): void => {
      setReportSubcategory(event.target.value);
    },
    []
  );

  const handleMonthChange = useCallback((date: DateTime | null): void => {
    setSelectedMonth(date);
  }, []);

  // Handler for processing item click
  const handleProcessingItemClick = useCallback((id: string): void => {
    console.log(`Processing item clicked: ${id}`);
    // In a real application, you might navigate to a details page or open a modal
    enqueueSnackbar(`Viewing details for document ${id}`, { variant: "info" });
  }, [enqueueSnackbar]);

  // Combined report handlers
  const handleConfidentialCheckboxChange = useCallback((checked: boolean): void => {
    setConfidentialSelected(checked);
    if (!checked) {
      setConfidentialSubcategory("");
    }
  }, []);

  const handleOsintCheckboxChange = useCallback((checked: boolean): void => {
    setOsintSelected(checked);
    if (!checked) {
      setOsintSubcategory("");
    }
  }, []);

  const handleConfidentialSubcategoryChange = useCallback(
    (event: SelectChangeEvent<string>): void => {
      setConfidentialSubcategory(event.target.value);
    },
    []
  );

  const handleOsintSubcategoryChange = useCallback(
    (event: SelectChangeEvent<string>): void => {
      setOsintSubcategory(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      // Validate required fields
      if (!reportCategory || !reportSubcategory || !selectedMonth) {
        enqueueSnackbar("Please select all required fields", { variant: "warning" });
        return;
      }

      console.log({
        documentName,
        documentCategory,
        keywords,
        topic,
        reportCategory,
        reportSubcategory,
        selectedMonth: selectedMonth ? selectedMonth.toFormat("MMMM yyyy") : null,
      });

      // Generate sample processing queue data based on selected filters
      const monthStr = selectedMonth ? selectedMonth.toFormat('MMMM') : '';
      const yearStr = selectedMonth ? selectedMonth.toFormat('yyyy') : '';

      // Generate dynamic processing queue based on selections
      const newProcessingQueue: ProcessingItem[] = [
        {
          id: "1",
          name: `${reportCategory === "confidential" ? "Confidential" : "OSINT"} - ${reportSubcategory.replace(/-/g, " ")} Report (${monthStr} ${yearStr})`,
          status: "completed",
          time: "2 hours ago",
        },
        {
          id: "2",
          name: `${reportSubcategory.replace(/-/g, " ")} Analysis Document`,
          status: "completed",
          time: "15 minutes ago",
        },
        {
          id: "3",
          name: `${monthStr} ${yearStr} Summary Report`,
          status: "completed",
          time: "1 day ago",
        },
        {
          id: "4",
          name: `${reportSubcategory.replace(/-/g, " ")} Data Collection`,
          status: "completed",
          time: "3 days ago",
        },
        {
          id: "5",
          name: `${reportCategory === "confidential" ? "Confidential" : "OSINT"} Quarterly Review`,
          status: "completed",
          time: "1 week ago",
        },
      ];

      setProcessingQueue(newProcessingQueue);

      // Show reports after successful submission
      setShowReports(true);

      enqueueSnackbar("Reports retrieved successfully", { variant: "success" });
    } catch (error) {
      console.error("Error retrieving reports:", error);
      setShowReports(false);
      enqueueSnackbar("Failed to retrieve reports", { variant: "error" });
    }
  }, [
    documentName,
    documentCategory,
    keywords,
    topic,
    reportCategory,
    reportSubcategory,
    selectedMonth,
    enqueueSnackbar,
  ]);

  const handleCombinedSubmit = useCallback(async (): Promise<void> => {
    try {
      // Validate required fields
      if ((!confidentialSelected && !osintSelected) ||
          (confidentialSelected && !confidentialSubcategory) ||
          (osintSelected && !osintSubcategory) ||
          !selectedMonth) {
        enqueueSnackbar("Please select all required fields", { variant: "warning" });
        return;
      }

      console.log({
        confidentialSelected,
        osintSelected,
        confidentialSubcategory: confidentialSelected ? confidentialSubcategory : "N/A",
        osintSubcategory: osintSelected ? osintSubcategory : "N/A",
        selectedMonth: selectedMonth ? selectedMonth.toFormat("MMMM yyyy") : null,
      });

      // Generate sample processing queue data based on selected filters
      const monthStr = selectedMonth ? selectedMonth.toFormat('MMMM') : '';
      const yearStr = selectedMonth ? selectedMonth.toFormat('yyyy') : '';

      // Generate dynamic processing queue based on selections
      const newCombinedQueue: ProcessingItem[] = [];

      // Add confidential reports if selected
      if (confidentialSelected && confidentialSubcategory) {
        newCombinedQueue.push({
          id: "c1",
          name: `Confidential - ${confidentialSubcategory.replace(/-/g, " ")} Report (${monthStr} ${yearStr})`,
          status: "completed",
          time: "2 hours ago",
        });

        newCombinedQueue.push({
          id: "c2",
          name: `Confidential ${confidentialSubcategory.replace(/-/g, " ")} Analysis`,
          status: "processing",
          time: "30 minutes ago",
        });
      }

      // Add OSINT reports if selected
      if (osintSelected && osintSubcategory) {
        newCombinedQueue.push({
          id: "o1",
          name: `OSINT - ${osintSubcategory.replace(/-/g, " ")} Report (${monthStr} ${yearStr})`,
          status: "completed",
          time: "1 hour ago",
        });

        newCombinedQueue.push({
          id: "o2",
          name: `OSINT ${osintSubcategory.replace(/-/g, " ")} Analysis`,
          status: "completed",
          time: "45 minutes ago",
        });
      }

      // Add combined report if both are selected
      if (confidentialSelected && osintSelected) {
        newCombinedQueue.push({
          id: "co1",
          name: `Combined Intelligence Report (${monthStr} ${yearStr})`,
          status: "processing",
          time: "10 minutes ago",
        });
      }

      setCombinedProcessingQueue(newCombinedQueue);

      // Show combined reports after successful submission
      setShowCombinedReports(true);

      enqueueSnackbar("Combined reports generated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error generating combined reports:", error);
      setShowCombinedReports(false);
      enqueueSnackbar("Failed to generate combined reports", { variant: "error" });
    }
  }, [
    confidentialSelected,
    osintSelected,
    confidentialSubcategory,
    osintSubcategory,
    selectedMonth,
    enqueueSnackbar,
  ]);

  return {
    getters: {
      documentName,
      documentCategory,
      keywords,
      topic,
      breadcrumbs,
      reportCategory,
      reportSubcategory,
      availableSubcategories,
      selectedMonth,
      showReports,
      processingQueue,
      height,
      // Combined report getters
      confidentialSelected,
      osintSelected,
      confidentialSubcategory,
      osintSubcategory,
      availableConfidentialSubcategories,
      availableOsintSubcategories,
      showCombinedReports,
      combinedProcessingQueue,
    },
    handlers: {
      onDocumentNameChange,
      onDocumentCategoryChange,
      onKeywordsChange,
      onTopicChange,
      handleSubmit,
      handleReportCategoryChange,
      handleReportSubcategoryChange,
      handleMonthChange,
      handleProcessingItemClick,
      // Combined report handlers
      handleConfidentialCheckboxChange,
      handleOsintCheckboxChange,
      handleConfidentialSubcategoryChange,
      handleOsintSubcategoryChange,
      handleCombinedSubmit,
    },
    ref: {
      documentNameRef,
      documentCategoryRef,
      keywordsRef,
      topicRef,
      dashboardRef,
    },
  };
};
