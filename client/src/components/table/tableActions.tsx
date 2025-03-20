import { IconButton, TableCell } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionsProps<T> {
  item: any;
  update?: (item: T) => void;
  delete?: (item: T) => void;
}

const TableActions = <T,>(actions: ActionsProps<T>) => {
  return (
    <TableCell sx={{ width: 100, textAlign: "center" }}>
      {actions.update && (
        <IconButton
          size="small"
          onClick={() => {
            actions.update ? actions.update(actions.item) : null;
          }}
        >
          <CreateIcon fontSize="small" />
        </IconButton>
      )}
      {actions.delete && (
        <IconButton
          size="small"
          onClick={() => {
            actions.delete ? actions.delete(actions.item) : null;
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </TableCell>
  );
};

export default TableActions;
