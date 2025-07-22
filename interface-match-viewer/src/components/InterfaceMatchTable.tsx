import React, { useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
    { field: 'matchPercentage', headerName: 'Match %', flex: 0.5, type: 'number', sortable: true },
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