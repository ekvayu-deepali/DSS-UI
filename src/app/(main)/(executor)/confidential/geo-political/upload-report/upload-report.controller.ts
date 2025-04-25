import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { DateTime } from "luxon";

import { IBreadcrumbDisplay } from "@/components/common/breadcrumb/interface";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";
import { RoutePathEnum } from "@/enum";
import { ITopicDropdownRef } from "@/components/common/topicDropdown/topicDropdown.interface";
import { DocumentTypeOptions } from '@/enum/documentType.enum';

interface FileInfo {
  file: File;
  preview?: string;
  progress: number;
}

interface IUploadReportControllerResponse {
  getters: {
    origin: string;
    source: string;
    description: string;
    summary: string;
    documentName: string;
    documentType: string;
    documentCategory: string;
    selectedDate: DateTime | null;
    breadcrumbs: IBreadcrumbDisplay[];
    classification: string;
    topics: string[];
    error: boolean;
    documentCategoryOptions: Array<{
      value: string;
      label: string;
      color: string;
    }>;
    uploadedFiles: FileInfo[];
    uploadError: string;
    sourceSeverity: number;
    reviewSeverity: number;
  };
  handlers: {
    onOriginChange: (event: ITextInputFieldData) => void;
    onSourceChange: (event: ITextInputFieldData) => void;
    onDescriptionChange: (event: ITextInputFieldData) => void;
    onSummaryChange: (event: ITextInputFieldData) => void;
    onDocumentNameChange: (event: ITextInputFieldData) => void;
    onDateChange: (date: DateTime | null) => void;
    onClassificationChange: (value: string) => void;
    onDocumentTypeChange: (value: string) => void;
    onDocumentCategoryChange: (value: string) => void;
    handleSubmit: () => Promise<void>;
    handleCancel: () => void;
    onTopicToggle: (topicValue: string) => void;
    onAddNewDocumentCategory: (newCategory: {
      value: string;
      label: string;
      color: string;
    }) => void;
    handleFileUpload: (files: FileList) => void;
    removeFile: (index: number) => void;
    clearUploadError: () => void;
    onSourceSeverityChange: (value: number) => void;
    onReviewSeverityChange: (value: number) => void;
  };
  ref: {
    originRef: RefObject<ITextInputFieldRef | null>;
    sourceRef: RefObject<ITextInputFieldRef | null>;
    descriptionRef: RefObject<ITextInputFieldRef | null>;
    summaryRef: RefObject<ITextInputFieldRef | null>;
    documentNameRef: RefObject<ITextInputFieldRef | null>;
    documentTypeRef: RefObject<ITextInputFieldRef | null>;
    documentCategoryRef: RefObject<ITextInputFieldRef | null>;
    classificationRef: RefObject<ITextInputFieldRef | null>;
    topicsRef: RefObject<ITopicDropdownRef | null>;
    fileInputRef: RefObject<HTMLInputElement | null>;
  };
}

