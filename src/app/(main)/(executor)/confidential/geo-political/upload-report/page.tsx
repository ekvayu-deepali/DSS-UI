"use client";

import React, { useState, useRef } from "react";
import {
  Typography,
  Box,
  Chip,
  Modal,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import { CardComponent } from "@/components/common/card";
import {
  PageHeader,
  Spacing,
  SpacingEnum,
  TextInputField,
  SeveritySlider,
} from "@/components/common";
import { SimpleDatePicker } from "@/components/common/simpleDatePicker";
import { ValidationHelper } from "@/helpers";

import { DocumentTypeOptions } from "@/enum/documentType.enum";
import { formatBytes } from "@/utils/file.utils";

import { useUploadReportController } from "./upload-report.controller";
import {
  PageContainer,
  FormContainer,
  FormSection,
  FormSectionTitle,
  ButtonContainer,
  CancelButton,
  SubmitButton,
  StyledTextFieldWrapper,
  FieldDescription,
  ChipsWrapper,
  AddNewChip,
  AddChipDialog,
  FileUploadContainer,
  FilePreviewContainer,
  FilePreviewItem,
} from "./upload-report.style";

const ChipComponent = ({ label, onClick, variant, color }: any) => (
  <Chip
    label={label}
    onClick={onClick}
    variant={variant}
    color={color}
    sx={{ cursor: "pointer", mr: 1, mb: 1 }}
  />
);

const ClassificationOptions = [
  { value: "unclassified", label: "Unclassified", color: "default" },
  { value: "confidential", label: "Confidential", color: "secondary" },
  { value: "secret", label: "Secret", color: "primary" },
  { value: "top_secret", label: "Top Secret", color: "error" },
];

const TOPICS = [
  { value: "topic1", label: "Topic 1" },
  { value: "topic2", label: "Topic 2" },
  { value: "topic3", label: "Topic 3" },
  { value: "topic4", label: "Topic 4" },
];

export default function UploadReport() {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);
  const [isAddClassificationOpen, setIsAddClassificationOpen] = useState(false);
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [newChipLabel, setNewChipLabel] = useState("");
  const [newClassificationLabel, setNewClassificationLabel] = useState("");
  const [newTopicLabel, setNewTopicLabel] = useState("");
  const { getters, handlers, ref } = useUploadReportController();
  const {
    origin,
    source,
    description,
    summary,
    documentName,
    documentType,
    documentCategory,
    selectedDate,
    breadcrumbs,
    sourceSeverity,
    reviewSeverity,
  } = getters;

  const {
    onOriginChange,
    onSourceChange,
    onDescriptionChange,
    onSummaryChange,
    onDocumentNameChange,
    onDocumentTypeChange,
    onDocumentCategoryChange,
    onDateChange,
    handleSubmit,
    handleCancel,
    onAddNewDocumentCategory,
    onSourceSeverityChange,
    onReviewSeverityChange,
  } = handlers;
  const {
    originRef,
    sourceRef,
    descriptionRef,
    summaryRef,
    documentNameRef,
    fileInputRef,
  } = ref;

  // Document Category handlers
  const handleAddNewClick = () => {
    setIsAddNewOpen(true);
  };

  const handleCloseAddNew = () => {
    setIsAddNewOpen(false);
    setNewChipLabel("");
  };

  const handleAddNewCategory = () => {
    if (newChipLabel.trim()) {
      // Generate a unique value by combining sanitized label with timestamp
      const baseValue = newChipLabel.toLowerCase().replace(/\s+/g, "_");
      const uniqueValue = `${baseValue}_${Date.now()}`;

      onAddNewDocumentCategory({
        value: uniqueValue,
        label: newChipLabel.trim(),
        color: "primary",
      });
      handleCloseAddNew();
    }
  };

  // Classification handlers
  const handleAddClassificationClick = () => {
    setIsAddClassificationOpen(true);
  };

  const handleCloseAddClassification = () => {
    setIsAddClassificationOpen(false);
    setNewClassificationLabel("");
  };

  const handleAddNewClassification = () => {
    if (newClassificationLabel.trim()) {
      // This would typically call a handler from the controller
      // For now, we'll just log it since we don't have a handler for this
      console.log("New classification added:", newClassificationLabel);
      handleCloseAddClassification();
    }
  };

  // Topic handlers
  const handleAddTopicClick = () => {
    setIsAddTopicOpen(true);
  };

  const handleCloseAddTopic = () => {
    setIsAddTopicOpen(false);
    setNewTopicLabel("");
  };

  const handleAddNewTopic = () => {
    if (newTopicLabel.trim()) {
      // This would typically call a handler from the controller
      // For now, we'll just log it since we don't have a handler for this
      console.log("New topic added:", newTopicLabel);
      handleCloseAddTopic();
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Upload Report"
        breadcrumbs={breadcrumbs}
        actions={""}
      />

      <CardComponent>
        <FormContainer>
          {/* Basic Document Details Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h5">Basic Document Details</Typography>
            </FormSectionTitle>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* Document Name Field */}
              <Box sx={{ flex: "0 0 50%" }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Document Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enter a name for this document
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <TextInputField
                    type="text"
                    fullWidth
                    placeholder="e.g., Border Activity Report Q2 2023"
                    label="Document Name"
                    onChange={onDocumentNameChange}
                    value={documentName}
                    ref={documentNameRef}
                    validation={ValidationHelper.validateNotEmpty}
                  />
                </StyledTextFieldWrapper>
              </Box>

              {/* Report Date Field */}
              <Box sx={{ flex: "0 0 50%" }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Report Date</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Select the report date
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <SimpleDatePicker
                    fullWidth
                    label="Report Date"
                    value={selectedDate}
                    onChange={onDateChange}
                  />
                </StyledTextFieldWrapper>
              </Box>
            </Box>
            <Spacing spacing={4} variant={SpacingEnum.TOP} />

            {/* Document Type and Category in one row */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Document Type */}
              <Box sx={{ flex: '0 0 50%' }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Document Type</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Select the type of document
                  </Typography>
                </FieldDescription>
                <ChipsWrapper>
                  {Object.values(DocumentTypeOptions).map((option) => (
                    <ChipComponent
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      onClick={() => onDocumentTypeChange(option.value)}
                      variant={
                        documentType === option.value ? "filled" : "outlined"
                      }
                      color="primary"
                    />
                  ))}
                </ChipsWrapper>
              </Box>

              {/* Document Category */}
              <Box sx={{ flex: '0 0 50%' }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Document Category</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Select the category of the document
                  </Typography>
                </FieldDescription>
                <ChipsWrapper>
                  {getters.documentCategoryOptions.map((option) => (
                    <ChipComponent
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      onClick={() => onDocumentCategoryChange(option.value)}
                      variant={
                        documentCategory === option.value ? "filled" : "outlined"
                      }
                      color={option.color}
                    />
                  ))}
                  <AddNewChip
                    icon={<AddIcon />}
                    label="Add New"
                    onClick={handleAddNewClick}
                    variant="outlined"
                  />
                </ChipsWrapper>
              </Box>
            </Box>
            <Spacing spacing={2} variant={SpacingEnum.TOP} />

            {/* Supporting Documents in one row */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* File Upload Field */}
              <Box sx={{ flex: getters.uploadedFiles.length > 0 ? '0 0 40%' : '1' }}>
                <FieldDescription>
                  <Typography variant="subtitle2">
                    Supporting Documents
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Upload any relevant files or documents
                  </Typography>
                </FieldDescription>

                <input
                  type="file"
                  multiple
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files && handlers.handleFileUpload(e.target.files)
                  }
                  ref={fileInputRef}
                />

                <FileUploadContainer
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "120px",
                  }}
                >
                  <CloudUploadIcon sx={{ mb: 1, color: "primary.main" }} />
                  <Typography variant="body2" color="textSecondary">
                    Click to upload files
                  </Typography>
                </FileUploadContainer>

                {/* Error Message */}
                {getters.uploadError && (
                  <Alert
                    severity="error"
                    onClose={handlers.clearUploadError}
                    sx={{ mt: 1 }}
                  >
                    {getters.uploadError}
                  </Alert>
                )}
              </Box>

              {/* File Preview Section - Only shown when files are uploaded */}
              {getters.uploadedFiles.length > 0 && (
                <Box sx={{ flex: '0 0 60%' }}>
                  <FieldDescription>
                    <Typography variant="subtitle2">
                      Uploaded Files
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Files that will be attached to this report
                    </Typography>
                  </FieldDescription>

                  <FilePreviewContainer>
                    {getters.uploadedFiles.map((fileInfo, index) => (
                      <FilePreviewItem key={`${fileInfo.file.name}-${index}`}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flex: 1,
                          }}
                        >
                          <InsertDriveFileIcon color="primary" />
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              variant="body2"
                              noWrap
                              title={fileInfo.file.name}
                            >
                              {fileInfo.file.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatBytes(fileInfo.file.size)}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlers.removeFile(index);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </FilePreviewItem>
                    ))}
                  </FilePreviewContainer>
                </Box>
              )}
            </Box>

            {/* Document Category Modal */}
            <Modal
              open={isAddNewOpen}
              onClose={handleCloseAddNew}
              aria-labelledby="add-new-category"
            >
              <AddChipDialog>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Add New Category
                </Typography>
                <TextField
                  autoFocus
                  fullWidth
                  label="Category Name"
                  value={newChipLabel}
                  onChange={(e) => setNewChipLabel(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button onClick={handleCloseAddNew}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleAddNewCategory}
                    disabled={!newChipLabel.trim()}
                  >
                    Add
                  </Button>
                </Box>
              </AddChipDialog>
            </Modal>

            {/* Classification Modal */}
            <Modal
              open={isAddClassificationOpen}
              onClose={handleCloseAddClassification}
              aria-labelledby="add-new-classification"
            >
              <AddChipDialog>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Add New Classification
                </Typography>
                <TextField
                  autoFocus
                  fullWidth
                  label="Classification Name"
                  value={newClassificationLabel}
                  onChange={(e) => setNewClassificationLabel(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button onClick={handleCloseAddClassification}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleAddNewClassification}
                    disabled={!newClassificationLabel.trim()}
                  >
                    Add
                  </Button>
                </Box>
              </AddChipDialog>
            </Modal>

            {/* Topic Modal */}
            <Modal
              open={isAddTopicOpen}
              onClose={handleCloseAddTopic}
              aria-labelledby="add-new-topic"
            >
              <AddChipDialog>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Add New Topic
                </Typography>
                <TextField
                  autoFocus
                  fullWidth
                  label="Topic Name"
                  value={newTopicLabel}
                  onChange={(e) => setNewTopicLabel(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button onClick={handleCloseAddTopic}>Cancel</Button>
                  <Button
                    variant="contained"
                    onClick={handleAddNewTopic}
                    disabled={!newTopicLabel.trim()}
                  >
                    Add
                  </Button>
                </Box>
              </AddChipDialog>
            </Modal>
          </FormSection>

          {/* Information Tags Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h5">Information Tags</Typography>
            </FormSectionTitle>

            {/* Origin and Source in one row */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                mb: 4,
              }}
            >
              {/* Origin Field */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Report Origin</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specify where this report originated from
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <TextInputField
                    type="text"
                    fullWidth
                    placeholder="e.g., Field Office, Headquarters, Regional Branch"
                    label="Origin"
                    onChange={onOriginChange}
                    value={origin}
                    ref={originRef}
                    validation={ValidationHelper.validateNotEmpty}
                  />
                </StyledTextFieldWrapper>
              </Box>

              {/* Source Field */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">
                    Information Source
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Indicate the primary source of the information
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <TextInputField
                    type="text"
                    fullWidth
                    placeholder="e.g., Field Agent, Official Document, Intelligence Report"
                    label="Source"
                    onChange={onSourceChange}
                    value={source}
                    ref={sourceRef}
                    validation={ValidationHelper.validateNotEmpty}
                  />
                </StyledTextFieldWrapper>
              </Box>
            </Box>

            {/* Classification and Topics in one row */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Classification Level */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">
                    Classification Level
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Select the appropriate security classification for this
                    report
                  </Typography>
                </FieldDescription>
                <ChipsWrapper>
                  {Object.values(ClassificationOptions).map((option) => (
                    <ChipComponent
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      onClick={() =>
                        handlers.onClassificationChange(option.value)
                      }
                      variant={
                        getters.classification === option.value
                          ? "filled"
                          : "outlined"
                      }
                      color={option.color}
                    />
                  ))}
                  <AddNewChip
                    icon={<AddIcon />}
                    label="Add New"
                    onClick={handleAddClassificationClick}
                    variant="outlined"
                  />
                </ChipsWrapper>
              </Box>

              {/* Related Topics Section */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Related Topics</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Choose one or more topics that relate to this report
                  </Typography>
                </FieldDescription>
                <ChipsWrapper>
                  {TOPICS.map((topic) => (
                    <ChipComponent
                      key={topic.value}
                      value={topic.value}
                      label={topic.label}
                      onClick={() => handlers.onTopicToggle(topic.value)}
                      variant={
                        getters.topics.includes(topic.value)
                          ? "filled"
                          : "outlined"
                      }
                      color={
                        getters.topics.includes(topic.value)
                          ? "primary"
                          : "default"
                      }
                    />
                  ))}
                  <AddNewChip
                    icon={<AddIcon />}
                    label="Add New"
                    onClick={handleAddTopicClick}
                    variant="outlined"
                  />
                </ChipsWrapper>
              </Box>
            </Box>
          </FormSection>

          {/* Severity Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h5">Severity Assessment</Typography>
            </FormSectionTitle>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Assess the severity of the report on a scale from 0 (low) to 10
              (high).
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <SeveritySlider
                  label="Source Severity"
                  description="Rate the severity level as reported by the source"
                  value={sourceSeverity}
                  onChange={onSourceSeverityChange}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SeveritySlider
                  label="Review Severity"
                  description="Rate the severity level based on your assessment"
                  value={reviewSeverity}
                  onChange={onReviewSeverityChange}
                />
              </Box>
            </Box>
          </FormSection>

          {/* Report Content Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h5">Report Content</Typography>
            </FormSectionTitle>
            {/* Summary and Description Fields in one row */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
              }}
            >
              {/* Summary Field */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">Executive Summary</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Provide a brief overview of the key points (max 3
                    paragraphs)
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <TextInputField
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Write a concise summary of the main findings and implications..."
                    label="Summary"
                    onChange={onSummaryChange}
                    value={summary}
                    ref={summaryRef}
                    validation={ValidationHelper.validateNotEmpty}
                  />
                </StyledTextFieldWrapper>
              </Box>

              {/* Description Field */}
              <Box sx={{ flex: 1 }}>
                <FieldDescription>
                  <Typography variant="subtitle2">
                    Detailed Description
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Provide comprehensive details of the report including
                    analysis and findings
                  </Typography>
                </FieldDescription>
                <StyledTextFieldWrapper>
                  <TextInputField
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="Include detailed information, supporting evidence, methodology used, and any relevant context..."
                    label="Description"
                    onChange={onDescriptionChange}
                    value={description}
                    ref={descriptionRef}
                    validation={ValidationHelper.validateNotEmpty}
                  />
                </StyledTextFieldWrapper>
              </Box>
            </Box>
          </FormSection>

          <ButtonContainer>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SubmitButton onClick={handleSubmit}>Submit Report</SubmitButton>
          </ButtonContainer>
        </FormContainer>
      </CardComponent>
    </PageContainer>
  );
}
