"use client";
import TableDinamic from "@/components/table";
import { TYPES_HEADERS_COLUMNS } from "@/constants/typesHeaders";
import FormTypes from "./components/form";
import ConfirmDialog from "@/components/dialog";
import useHooksPageType from "./hooks/pageHooks";

export interface TypeRow {
  name: string;
  id: number;
  description: string;
  properties: string;
}

const TypesPage = () => {
  const {
    rows,
    loading,
    actions,
    open,
    setOpen,
    typeSelected,
    openDelete,
    setOpenDelete,
    handleDelete,
  } = useHooksPageType();

  return (
    <div>
      <TableDinamic
        headers={TYPES_HEADERS_COLUMNS}
        rows={rows}
        filter
        loading={loading}
        actions={actions}
      />
      <FormTypes
        open={open}
        onClose={() => setOpen(false)}
        typeData={
          typeSelected
            ? {
                ...typeSelected,
                properties:
                  typeSelected.Properties?.map((prop) => prop.id) || [],
              }
            : undefined
        }
      />

      <ConfirmDialog
        open={openDelete}
        title="Eliminar Tipo"
        message={`¿Estás seguro de que deseas eliminar el tipo "${typeSelected?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setOpenDelete(false)}
        confirmText="Eliminar"
        confirmColor="error"
      />
    </div>
  );
};

export default TypesPage;
