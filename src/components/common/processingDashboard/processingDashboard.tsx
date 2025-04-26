"use client";

import React from "react";
import {
  faFileLines,
  faCheckCircle,
  faClock,
  faCircleExclamation,
  faChevronRight,
  faArrowUpRightFromSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@/components/common";

import {
  DashboardContainer,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  QueueItemContainer,
  QueueItemContent,
  IconContainer,
  ItemDetails,
  ItemName,
  StatusContainer,
  StatusText,
  ItemActions,
  TimeText,
  ActionButton,
  SearchItemContainer,
  SearchQueryContainer,
  SearchQuery,
  SearchTime,
  FooterLink,
} from "./processingDashboard.style";

// Define types for the component props
interface ProcessingItem {
  id: string;
  name: string;
  status: "completed" | "processing" | "failed";
  time: string;
}

interface SearchItem {
  id: string;
  query: string;
  time: string;
}

interface ProcessingDashboardProps {
  processingQueue: ProcessingItem[];
  recentSearches: SearchItem[];
  onProcessingItemClick: (id: string) => void;
}

/**
 * ProcessingDashboard Component
 *
 * Displays a dashboard with processing queue and recent searches
 */
const ProcessingDashboard: React.FC<ProcessingDashboardProps> = ({
  processingQueue,
  recentSearches,
  onProcessingItemClick,
}) => {
  // Helper function to render status icon based on status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Icon icon={faCheckCircle} size="small" color="#4caf50" onlyIcon />
        );
      case "processing":
        return <Icon icon={faClock} size="small" color="#ff9800" onlyIcon />;
      case "failed":
        return (
          <Icon
            icon={faCircleExclamation}
            size="small"
            color="#f44336"
            onlyIcon
          />
        );
      default:
        return null;
    }
  };

  // Helper function to render status text based on status
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "processing":
        return "Processing...";
      case "failed":
        return "Failed";
      default:
        return "";
    }
  };

  return (
    <DashboardContainer>
      {/* Processing Queue Card */}
      <Card>
        <CardHeader
          title={<CardTitle>Processing Queue</CardTitle>}
          subheader={<CardDescription>Recent document processing activity</CardDescription>}
        />
        <CardContent>
          {processingQueue.map((item) => (
            <QueueItemContainer
              key={item.id}
              onClick={() => onProcessingItemClick(item.id)}
              isCompleted={item.status === "completed"}
              isProcessing={item.status === "processing"}
            >
              <QueueItemContent>
                <IconContainer>
                  <Icon
                    icon={faFileLines}
                    size="medium"
                    color="#1976d2"
                    onlyIcon
                  />
                </IconContainer>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <StatusContainer>
                    {renderStatusIcon(item.status)}
                    <StatusText>{getStatusText(item.status)}</StatusText>
                  </StatusContainer>
                </ItemDetails>
              </QueueItemContent>
              <ItemActions>
                <TimeText>{item.time}</TimeText>
                <ActionButton>
                  <Icon
                    icon={faChevronRight}
                    size="small"
                    color="#757575"
                    onlyIcon
                  />
                </ActionButton>
              </ItemActions>
            </QueueItemContainer>
          ))}
        </CardContent>
        <CardFooter>
          <FooterLink href="/documents">
            View all documents
            <Icon
              icon={faArrowUpRightFromSquare}
              size="small"
              color="#1976d2"
              onlyIcon
            />
          </FooterLink>
        </CardFooter>
      </Card>

      {/* Recent Searches Card */}
      <Card>
        <CardHeader
          title={<CardTitle>Recent Searches</CardTitle>}
          subheader={<CardDescription>Your recent document queries</CardDescription>}
        />
        <CardContent>
          {recentSearches.map((search) => (
            <SearchItemContainer key={search.id}>
              <SearchQueryContainer>
                <Icon icon={faSearch} size="small" color="#1976d2" onlyIcon />
                <SearchQuery>{search.query}</SearchQuery>
              </SearchQueryContainer>
              <SearchTime>{search.time}</SearchTime>
            </SearchItemContainer>
          ))}
        </CardContent>
        <CardFooter>
          <FooterLink href="#">
            View search history
            <Icon
              icon={faArrowUpRightFromSquare}
              size="small"
              color="#1976d2"
              onlyIcon
            />
          </FooterLink>
        </CardFooter>
      </Card>
    </DashboardContainer>
  );
};

export default ProcessingDashboard;
