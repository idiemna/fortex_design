import { useContext, useEffect, useState } from "react";
import { FormTypesProps, Type } from "../components/form";
import { SelectChangeEvent } from "@mui/material";
import { createType, updateType } from "@/services/typesServices";
import { DataContext } from "@/context/dataContext";

const useHooksFormType = ({ onClose, typeData }: FormTypesProps) => {
  const { properties, fetchProperties, fetchTypes} = useContext(DataContext);
  const [type, setType] = useState<Type>({
    name: "",
    description: "",
    properties: [],
  });

  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (properties.length === 0) {
      fetchProperties();
    }
  }, []);

  useEffect(() => {
    if (typeData) {
      setType(typeData);
    }
  }, [typeData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setType((prev) => ({ ...prev, [name]: value }));

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

  const handleChangeMultiple = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target;
    setType((prev) => ({ ...prev, properties: value as number[] }));
  };

  const handleSave = async () => {
    if (!type.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "El nombre es obligatorio" }));
      return;
    }

    if (type.name.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "El nombre debe tener al menos 3 caracteres",
      }));
      return;
    }

    if (typeData) {
      await updateType(type);
    } else {
      await createType(type);
    }
    await fetchTypes();
    onClose();
  };

  return {
    type,
    properties,
    errors,
    handleChange,
    handleChangeMultiple,
    handleSave,
  };
};

export default useHooksFormType;
