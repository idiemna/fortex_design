import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableMobileProps<T> {
  headers: { id: string; name: string }[];
  rows: Array<{ [key: string]: any }>;
  actions?: { update?: (item: T) => void; delete?: (item: T) => void };
}

export const TableMobile = <T,>({
  headers,
  rows,
  actions,
}: TableMobileProps<T>) => {
  return (
    <Box>
      {rows.map((row, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            {headers.map((header) => (
              <Typography key={header.id} variant="body2">
                <strong>{header.name}:</strong> {row[header.id] as string}
              </Typography>
            ))}
            {actions && (
              <Box mt={1}>
                {actions.update && (
                  <IconButton size="small" onClick={() => actions.update?.(row as T)}>
                    <CreateIcon fontSize="small" />
                  </IconButton>
                )}
                {actions.delete && (
                  <IconButton size="small" onClick={() => actions.delete?.(row as T)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
