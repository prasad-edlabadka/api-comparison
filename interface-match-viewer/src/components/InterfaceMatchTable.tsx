import React, { useState, useMemo } from 'react';
import type { GridColDef, GridCellParams } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { InterfaceMatch, MatchClassification } from '../types/InterfaceMatch';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, useTheme } from '@mui/material';

interface Props {
  data: InterfaceMatch[];
}

const matchClassifications: MatchClassification[] = [
  'fully matched',
  'partial match',
  'no match',
];

export const InterfaceMatchTable: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('');

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.javaClassFilename.toLowerCase().includes(search.toLowerCase()) ||
        row.javaInterfaceName.toLowerCase().includes(search.toLowerCase()) ||
        row.javaClassSummary.toLowerCase().includes(search.toLowerCase()) ||
        row.oasFilename.toLowerCase().includes(search.toLowerCase()) ||
        row.oasSummary.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter ? row.matchClassification === filter : true;
      return matchesSearch && matchesFilter;
    });
  }, [data, search, filter]);

  const columns: GridColDef[] = [
    { field: 'javaClassFilename', headerName: 'Java Class Filename', flex: 1, sortable: true },
    { field: 'javaInterfaceName', headerName: 'Java Interface Name', flex: 1, sortable: true },
    { field: 'javaClassSummary', headerName: 'Java Class Summary', flex: 2, sortable: false },
    { field: 'oasFilename', headerName: 'OAS Filename', flex: 1, sortable: true },
    { field: 'oasSummary', headerName: 'OAS Summary', flex: 2, sortable: false },
    { field: 'matchClassification', headerName: 'Match Classification', flex: 1, sortable: true },
    {
      field: 'matchPercentage',
      headerName: 'Match %',
      flex: 0.5,
      type: 'number',
      sortable: true,
      cellClassName: (params: GridCellParams) => {
        if (typeof params.value === 'number' && params.value > 90) return 'match-percentage-high';
        if (typeof params.value === 'number' && params.value > 75) return 'match-percentage-medium';
        return '';
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', height: 600, bgcolor: theme.palette.background.default, color: theme.palette.text.primary }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 2 }}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Match Classification</InputLabel>
          <Select
            value={filter}
            label="Match Classification"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {matchClassifications.map((mc) => (
              <MenuItem key={mc} value={mc}>{mc}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <style>{`
        .MuiDataGrid-cell.match-percentage-high {
          background-color: ${theme.palette.mode === 'dark' ? '#388e3c' : '#c8e6c9'} !important;
          color: ${theme.palette.mode === 'dark' ? '#fff' : '#1b5e20'} !important;
          border-radius: 4px;
          padding: 2px 8px;
        }
        .MuiDataGrid-cell.match-percentage-medium {
          background-color: ${theme.palette.mode === 'dark' ? '#ffb300' : '#ffe082'} !important;
          color: ${theme.palette.mode === 'dark' ? '#212121' : '#ff6f00'} !important;
          border-radius: 4px;
          padding: 2px 8px;
        }
      `}</style>
      <DataGrid
        rows={filteredData.map((row, idx) => ({ id: row._id || idx, ...row }))}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20, page: 0 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick
        autoHeight
        sx={{ bgcolor: theme.palette.background.paper }}
      />
    </Box>
  );
}; 