import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";
import { IBreadcrumbDisplay } from "@/components/common/breadcrumb/interface";
import { RoutePathEnum } from "@/enum";

interface IMergeReportControllerResponse {
  getters: {
    documentName: string;
    documentCategory: string;
    keywords: string;
    topic: string;
    breadcrumbs: IBreadcrumbDisplay[];
  };
  handlers: {
    onDocumentNameChange: (event: ITextInputFieldData) => void;
    onDocumentCategoryChange: (event: ITextInputFieldData) => void;
    onKeywordsChange: (event: ITextInputFieldData) => void;
    onTopicChange: (event: ITextInputFieldData) => void;
    handleSubmit: () => Promise<void>;
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

  const handleSubmit = useCallback(async (): Promise<void> => {
    try {
      console.log({
        documentName,
        documentCategory,
        keywords,
        topic,
      });
      enqueueSnackbar("Documents merged successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to merge documents", { variant: "error" });
    }
  }, [documentName, documentCategory, keywords, topic, enqueueSnackbar]);

  return {
    getters: {
      documentName,
      documentCategory,
      keywords,
      topic,
      breadcrumbs,
    },
    handlers: {
      onDocumentNameChange,
      onDocumentCategoryChange,
      onKeywordsChange,
      onTopicChange,
      handleSubmit,
    },
    ref: {
      documentNameRef,
      documentCategoryRef,
      keywordsRef,
      topicRef,
    },
  };
};
