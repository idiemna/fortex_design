import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";

interface TableSkeletonProps {
  headers: { id: string; name: string }[];
  rowsCount?: number;
}

const TableSkeleton = ({ headers, rowsCount = 5 }: TableSkeletonProps) => {
  return (
    <Paper elevation={5}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id}>
                <Skeleton variant="text" width={100} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.id}>
                  <Skeleton variant="text" width="80%" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableSkeleton;
