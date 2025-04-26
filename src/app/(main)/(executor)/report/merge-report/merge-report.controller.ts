import { RefObject, useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { SelectChangeEvent } from "@mui/material";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";
import { IBreadcrumbDisplay } from "@/components/common/breadcrumb/interface";
import { RoutePathEnum } from "@/enum";

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
    { value: "organisation-and-management", label: "Organisation and Management" },
    { value: "training", label: "Training" },
    { value: "intelligence", label: "Intelligence" },
  ],
  osint: [
    { value: "geo-political", label: "Geo Political" },
    { value: "metrology", label: "Metrology" },
    { value: "miscellaneous", label: "Miscellaneous" },
    { value: "organisation-and-management", label: "Organisation and Management" },
    { value: "training", label: "Training" },
    { value: "intelligence", label: "Intelligence" },
  ],
};

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
  };
  handlers: {
    onDocumentNameChange: (event: ITextInputFieldData) => void;
    onDocumentCategoryChange: (event: ITextInputFieldData) => void;
    onKeywordsChange: (event: ITextInputFieldData) => void;
    onTopicChange: (event: ITextInputFieldData) => void;
    handleSubmit: () => Promise<void>;
    handleReportCategoryChange: (event: SelectChangeEvent<string>) => void;
    handleReportSubcategoryChange: (event: SelectChangeEvent<string>) => void;
  };
  ref: {
    documentNameRef: RefObject<ITextInputFieldRef | null>;
    documentCategoryRef: RefObject<ITextInputFieldRef | null>;
    keywordsRef: RefObject<ITextInputFieldRef | null>;
    topicRef: RefObject<ITextInputFieldRef | null>;
  };
}

export const useMergeReportController = (): IMergeReportControllerResponse => {
  const { enqueueSnackbar } = useSnackbar();

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

  // Update subcategories when report category changes
  useEffect(() => {
    if (reportCategory) {
      setAvailableSubcategories(
        REPORT_SUBCATEGORIES[reportCategory as keyof typeof REPORT_SUBCATEGORIES] || []
      );
      setReportSubcategory(""); // Reset subcategory when category changes
    }
  }, [reportCategory]);

  // Refs
  const documentNameRef = useRef<ITextInputFieldRef | null>(null);
  const documentCategoryRef = useRef<ITextInputFieldRef | null>(null);
  const keywordsRef = useRef<ITextInputFieldRef | null>(null);
  const topicRef = useRef<ITextInputFieldRef | null>(null);

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

  const onDocumentNameChange = useCallback((event: ITextInputFieldData): void => {
    setDocumentName(event.value);
  }, []);

  const onDocumentCategoryChange = useCallback((event: ITextInputFieldData): void => {
    setDocumentCategory(event.value);
  }, []);

  const onKeywordsChange = useCallback((event: ITextInputFieldData): void => {
    setKeywords(event.value);
  }, []);

  const onTopicChange = useCallback((event: ITextInputFieldData): void => {
    setTopic(event.value);
  }, []);

  const handleReportCategoryChange = useCallback((event: SelectChangeEvent<string>): void => {
    setReportCategory(event.target.value);
  }, []);

  const handleReportSubcategoryChange = useCallback((event: SelectChangeEvent<string>): void => {
    setReportSubcategory(event.target.value);
  }, []);

  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      console.log({
        documentName,
        documentCategory,
        keywords,
        topic,
        reportCategory,
        reportSubcategory,
      });
      enqueueSnackbar("Documents merged successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to merge documents", { variant: "error" });
    }
  }, [documentName, documentCategory, keywords, topic, reportCategory, reportSubcategory, enqueueSnackbar]);

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
    },
    handlers: {
      onDocumentNameChange,
      onDocumentCategoryChange,
      onKeywordsChange,
      onTopicChange,
      handleSubmit,
      handleReportCategoryChange,
      handleReportSubcategoryChange,
    },
    ref: {
      documentNameRef,
      documentCategoryRef,
      keywordsRef,
      topicRef,
    },
  };
};