export const useUploadReportController = (): IUploadReportControllerResponse => {
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [origin, setOrigin] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [documentName, setDocumentName] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");
  const [documentCategory, setDocumentCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(
    DateTime.now()
  );
  const [classification, setClassification] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [documentCategoryOptions, setDocumentCategoryOptions] = useState([
    { value: "book", label: "Book", color: "primary" },
    { value: "journal", label: "Journal", color: "primary" },
    { value: "periodical", label: "Periodical", color: "primary" },
    { value: "press_report", label: "Press Report", color: "primary" },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const [sourceSeverity, setSourceSeverity] = useState<number>(5);
  const [reviewSeverity, setReviewSeverity] = useState<number>(5);

  // Refs
  const originRef = useRef<ITextInputFieldRef | null>(null);
  const sourceRef = useRef<ITextInputFieldRef | null>(null);
  const descriptionRef = useRef<ITextInputFieldRef | null>(null);
  const summaryRef = useRef<ITextInputFieldRef | null>(null);
  const documentNameRef = useRef<ITextInputFieldRef | null>(null);
  const documentTypeRef = useRef<ITextInputFieldRef | null>(null);
  const documentCategoryRef = useRef<ITextInputFieldRef | null>(null);
  const classificationRef = useRef<ITextInputFieldRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Breadcrumbs configuration
  const breadcrumbs: IBreadcrumbDisplay[] = useMemo(
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

  const onOriginChange = useCallback((event: ITextInputFieldData): void => {
    setOrigin(event.value);
  }, []);

  const onSourceChange = useCallback((event: ITextInputFieldData): void => {
    setSource(event.value);
  }, []);

  const onDescriptionChange = useCallback(
    (event: ITextInputFieldData): void => {
      setDescription(event.value);
    },
    []
  );

  const onSummaryChange = useCallback((event: ITextInputFieldData): void => {
    setSummary(event.value);
  }, []);

  const onDocumentNameChange = useCallback((event: ITextInputFieldData): void => {
    setDocumentName(event.value);
  }, []);

  const onDateChange = useCallback((date: DateTime | null): void => {
    setSelectedDate(date);
  }, []);

  const onClassificationChange = useCallback((value: string): void => {
    setClassification(value);
    setError(false);
  }, []);

  const onTopicToggle = useCallback((topicValue: string): void => {
    setTopics(prevTopics => {
      if (prevTopics.includes(topicValue)) {
        return prevTopics.filter(t => t !== topicValue);
      }
      return [...prevTopics, topicValue];
    });
    setError(false);
  }, []);

  const onDocumentTypeChange = useCallback((value: string): void => {
    setDocumentType(value);
  }, []);

  const onDocumentCategoryChange = useCallback((value: string): void => {
    setDocumentCategory(value);
  }, []);

  const onAddNewDocumentCategory = useCallback((newCategory: {
    value: string;
    label: string;
    color: string;
  }) => {
    setDocumentCategoryOptions(prev => {
      // Check if category with same value already exists
      const categoryExists = prev.some(category => category.value === newCategory.value);
      if (categoryExists) {
        // If exists, generate a unique value by adding a timestamp
        const uniqueValue = `${newCategory.value}_${Date.now()}`;
        const uniqueCategory = { ...newCategory, value: uniqueValue };
        return [...prev, uniqueCategory];
      }
      return [...prev, newCategory];
    });
    // Remove this line to prevent auto-selection of new category
    // setDocumentCategory(newCategory.value);
  }, []);

  const isValidSubmittion = useCallback((): boolean => {
    const originError = originRef.current?.validateValue();
    const sourceError = sourceRef.current?.validateValue();
    const descriptionError = descriptionRef.current?.validateValue();
    const summaryError = summaryRef.current?.validateValue();
    const documentNameError = documentNameRef.current?.validateValue();
    const documentTypeError = documentTypeRef.current?.validateValue();
    const documentCategoryError = documentCategoryRef.current?.validateValue();
    const classificationValid = classificationRef.current?.validateValue();

    if (
      !(
        originError &&
        sourceError &&
        descriptionError &&
        summaryError &&
        documentNameError &&
        documentTypeError &&
        documentCategoryError &&
        classificationValid
      )
    ) {
      return false;
    }

    if (!classification) {
      enqueueSnackbar("Please select a classification level", { variant: "error" });
      setError(true);
      return false;
    }

    if (topics.length === 0) {
      enqueueSnackbar("Please select at least one topic", { variant: "error" });
      setError(true);
      return false;
    }

    return true;
  }, [classification, topics, enqueueSnackbar]);

  const handleSubmit = useCallback(async (): Promise<void> => {
    if (!isValidSubmittion()) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    try {
      console.log({
        origin,
        source,
        description,
        summary,
        documentName,
        documentType,
        documentCategory,
        date: selectedDate?.toISO(),
        sourceSeverity,
        reviewSeverity,
      });
      enqueueSnackbar("Report uploaded successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to upload report", { variant: "error" });
    }
  }, [
    isValidSubmittion,
    enqueueSnackbar,
    origin,
    source,
    description,
    summary,
    documentName,
    documentType,
    documentCategory,
    selectedDate,
    sourceSeverity,
    reviewSeverity,
  ]);

  const handleCancel = useCallback((): void => {
    setOrigin("");
    setSource("");
    setDescription("");
    setSummary("");
    setDocumentName("");
    setDocumentType("");
    setDocumentCategory("");
    setSelectedDate(DateTime.now());
    setSourceSeverity(5);
    setReviewSeverity(5);
  }, []);

  const handleFileUpload = useCallback((files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      file,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setUploadError('');
  }, []);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const clearUploadError = useCallback(() => {
    setUploadError('');
  }, []);

  const onSourceSeverityChange = useCallback((value: number): void => {
    setSourceSeverity(value);
  }, []);

  const onReviewSeverityChange = useCallback((value: number): void => {
    setReviewSeverity(value);
  }, []);

  return {
    getters: {
      origin,
      source,
      description,
      summary,
      documentName,
      documentType,
      documentCategory,
      selectedDate,
      breadcrumbs,
      classification,
      topics,
      error,
      documentCategoryOptions,
      uploadedFiles,
      uploadError,
      sourceSeverity,
      reviewSeverity,
    },
    handlers: {
      onOriginChange,
      onSourceChange,
      onDescriptionChange,
      onSummaryChange,
      onDocumentNameChange,
      onDateChange,
      onClassificationChange,
      onDocumentTypeChange,
      onDocumentCategoryChange,
      onAddNewDocumentCategory,
      handleSubmit,
      handleCancel,
      onTopicToggle,
      handleFileUpload,
      removeFile,
      clearUploadError,
      onSourceSeverityChange,
      onReviewSeverityChange,
    },
    ref: {
      originRef,
      sourceRef,
      descriptionRef,
      summaryRef,
      documentNameRef,
      documentTypeRef,
      documentCategoryRef,
      classificationRef,
      topicsRef: useRef<ITopicDropdownRef>(null),
      fileInputRef,
    },
  };
};
