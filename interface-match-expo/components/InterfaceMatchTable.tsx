import React, { useState, useMemo } from 'react';
import { ScrollView, Platform } from 'react-native';
import { TextInput, Button, useTheme, HelperText, Card } from 'react-native-paper';
import { View, Text } from './Themed';
import type { InterfaceMatch, MatchClassification } from '../types/InterfaceMatch';

interface Props {
  data: InterfaceMatch[];
}

const matchClassifications: MatchClassification[] = [
  'fully matched',
  'partial match',
  'no match',
];

const columns = [
  { key: 'javaClassFilename', label: 'Java Class Filename', sortable: true },
  { key: 'javaInterfaceName', label: 'Java Interface Name', sortable: true },
  { key: 'javaClassSummary', label: 'Java Class Summary', sortable: false },
  { key: 'oasFilename', label: 'OAS Filename', sortable: true },
  { key: 'oasSummary', label: 'OAS Summary', sortable: false },
  { key: 'matchClassification', label: 'Match Classification', sortable: true },
  { key: 'matchPercentage', label: 'Match %', sortable: true },
];

export const InterfaceMatchTable: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const filteredData = useMemo(() => {
    let result = data.filter((row) => {
      const matchesSearch =
        row.javaClassFilename.toLowerCase().includes(search.toLowerCase()) ||
        row.javaInterfaceName.toLowerCase().includes(search.toLowerCase()) ||
        row.javaClassSummary.toLowerCase().includes(search.toLowerCase()) ||
        row.oasFilename.toLowerCase().includes(search.toLowerCase()) ||
        row.oasSummary.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter ? row.matchClassification === filter : true;
      return matchesSearch && matchesFilter;
    });
    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const aVal = (a as any)[sortColumn];
        const bVal = (b as any)[sortColumn];
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [data, search, filter, sortColumn, sortAsc]);

  const pagedData = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  const getMatchCellStyle = (value: number, isWeb = false) => {
    if (value > 90) {
      if (isWeb) {
        return {
          backgroundColor: theme.dark ? '#388e3c' : '#c8e6c9',
          color: theme.dark ? '#fff' : '#1b5e20',
          borderRadius: 4,
          padding: '2px 8px',
          textAlign: 'center' as const,
          fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif',
        };
      } else {
        return {
          backgroundColor: theme.dark ? '#388e3c' : '#c8e6c9',
          color: theme.dark ? '#fff' : '#1b5e20',
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
          fontFamily: 'Effra',
        };
      }
    }
    if (value > 75) {
      if (isWeb) {
        return {
          backgroundColor: theme.dark ? '#ffb300' : '#ffe082',
          color: theme.dark ? '#212121' : '#ff6f00',
          borderRadius: 4,
          padding: '2px 8px',
          textAlign: 'center' as const,
          fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif',
        };
      } else {
        return {
          backgroundColor: theme.dark ? '#ffb300' : '#ffe082',
          color: theme.dark ? '#212121' : '#ff6f00',
          borderRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 2,
          fontFamily: 'Effra',
        };
      }
    }
    if (isWeb) {
      return { fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif' };
    } else {
      return { fontFamily: 'Effra' };
    }
  };

  if (Platform.OS === 'web') {
    const { DataGrid } = require('@mui/x-data-grid');
    const [webPage, setWebPage] = useState(0);
    const [webPageSize, setWebPageSize] = useState(rowsPerPage);
    const muiColumns = [
      { field: 'javaClassFilename', headerName: 'Java Class Filename', flex: 1, sortable: true },
      { field: 'javaInterfaceName', headerName: 'Java Interface Name', flex: 1, sortable: true },
      {
        field: 'javaClassSummary',
        headerName: 'Java Class Summary',
        flex: 2,
        sortable: false,
        minWidth: 200,
        renderCell: (params: any) => (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.4, height: '100%', display: 'flex', alignItems: 'center' }}>
            {params.value}
          </div>
        ),
      },
      { field: 'oasFilename', headerName: 'OAS Filename', flex: 1, sortable: true },
      {
        field: 'oasSummary',
        headerName: 'OAS Summary',
        flex: 2,
        sortable: false,
        minWidth: 200,
        renderCell: (params: any) => (
          <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.4, height: '100%', display: 'flex', alignItems: 'center' }}>
            {params.value}
          </div>
        ),
      },
      { field: 'matchClassification', headerName: 'Match Classification', flex: 1, sortable: true },
      {
        field: 'matchPercentage',
        headerName: 'Match %',
        flex: 0.5,
        type: 'number',
        sortable: true,
        renderCell: (params: any) => (
          <span style={getMatchCellStyle(params.value, true)}>{params.value}</span>
        ),
      },
    ];
    return (
      <div style={{
        width: '100%',
        maxWidth: '100vw',
        padding: 24,
        boxSizing: 'border-box',
        overflowX: 'auto',
        minWidth: 900,
        fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif',
        background: theme.dark ? '#0A2239' : '#fff',
        color: theme.dark ? '#fff' : '#222'
      }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 8, padding: 8, width: 300 }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ marginBottom: 8, padding: 8, width: 300 }}
        >
          <option value="">All</option>
          {matchClassifications.map((mc) => (
            <option key={mc} value={mc}>{mc}</option>
          ))}
        </select>
        <DataGrid
          rows={filteredData.map((row, idx) => ({ id: row._id || idx, ...row }))}
          columns={muiColumns}
          pageSize={webPageSize}
          onPageSizeChange={setWebPageSize}
          pagination
          paginationMode="client"
          page={webPage}
          onPageChange={setWebPage}
          rowsPerPageOptions={[10, 20, 50]}
          style={{ minWidth: 900, height: 600, fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif', background: theme.dark ? '#0A2239' : '#fff', color: theme.dark ? '#fff' : '#222' }}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
        />
        <div style={{ height: 60, overflowY: 'auto', fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif', marginTop: 8 }}>
          <span style={{ fontFamily: 'Effra, Arial, Helvetica Neue, sans-serif' }}>
            You can search, filter, and sort by clicking on the column headers. If this message is long enough, it should scroll vertically. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam eros, eget luctus quam orci in velit.
          </span>
        </div>
      </div>
    );
  }

  // Mobile: Card layout
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="Search"
        value={search}
        onChangeText={setSearch}
        style={{ marginBottom: 8 }}
        mode="outlined"
      />
      <TextInput
        label="Filter by Match Classification"
        value={filter}
        onChangeText={setFilter}
        style={{ marginBottom: 8 }}
        mode="outlined"
        placeholder="Type or select: fully matched, partial match, no match"
      />
      {pagedData.map((row, idx) => (
        <Card key={row._id || idx} style={{ marginBottom: 12 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 4, fontFamily: 'Effra' }}>{row.javaInterfaceName}</Text>
            <Text style={{ fontFamily: 'Effra' }}>Java Class Filename: {row.javaClassFilename}</Text>
            <Text style={{ fontFamily: 'Effra' }}>Java Class Summary: {row.javaClassSummary}</Text>
            <Text style={{ fontFamily: 'Effra' }}>OAS Filename: {row.oasFilename}</Text>
            <Text style={{ fontFamily: 'Effra' }}>OAS Summary: {row.oasSummary}</Text>
            <Text style={{ fontFamily: 'Effra' }}>Match Classification: {row.matchClassification}</Text>
            <Text style={getMatchCellStyle(row.matchPercentage) as any}>
              Match %: {row.matchPercentage}
            </Text>
          </Card.Content>
        </Card>
      ))}
      <HelperText type="info" style={{ fontFamily: 'Effra', maxHeight: 60 }}>
        <ScrollView style={{ maxHeight: 60 }}>
          <Text style={{ fontFamily: 'Effra' }}>
            You can search, filter, and sort by clicking on the column headers.
          </Text>
        </ScrollView>
      </HelperText>
    </ScrollView>
  );
}; 