"use client";

import React from "react";
import { FormGroup, Grid, Typography } from "@mui/material";

import { CardComponent } from "@/components/common/card";
import { PageHeader, TextInputField } from "@/components/common";
import { SimpleDatePicker } from "@/components/common/simpleDatePicker";
import { ValidationHelper } from "@/helpers";
import ClassificationDropdown from '@/components/common/classificationDropdown';

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
  const { origin, source, description, summary, selectedDate, breadcrumbs } =
    getters;
  const {
    onOriginChange,
    onSourceChange,
    onDescriptionChange,
    onSummaryChange,
    onDateChange,
    handleSubmit,
    handleCancel,
  } = handlers;
  const { originRef, sourceRef, descriptionRef, summaryRef } = ref;

  return (
    <PageContainer>
      <PageHeader
        title="Upload Report"
        breadcrumbs={breadcrumbs}
        actions={""}
      />

      <CardComponent title="Upload Report Form">
        <FormContainer>
          {/* Basic Information Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h6">Basic Information</Typography>
              <Typography variant="body2" color="textSecondary">
                Please provide the fundamental details of your report
              </Typography>
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

              {/* Date Field */}
              <Grid item xs={12}>
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

          {/* Classification Section */}
          <FormSection>
            <FormSectionTitle>
              <Typography variant="h6">Classification</Typography>
            </FormSectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ClassificationDropdown
                  ref={ref.classificationRef}
                  value={getters.classification}
                  onChange={handlers.onClassificationChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Report Content Section */}
          <FormSection>
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
