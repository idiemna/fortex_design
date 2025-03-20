"use client";
import ConfirmDialog from "@/components/dialog";
import TableDinamic from "@/components/table";
import { PROPERTIES_HEADERS_COLUMNS } from "@/constants/propertiesHeaders";
import PropertyForm from "./components/form";
import useHooksPage from "./hooks/pageHooks";

const PropertiesPage = () => {
  const {
    rows,
    loading,
    actions,
    open,
    onClose,
    propertySelected,
    openDelete,
    handleDelete,
    onCloseDelete,
  } = useHooksPage();

  return (
    <div>
      <TableDinamic
        headers={PROPERTIES_HEADERS_COLUMNS}
        rows={rows}
        filter
        loading={loading}
        actions={actions}
      />

      <PropertyForm
        open={open}
        onClose={onClose}
        propertyData={propertySelected || undefined}
      />

      <ConfirmDialog
        open={openDelete}
        title="Eliminar Tipo"
        message={`¿Estás seguro de que deseas eliminar el tipo "${propertySelected?.name}"?`}
        onConfirm={handleDelete}
        onCancel={onCloseDelete}
        confirmText="Eliminar"
        confirmColor="error"
      />
    </div>
  );
};

export default PropertiesPage;
