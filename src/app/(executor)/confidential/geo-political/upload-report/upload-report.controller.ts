import { RefObject, useCallback, useMemo, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { DateTime } from "luxon";

import { IBreadcrumbDisplay } from "@/components/common/breadcrumb/interface";
import { ITextInputFieldData, ITextInputFieldRef } from "@/components/common";
import { RoutePathEnum } from "@/enum";
import { ITopicDropdownRef } from "@/components/common/topicDropdown/topicDropdown.interface";

interface IUploadReportControllerResponse {
  getters: {
    origin: string;
    source: string;
    description: string;
    summary: string; // new field
    selectedDate: DateTime | null;
    breadcrumbs: IBreadcrumbDisplay[];
    classification: string;
    topics: string[];
  };
  handlers: {
    onOriginChange: (event: ITextInputFieldData) => void;
    onSourceChange: (event: ITextInputFieldData) => void;
    onDescriptionChange: (event: ITextInputFieldData) => void;
    onSummaryChange: (event: ITextInputFieldData) => void; // new handler
    onDateChange: (date: DateTime | null) => void;
    onClassificationChange: (value: string) => void;
    onTopicsChange: (value: string[]) => void;
    handleSubmit: () => Promise<void>;
    handleCancel: () => void;
  };
  ref: {
    originRef: RefObject<ITextInputFieldRef | null>;
    sourceRef: RefObject<ITextInputFieldRef | null>;
    descriptionRef: RefObject<ITextInputFieldRef | null>;
    summaryRef: RefObject<ITextInputFieldRef | null>; // new ref
    classificationRef: RefObject<ITextInputFieldRef | null>;
    topicsRef: RefObject<ITopicDropdownRef | null>;
  };
}

export const useUploadReportController =
  (): IUploadReportControllerResponse => {
    const { enqueueSnackbar } = useSnackbar();

    // States
    const [origin, setOrigin] = useState<string>("");
    const [source, setSource] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [summary, setSummary] = useState<string>(""); // new state
    const [selectedDate, setSelectedDate] = useState<DateTime | null>(
      DateTime.now()
    );
    const [classification, setClassification] = useState<string>("");
    const [topics, setTopics] = useState<string[]>([]);

    // Refs
    const originRef = useRef<ITextInputFieldRef | null>(null);
    const sourceRef = useRef<ITextInputFieldRef | null>(null);
    const descriptionRef = useRef<ITextInputFieldRef | null>(null);
    const summaryRef = useRef<ITextInputFieldRef | null>(null); // new ref
    const classificationRef = useRef<ITextInputFieldRef>(null);

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

    const onDateChange = useCallback((date: DateTime | null): void => {
      setSelectedDate(date);
    }, []);

    const onClassificationChange = useCallback((value: string) => {
      setClassification(value);
    }, []);

    const onTopicsChange = useCallback((value: string[]) => {
      setTopics(value);
    }, []);

    const isValidSubmittion = useCallback((): boolean => {
      const originError = originRef.current?.validateValue();
      const sourceError = sourceRef.current?.validateValue();
      const descriptionError = descriptionRef.current?.validateValue();
      const summaryError = summaryRef.current?.validateValue(); // new validation
      const classificationValid = classificationRef.current?.validateValue();

      if (
        !(
          originError &&
          sourceError &&
          descriptionError &&
          summaryError &&
          classificationValid
        )
      ) {
        return false;
      }
      return true;
    }, []);

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
          summary, // include in submission
          date: selectedDate?.toISO(),
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
      selectedDate,
    ]);

    const handleCancel = useCallback((): void => {
      setOrigin("");
      setSource("");
      setDescription("");
      setSummary(""); // clear summary
      setSelectedDate(DateTime.now());
    }, []);

    return {
      getters: {
        origin,
        source,
        description,
        summary, // expose new field
        selectedDate,
        breadcrumbs,
        classification,
        topics,
      },
      handlers: {
        onOriginChange,
        onSourceChange,
        onDescriptionChange,
        onSummaryChange, // expose new handler
        onDateChange,
        onClassificationChange,
        onTopicsChange,
        handleSubmit,
        handleCancel,
      },
      ref: {
        originRef,
        sourceRef,
        descriptionRef,
        summaryRef, // expose new ref
        classificationRef,
        topicsRef: useRef<ITopicDropdownRef>(null),
      },
    };
  };
