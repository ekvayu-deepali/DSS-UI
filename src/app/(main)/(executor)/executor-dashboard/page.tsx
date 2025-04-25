"use client";

import React from "react";
import { Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faMapMarkerAlt,
  faSearch,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../../../components/common/statCard";
import PageHeader from "../../../../components/common/pageHeader";
import { styles } from "./styles";

const stats = [
  {
    name: 'Documents',
    value: '143',
    icon: <FontAwesomeIcon icon={faFileAlt} size="lg" color="#3b82f6" />,
    change: '+12%'
  },
  {
    name: 'Geo Data',
    value: '28',
    icon: <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" color="#22c55e" />,
    change: '+5%'
  },
  {
    name: 'Searches',
    value: '1,254',
    icon: <FontAwesomeIcon icon={faSearch} size="lg" color="#a855f7" />,
    change: '+18%'
  },
  {
    name: 'Users',
    value: '15',
    icon: <FontAwesomeIcon icon={faUsers} size="lg" color="#f59e0b" />,
    change: '+2%'
  },
];

export default function Dashboard() {
  return (
    <Box sx={styles.container}>
      <PageHeader
        title="Dashboard"
        actions={null}
      />

      <Box sx={styles.statsContainer}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, sm: 4 }, width: '100%' }}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ width: { xs: '100%', sm: '47%', md: '47%', lg: '23%' }, flexGrow: 1 }}>
              <StatCard
                name={stat.name}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
