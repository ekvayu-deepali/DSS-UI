"use client";

import React from "react";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { PageHeader, ProcessingDashboard } from "@/components/common";
import {
  useMergeReportController,
  REPORT_CATEGORIES,
} from "./merge-report.controller";
import {
  FormContainer,
  FormSection,
  SubmitButton,
  ButtonContainer,
  ReportContainer,
} from "./merge-report.style";

const ReportExplorer: React.FC = () => {
  const { getters, handlers, ref } = useMergeReportController();
  const {
    breadcrumbs,
    reportCategory,
    reportSubcategory,
    availableSubcategories,
    selectedMonth,
    showReports,
    processingQueue,
  } = getters;
  const {
    handleReportCategoryChange,
    handleReportSubcategoryChange,
    handleSubmit,
    handleMonthChange,
    handleProcessingItemClick,
  } = handlers;

  return (
    <>
      <PageHeader title="Report Explorer" breadcrumbs={breadcrumbs} />
      <Card>
        <CardContent>
          <FormContainer>
            <Typography variant="h6" gutterBottom>
              Select Report Parameters
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Choose the report category, subcategory, and month to view reports
            </Typography>

            <FormSection>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="report-category-label">
                      Report Category
                    </InputLabel>
                    <Select
                      labelId="report-category-label"
                      id="report-category"
                      value={reportCategory}
                      label="Report Category"
                      onChange={handleReportCategoryChange}
                    >
                      {REPORT_CATEGORIES.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="report-subcategory-label">
                      Report Subcategory
                    </InputLabel>
                    <Select
                      labelId="report-subcategory-label"
                      id="report-subcategory"
                      value={reportSubcategory}
                      label="Report Subcategory"
                      onChange={handleReportSubcategoryChange}
                      disabled={!reportCategory}
                    >
                      {availableSubcategories.map((subcategory) => (
                        <MenuItem
                          key={subcategory.value}
                          value={subcategory.value}
                        >
                          {subcategory.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      label="Select Month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      views={['month', 'year']}
                      format="MMMM yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </FormSection>

            <ButtonContainer>
              <SubmitButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!reportCategory || !reportSubcategory}
              >
                View Reports
              </SubmitButton>
            </ButtonContainer>
          </FormContainer>
        </CardContent>
      </Card>

      {showReports && (
        <ReportContainer>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {reportCategory === "confidential" ? "Confidential" : "OSINT"} Reports - {reportSubcategory.replace(/-/g, " ")}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {selectedMonth ? selectedMonth.toFormat("MMMM yyyy") : ""}
              </Typography>
              <Box sx={{ mt: 2 }} ref={ref.dashboardRef}>
                <ProcessingDashboard
                  processingQueue={processingQueue}
                  onProcessingItemClick={handleProcessingItemClick}
                />
              </Box>
            </CardContent>
          </Card>
        </ReportContainer>
      )}
    </>
  );
};

export default ReportExplorer;
