import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import TableSkeleton from "./tableSkeleton";
import { TableMobile } from "./tableMobile";
import TableActions from "./tableActions";

interface Actions<T> {
  create?: () => void;
  update?: (item: T) => void;
  delete?: (item: T) => void;
}

interface TableDinamicProps<T> {
  headers: { id: string; name: string }[];
  rows: Array<{ [key: string]: any }>;
  loading?: boolean;
  filter?: boolean;
  actions?: Actions<T>;
}

const TableDinamic = <T,>({
  headers,
  rows,
  filter,
  loading,
  actions,
}: TableDinamicProps<T>) => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredRows = useMemo(() => {
    return rows
      .filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase())
        )
      )
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, filterValue, page, rowsPerPage]);

  if (loading) {
    return <TableSkeleton headers={headers} />;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          {filter && (
            <TextField
              label="Buscar"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{ flex: 1 }}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}
          {actions?.create && (
            <Button
              variant="contained"
              onClick={actions.create}
              sx={{ minWidth: "120px", height: "55px" }}
            >
              Crear
            </Button>
          )}
        </Stack>
      </div>

      {isMobile ? (
        <TableMobile headers={headers} rows={filteredRows} actions={actions} />
      ) : (
        <Paper elevation={5} sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {actions && (
                  <TableCell sx={{ width: 100, textAlign: "center" }}>
                    Acciones
                  </TableCell>
                )}
                {headers.map((header) => (
                  <TableCell key={header.id}>{header.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  {actions && <TableActions {...actions} item={row} />}
                  {headers.map((header) => (
                    <TableCell key={header.id}>
                      {String((row as { [key: string]: any })[header.id])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};

export default TableDinamic;
