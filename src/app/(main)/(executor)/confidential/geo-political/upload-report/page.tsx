"use client";

import React from "react";
import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { CardComponent } from "@/components/common/card";
import { PageHeader, TextInputField } from "@/components/common";
import { SimpleDatePicker } from "@/components/common/simpleDatePicker";
import { ValidationHelper } from "@/helpers";
import ClassificationDropdown from "@/components/common/classificationDropdown";
import TopicDropdown from "@/components/common/topicDropdown";
import { DocumentTypeOptions } from "@/enum/documentType.enum";

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
} from "./upload-report.style";

export default function UploadReport() {
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
  } = handlers;
  const { originRef, sourceRef, descriptionRef, summaryRef, documentNameRef } =
    ref;

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
              <Typography variant="h6">Basic Document Details</Typography>
            </FormSectionTitle>
            <Grid container spacing={4}>
              {/* Document Name Field */}
              <Grid item xs={12} md={6}>
                <FormGroup>
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
                </FormGroup>
              </Grid>

              {/* Document Category Dropdown */}
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FieldDescription>
                    <Typography variant="subtitle2">Document Category</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Select the category of the document
                    </Typography>
                  </FieldDescription>
                  <StyledTextFieldWrapper>
                    <FormControl fullWidth>
                      <InputLabel id="document-category-label">Document Category *</InputLabel>
                      <Select
                        labelId="document-category-label"
                        id="document-category"
                        value={documentCategory}
                        label="Document Category *"
                        onChange={(e) => onDocumentCategoryChange(e.target.value)}
                        ref={ref.documentCategoryRef}
                      >
                        <MenuItem value="book">Book</MenuItem>
                        <MenuItem value="journal">Journal</MenuItem>
                        <MenuItem value="periodical">Periodical</MenuItem>
                        <MenuItem value="press_report">Press Report</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTextFieldWrapper>
                </FormGroup>
              </Grid>

              {/* Document Type Dropdown */}
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FieldDescription>
                    <Typography variant="subtitle2">Document Type</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Select the type of document you are uploading
                    </Typography>
                  </FieldDescription>
                  <StyledTextFieldWrapper>
                    <FormControl fullWidth>
                      <InputLabel id="document-type-label">Document Type *</InputLabel>
                      <Select
                        labelId="document-type-label"
                        id="document-type"
                        value={documentType}
                        label="Document Type *"
                        onChange={(e) => onDocumentTypeChange(e.target.value)}
                        ref={ref.documentTypeRef}
                      >
                        {Object.values(DocumentTypeOptions).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </StyledTextFieldWrapper>
                </FormGroup>
              </Grid>

              {/* Date Field */}
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FieldDescription>
                    <Typography variant="subtitle2">Report Date</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Select the date when this report was created
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
                </FormGroup>
              </Grid>
            </Grid>
          </FormSection>

          {/* Source Information Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h6"> Information Tags</Typography>
            </FormSectionTitle>
            <Grid container spacing={4}>
              {/* Origin Field */}
              <Grid item xs={12}>
                <FormGroup>
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
                </FormGroup>
              </Grid>

              {/* Source Field */}
              <Grid item xs={12}>
                <FormGroup>
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
                </FormGroup>
              </Grid>
            </Grid>
          </FormSection>

          {/* Classification Section */}
          <FormSection>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FieldDescription>
                  <Typography variant="subtitle2">
                    Classification Level
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Select the appropriate security classification for this
                    report
                  </Typography>
                </FieldDescription>
                <ClassificationDropdown
                  ref={ref.classificationRef}
                  value={getters.classification}
                  onChange={handlers.onClassificationChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FieldDescription>
                  <Typography variant="subtitle2">Related Topics</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Choose one or more topics that relate to this report
                  </Typography>
                </FieldDescription>
                <TopicDropdown
                  ref={ref.topicsRef}
                  value={getters.topics}
                  onChange={handlers.onTopicsChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Report Content Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h6">Report Content</Typography>
            </FormSectionTitle>
            <Grid container spacing={4}>
              {/* Summary Field */}
              <Grid item xs={12}>
                <FormGroup>
                  <FieldDescription>
                    <Typography variant="subtitle2">
                      Executive Summary
                    </Typography>
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
                </FormGroup>
              </Grid>

              {/* Description Field */}
              <Grid item xs={12}>
                <FormGroup>
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
                </FormGroup>
              </Grid>
            </Grid>
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
