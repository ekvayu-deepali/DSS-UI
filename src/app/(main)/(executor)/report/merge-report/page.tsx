"use client";

import React from "react";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";

import { CardComponent } from "@/components/common/card";
import {
  PageHeader,
  TextInputField,
  TableComponent,
} from "@/components/common";
import { useMergeReportController } from "./merge-report.controller";

const MergeReport: React.FC = () => {
  const { getters, handlers, ref, pagination } = useMergeReportController();
  const { 
    documentName, 
    keywords, 
    topic, 
    breadcrumbs, 
    mergedReports = [], // Provide default empty array
    headers, 
    height 
  } = getters;
  const { 
    onDocumentNameChange, 
    onKeywordsChange, 
    onTopicChange, 
    handleSubmit, 
    changePage, 
    changeRows 
  } = handlers;

  return (
    <>
      <PageHeader
        title="Merge Report"
        breadcrumbs={breadcrumbs}
      />
      <CardComponent>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextInputField
                type="text"
                fullWidth
                required
                placeholder="e.g., Combined Intelligence Report 2024"
                label="Document Name"
                onChange={onDocumentNameChange}
                value={documentName}
                ref={ref.documentNameRef}
                validation={() => ({ isValid: true, message: "" })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInputField
                type="text"
                fullWidth
                required
                placeholder="e.g., intelligence, strategic, confidential"
                label="Keywords"
                onChange={onKeywordsChange}
                value={keywords}
                ref={ref.keywordsRef}
                validation={() => ({ isValid: true, message: "" })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInputField
                type="text"
                fullWidth
                required
                placeholder="e.g., Border Security"
                label="Topic"
                onChange={onTopicChange}
                value={topic}
                ref={ref.topicRef}
                validation={() => ({ isValid: true, message: "" })}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    textTransform: 'none',
                    px: 4,
                    py: 1,
                    borderRadius: 1,
                  }}
                >
                  Submit Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardComponent>

      {mergedReports.length > 0 && (
        <Box sx={{ mt: 3 }} ref={ref.measureRef}>
          <CardComponent>
            <TableComponent<any>
              isLoading={false}
              headerField={[
                { 
                  id: 'documentName', 
                  name: 'Document Name',
                  hidden: false,
                  type: 'text',
                  width: 200 
                },
                { 
                  id: 'keywords', 
                  name: 'Keywords',
                  hidden: false,
                  type: 'text',
                  width: 200 
                },
                { 
                  id: 'topic', 
                  name: 'Topic',
                  hidden: false,
                  type: 'text',
                  width: 150 
                },
                { 
                  id: 'createdAt', 
                  name: 'Created At',
                  hidden: false,
                  type: 'text',
                  width: 150 
                }
              ]}
              tableBody={mergedReports || []}
              paginationData={{
                onPageChange: (page) => changePage(page - 1),
                onRowsPerPageChange: changeRows,
                total: mergedReports?.length || 0,
                page: pagination.page + 1,
                limit: pagination.limit
              }}
              translation={{
                noDataTitle: "No Merged Reports Found"
              }}
              maxHeight={height}
            />
          </CardComponent>
        </Box>
      )}
    </>
  );
};

export default MergeReport;









