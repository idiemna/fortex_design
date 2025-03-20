import {
  Button,
  Drawer,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import useFormProperties from "../hooks/formHooks";

export interface Property {
  id?: number;
  name: string;
  type: string;
}

export interface PropertyFormProps {
  open: boolean;
  onClose: () => void;
  propertyData?: Property;
}

const PropertyForm = ({ open, onClose, propertyData }: PropertyFormProps) => {
  const { property, handleChange, errors, handleChangeSelect, handleSave } =
    useFormProperties({ open, onClose, propertyData });

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3}>
        <Typography variant="h6">
          {propertyData ? "Editar" : "Crear"} Propiedad
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={property.name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth error={!!errors.type}>
          <InputLabel>Selecciona un tipo</InputLabel>
          <Select
            value={property.type}
            onChange={handleChangeSelect}
            label="Selecciona un tipo"
          >
            <MenuItem value="text">Texto</MenuItem>
            <MenuItem value="number">Número</MenuItem>
            <MenuItem value="date">Fecha</MenuItem>
            <MenuItem value="checkbox">Check</MenuItem>
          </Select>
          {errors.type && (
            <Typography color="error" variant="caption">
              {errors.type}
            </Typography>
          )}
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

export default PropertyForm;
