import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { IDataTableProps } from "../../types/interfaces";

function DataTable<T>({
  columns,
  data,
  onSort,
  order,
  orderBy,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: IDataTableProps<T>) {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id as string}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => onSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id as string}>
                    {String(row[column.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
}

export default DataTable;
