import {
  Button,
  Drawer,
  TextField,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
  Stack,
} from "@mui/material";
import Select from "@mui/material/Select";
import useHooksFormType from "../hooks/formHooks";

export interface Type {
  id?: number;
  name: string;
  description: string;
  properties: Array<number>;
}

export interface FormTypesProps {
  open: boolean;
  onClose: () => void;
  typeData?: Type;
}

const FormTypes = ({ open, onClose, typeData }: FormTypesProps) => {
  const {
    type,
    handleChange,
    errors,
    handleChangeMultiple,
    properties,
    handleSave,
  } = useHooksFormType({ open, onClose, typeData });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h6">
            {typeData ? "Editar Tipo" : "Crear Tipo"}
          </Typography>
          <Button onClick={onClose}>Cerrar</Button>
        </Stack>

        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={type.name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={type.description}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-multiple-chip-label">Propiedades</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={type.properties}
            onChange={handleChangeMultiple}
            input={
              <OutlinedInput id="select-multiple-chip" label="Propiedades" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={properties.find((p) => p.id === value)?.name}
                  />
                ))}
              </Box>
            )}
          >
            {properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>
                {property.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={handleSave}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Box>
    </Drawer>
  );
};

export default FormTypes;
