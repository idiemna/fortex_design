"use client";
import { getAllProperties } from "@/services/propertiesServices";
import { getAllTypes } from "@/services/typesServices";
import React, { createContext, useState, useEffect } from "react";

interface ITypes {
  id: number;
  name: string;
  description: string;
  Properties: Array<{ id: number; name: string }>;
}

interface IProperties {
  id: number;
  name: string;
}

interface IDataContext {
  types: ITypes[];
  properties: IProperties[];
  fetchTypes: () => void;
  fetchProperties: () => void;
}

export const DataContext = createContext<IDataContext>({
  types: [],
  properties: [],
  fetchProperties: () => {},
  fetchTypes: () => {},
});

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [types, setTypes] = useState<ITypes[]>([]);
  const [properties, setProperties] = useState<IProperties[]>([]);

  const fetchTypes = async () => {
    const types = await getAllTypes();
    setTypes(types);
  };

  const fetchProperties = async () => {
    const properties = await getAllProperties();
    setProperties(properties);
  };

  return (
    <DataContext.Provider
      value={{ types, properties, fetchTypes, fetchProperties }}
    >
      {children}
    </DataContext.Provider>
  );
}
