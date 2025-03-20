import {
  createProperty,
  getAllProperties,
  updateProperty,
} from "@/services/propertiesServices";
import { SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Property, PropertyFormProps } from "../components/form";
import { DataContext } from "@/context/dataContext";

const useFormProperties = ({ onClose, propertyData }: PropertyFormProps) => {
  const { fetchProperties } = useContext(DataContext);
  const [property, setProperty] = useState<Property>({
    name: "",
    type: "",
  });

  const [errors, setErrors] = useState<{ name?: string; type?: string }>({});

  useEffect(() => {
    if (propertyData) {
      setProperty(propertyData);
    }
  }, [propertyData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, name: "El nombre es obligatorio" }));
      } else if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "El nombre debe tener al menos 3 caracteres",
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    }
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setProperty((prev) => ({ ...prev, type: value }));

    if (!value) {
      setErrors((prev) => ({ ...prev, type: "Debes seleccionar un tipo" }));
    } else {
      setErrors((prev) => ({ ...prev, type: undefined }));
    }
  };

  const handleSave = async () => {
    let isValid = true;

    if (!property.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "El nombre es obligatorio" }));
      isValid = false;
    } else if (property.name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "El nombre debe tener al menos 3 caracteres",
      }));
      isValid = false;
    }

    if (!property.type) {
      setErrors((prev) => ({ ...prev, type: "Debes seleccionar un tipo" }));
      isValid = false;
    }

    if (!isValid) return;

    if (property.id) {
      await updateProperty(property);
    } else {
      await createProperty(property);
    }
    await fetchProperties();
    onClose();
  };

  return { property, errors, handleChange, handleChangeSelect, handleSave };
};

export default useFormProperties;
