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
} from "@mui/material";

import { PageHeader } from "@/components/common";
import {
  useMergeReportController,
  REPORT_CATEGORIES,
} from "./merge-report.controller";
import {
  FormContainer,
  FormSection,
  SubmitButton,
  ButtonContainer,
} from "./merge-report.style";

const MergeReport: React.FC = () => {
  const { getters, handlers } = useMergeReportController();
  const {
    breadcrumbs,
    reportCategory,
    reportSubcategory,
    availableSubcategories,
  } = getters;
  const {
    handleReportCategoryChange,
    handleReportSubcategoryChange,
    handleSubmit,
  } = handlers;

  const header = <PageHeader title="Merge Report" breadcrumbs={breadcrumbs} />;

  return (
    <>
      {header}
      <Card>
        <CardContent>
          <FormContainer>
            <Typography variant="h6" gutterBottom>
              Select Report Type
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Choose the report category and subcategory to merge
            </Typography>

            <FormSection>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
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
                <Grid item xs={12} md={3}>
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
              </Grid>
            </FormSection>

            <ButtonContainer>
              <SubmitButton
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!reportCategory || !reportSubcategory}
              >
                Merge Reports
              </SubmitButton>
            </ButtonContainer>
          </FormContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default MergeReport;
