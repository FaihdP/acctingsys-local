import { memo, useContext, useEffect, useRef, useState } from "react"
import { MigrationProviderContext } from "../hooks/MigrationProvider"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { TableConfigHeaderProps, TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { MappedObject } from "@ui/table/interfaces/Row"

const dataCache = new Map<string, Map<string, MappedObject>>();

const MigrationPopupTab = memo(function MigrationPopupTab({
  getData,
  columns
}: {
  getData: (migrationId: string) => Promise<any>
  columns: TableConfigHeaderProps["columns"]
}) {
  const { migration } = useContext(MigrationProviderContext)
  const [migrationInvoices, setMigrationInvoices] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef(1)
  const initialLoadAttempted = useRef(false)
  
  const cacheKey = `${migration?._id?.$oid}-${getData.name}`;

  useEffect(() => {
    if (!initialLoadAttempted.current) {
      initialLoadAttempted.current = true;
      
      if (dataCache.has(cacheKey)) {
        setMigrationInvoices(dataCache.get(cacheKey)!);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMigrationInvoices = async () => {
      if (dataCache.has(cacheKey)) {
        setMigrationInvoices(dataCache.get(cacheKey)!);
        return;
      }

      try {
        const migrationData = await getData(migration?._id?.$oid);
        const mappedData = mapData(migrationData.data);
        
        dataCache.set(cacheKey, mappedData);
        setMigrationInvoices(mappedData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }
    
    fetchMigrationInvoices();
  }, [cacheKey]);

  const migrationInvoicesTableConfig: TableConfigProps = {
    header: {
      picker: true,
      columns
    }
  }

  return (
    <div className="flex flex-grow w-full">
      <DynamicTable 
        config={migrationInvoicesTableConfig}
        initialData={migrationInvoices}
        pageSelected={pageSelected}
        setPageSelected={setPageSelected}
        pagesNumber={pagesNumber}
      />
    </div>
  )
})

export default MigrationPopupTab
