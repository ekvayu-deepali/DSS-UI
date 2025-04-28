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
  Checkbox,
  FormControlLabel,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { PageHeader, ProcessingDashboard } from "@/components/common";
import {
  useMergeReportController,
} from "./merge-report.controller";
import {
  FormContainer,
  SubmitButton,
  ReportContainer,
} from "./merge-report.style";

const ReportExplorer: React.FC = () => {
  const theme = useTheme();
  const { getters, handlers } = useMergeReportController();
  const {
    breadcrumbs,
    selectedMonth,
    // Combined report getters
    confidentialSelected,
    osintSelected,
    confidentialSubcategory,
    osintSubcategory,
    availableConfidentialSubcategories,
    availableOsintSubcategories,
    showCombinedReports,
    combinedProcessingQueue,
  } = getters;
  const {
    handleMonthChange,
    handleProcessingItemClick,
    // Combined report handlers
    handleConfidentialCheckboxChange,
    handleOsintCheckboxChange,
    handleConfidentialSubcategoryChange,
    handleOsintSubcategoryChange,
    handleCombinedSubmit,
  } = handlers;

  return (
    <>
      <PageHeader title="Generate Report" breadcrumbs={breadcrumbs} />

      {/* Combined Report Section */}

      <FormContainer>
        <Card
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: "8px",
            boxShadow: theme.shadows[1],
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                >
                  Intelligence Sources
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {/* Confidential Intelligence */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={confidentialSelected}
                          onChange={(e) =>
                            handleConfidentialCheckboxChange(e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                          Confidential Intelligence
                        </Typography>
                      }
                    />

                    {confidentialSelected && (
                      <Box sx={{ ml: 4, mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel id="confidential-category-label">
                            Confidential Category
                          </InputLabel>
                          <Select
                            labelId="confidential-category-label"
                            value={confidentialSubcategory}
                            onChange={handleConfidentialSubcategoryChange}
                            label="Confidential Category"
                          >
                            {availableConfidentialSubcategories.map(
                              (subcategory) => (
                                <MenuItem
                                  key={subcategory.value}
                                  value={subcategory.value}
                                >
                                  {subcategory.label}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                  </Box>

                  {/* OSINT Intelligence */}
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={osintSelected}
                          onChange={(e) =>
                            handleOsintCheckboxChange(e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                          OSINT Intelligence
                        </Typography>
                      }
                    />

                    {osintSelected && (
                      <Box sx={{ ml: 4, mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel id="osint-category-label">
                            OSINT Category
                          </InputLabel>
                          <Select
                            labelId="osint-category-label"
                            value={osintSubcategory}
                            onChange={handleOsintSubcategoryChange}
                            label="OSINT Category"
                          >
                            {availableOsintSubcategories.map((subcategory) => (
                              <MenuItem
                                key={subcategory.value}
                                value={subcategory.value}
                              >
                                {subcategory.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                >
                  Time Period
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      label="Select Month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      views={["month", "year"]}
                      format="MMMM yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <Box sx={{ mt: 4 }}>
                    <SubmitButton
                      variant="contained"
                      onClick={handleCombinedSubmit}
                      disabled={
                        (!confidentialSelected && !osintSelected) ||
                        (confidentialSelected && !confidentialSubcategory) ||
                        (osintSelected && !osintSubcategory)
                      }
                      fullWidth
                      color="primary"
                      sx={{
                        borderRadius: "6px",
                        textTransform: "none",
                        fontWeight: 500,
                        py: 1,
                      }}
                    >
                      Generate Report
                    </SubmitButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </FormContainer>

      {/* Combined Reports Results */}
      {showCombinedReports && (
        <ReportContainer>
          <Card
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: "8px",
              boxShadow: theme.shadows[1],
              mt: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Combined Intelligence Report
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {selectedMonth ? selectedMonth.toFormat("MMMM yyyy") : ""}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.mode === 'dark'
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.primary.main, 0.1),
                      px: 2,
                      py: 0.5,
                      borderRadius: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Generated
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <ProcessingDashboard
                  processingQueue={combinedProcessingQueue}
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
