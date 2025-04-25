"use client";

import React, { ReactElement, ReactNode } from "react";
import { Grid, Typography } from "@mui/material";
import { Breadcrumb, IBreadcrumbDisplay } from "@/components/common/breadcrumb";
import SearchBar from "@/components/common/searchbar/searchbar";
import { GridActionItem, PageHeaderBox } from "./pageHeader.style";

interface IPageHeader {
  title: string;
  breadcrumbs?: IBreadcrumbDisplay[];
  actions?: ReactNode;
  showSearch?: boolean;
  onSearch?: (searchTerm: string, filters: string[]) => void;
}

/**
 * Page Header Component
 * @param {IPageHeader} props
 * @return {ReactElement}
 */
export function PageHeader(props: IPageHeader): ReactElement {
  const { title, actions, breadcrumbs, showSearch = false, onSearch } = props;

  return (
    <PageHeaderBox>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {breadcrumbs && (
            <Breadcrumb breadcrumbs={breadcrumbs ? breadcrumbs : []} />
          )}
        </Grid>
        <GridActionItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showSearch && <SearchBar onSearch={onSearch} />}
          {actions}
        </GridActionItem>
      </Grid>
    </PageHeaderBox>
  );
}

export default PageHeader;
