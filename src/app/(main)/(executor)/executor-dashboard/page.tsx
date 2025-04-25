"use client";

import React from "react";
import {
  faFileAlt,
  faMapMarkerAlt,
  faSearch,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../../components/common/statCard";
import PageHeader from "../../../../components/common/pageHeader";
import { Icon } from "../../../../components/common/icon";
import {
  DashboardContainer,
  StatsContainer,
  StatsGrid,
  StatCardWrapper
} from "./styles";

const stats = [
  {
    name: 'Documents',
    value: '143',
    icon: <Icon icon={faFileAlt} size="large" color="#3b82f6" onlyIcon />,
    change: '+12%'
  },
  {
    name: 'Geo Data',
    value: '28',
    icon: <Icon icon={faMapMarkerAlt} size="large" color="#22c55e" onlyIcon />,
    change: '+5%'
  },
  {
    name: 'Searches',
    value: '1,254',
    icon: <Icon icon={faSearch} size="large" color="#a855f7" onlyIcon />,
    change: '+18%'
  },
  {
    name: 'Users',
    value: '15',
    icon: <Icon icon={faUsers} size="large" color="#f59e0b" onlyIcon />,
    change: '+2%'
  },
];

export default function Dashboard() {
  return (
    <DashboardContainer>
      <PageHeader
        title="Dashboard"
        actions={null}
      />

      <StatsContainer>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCardWrapper key={index}>
              <StatCard
                name={stat.name}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
              />
            </StatCardWrapper>
          ))}
        </StatsGrid>
      </StatsContainer>
    </DashboardContainer>
  );
}
