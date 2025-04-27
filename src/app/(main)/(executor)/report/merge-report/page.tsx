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
  ReportContainer,
} from "./merge-report.style";

const ReportExplorer: React.FC = () => {
  const { getters, handlers, ref } = useMergeReportController();
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
            bgcolor: "#f8fafc",
            borderRadius: "8px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 500, color: "#334155" }}
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
                          sx={{
                            color: "#94a3b8",
                            "&.Mui-checked": {
                              color: "#3b82f6",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: 500, color: "#334155" }}>
                          Confidential Intelligence
                        </Typography>
                      }
                    />

                    {confidentialSelected && (
                      <Box sx={{ ml: 4, mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel
                            id="confidential-category-label"
                            sx={{ color: "#64748b" }}
                          >
                            Confidential Category
                          </InputLabel>
                          <Select
                            labelId="confidential-category-label"
                            value={confidentialSubcategory}
                            onChange={handleConfidentialSubcategoryChange}
                            label="Confidential Category"
                            sx={{
                              bgcolor: "white",
                              ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e2e8f0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbd5e1",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3b82f6",
                                },
                            }}
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
                          sx={{
                            color: "#94a3b8",
                            "&.Mui-checked": {
                              color: "#3b82f6",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: 500, color: "#334155" }}>
                          OSINT Intelligence
                        </Typography>
                      }
                    />

                    {osintSelected && (
                      <Box sx={{ ml: 4, mt: 1 }}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel
                            id="osint-category-label"
                            sx={{ color: "#64748b" }}
                          >
                            OSINT Category
                          </InputLabel>
                          <Select
                            labelId="osint-category-label"
                            value={osintSubcategory}
                            onChange={handleOsintSubcategoryChange}
                            label="OSINT Category"
                            sx={{
                              bgcolor: "white",
                              ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e2e8f0",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#cbd5e1",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#3b82f6",
                                },
                            }}
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
                  sx={{ fontWeight: 500, color: "#334155" }}
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
                          sx: {
                            bgcolor: "white",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e2e8f0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#cbd5e1",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#3b82f6",
                            },
                          },
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
                      sx={{
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                        },
                        "&.Mui-disabled": {
                          bgcolor: "#e2e8f0",
                          color: "#94a3b8",
                        },
                        borderRadius: "6px",
                        textTransform: "none",
                        fontWeight: 500,
                        py: 1,
                        boxShadow:
                          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
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
              bgcolor: "#f8fafc",
              borderRadius: "8px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
                    sx={{ fontWeight: 600, color: "#334155" }}
                  >
                    Combined Intelligence Report
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    {selectedMonth ? selectedMonth.toFormat("MMMM yyyy") : ""}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#3b82f6",
                      bgcolor: "#eff6ff",
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
