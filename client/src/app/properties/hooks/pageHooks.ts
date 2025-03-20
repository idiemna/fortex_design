import {
  deleteProperty,
  getAllProperties,
} from "@/services/propertiesServices";
import { Property } from "../components/form";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/authContext";

const useHooksPage = () => {
  const { isAdmin } = useContext(AuthContext);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [propertySelected, setPropertySelected] = useState<Property | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const getProperties = async () => {
    const properties = await getAllProperties();
    setLoading(false);
    setProperties(properties);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const rows = properties.map((type) => {
    return {
      name: type.name,
      id: type.id,
      type: type.type,
    };
  });

  const handleDelete = async () => {
    if (propertySelected) {
      await deleteProperty(propertySelected.id || 0);
      setProperties((prev) => prev.filter((t) => t.id !== propertySelected.id));
      setOpenDelete(false);
      setPropertySelected(null);
    }
  };

  const actions = useMemo(() => {
    return isAdmin
      ? {
          create: () => {
            setOpen(true);
          },
          update: (row: Property) => {
            setPropertySelected(row);
            setOpen(true);
          },
          delete: (row: Property) => {
            setPropertySelected(row);
            setOpenDelete(true);
          },
        }
      : undefined;
  }, [isAdmin]);

  const onClose = () => {
    setOpen(false);
    setPropertySelected(null);
  };

  const onCloseDelete = () => {
    setOpenDelete(false);
    setPropertySelected(null);
  };

  return {
    rows,
    loading,
    open,
    propertySelected,
    openDelete,
    actions,
    handleDelete,
    onClose,
    onCloseDelete,
  };
};

export default useHooksPage;
