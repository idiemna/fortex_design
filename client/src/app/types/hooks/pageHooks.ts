import { deleteType, getAllTypes } from "@/services/typesServices";
import { useContext, useEffect, useMemo, useState } from "react";
import { TypeRow } from "../page";
import { AuthContext } from "@/context/authContext";
import { DataContext, ITypes } from "@/context/dataContext";

export const useHooksPageType = () => {
  const { isAdmin } = useContext(AuthContext);
  const { types, fetchTypes } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [typeSelected, setTypeSelected] = useState<ITypes | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const getTypes = async () => {
    await fetchTypes();
    setLoading(false);
  };

  useEffect(() => {
    getTypes();
  }, []);

  const rows: TypeRow[] = types.map((type) => {
    return {
      ...type,
      createdAt: new Date(type.createdAt).toLocaleDateString(),
      properties: type.Properties.map((prop) => prop.name).join(", "),
    };
  });

  const handleDelete = async () => {
    if (typeSelected) {
      await deleteType(typeSelected.id);
      setOpenDelete(false);
      setTypeSelected(null);
    }
  };

  const actions = useMemo(() => {
    return isAdmin
      ? {
          create: () => {
            setOpen(true);
            setTypeSelected(null);
          },
          update: (item: TypeRow) => {
            setTypeSelected(types.find((type) => type.id === item.id) || null);
            setOpen(true);
          },
          delete: (item: TypeRow) => {
            setTypeSelected(types.find((type) => type.id === item.id) || null);
            setOpenDelete(true);
          },
        }
      : undefined;
  }, [isAdmin]);

  return {
    rows,
    loading,
    open,
    typeSelected,
    openDelete,
    actions,
    handleDelete,
    setOpen,
    setTypeSelected,
    setOpenDelete,
  };
};

export default useHooksPageType;
