import { memo, useContext, useEffect, useRef, useState } from "react"
import { MigrationProviderContext, RetryMigration } from "../hooks/MigrationProvider"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { TableConfigHeaderProps, TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { MappedObject } from "@ui/table/interfaces/Row"
import updateMigrationInvoice from "@lib/services/migrationInvoice/updateMigrationInvoice"

const dataCache = new Map<string, Map<string, MappedObject>>();

const MigrationPopupTab = memo(function MigrationPopupTab({
  getData,
  tableConfig
}: {
  getData: (migrationId: string) => Promise<any>
  tableConfig: TableConfigProps
}) {
  const { migration } = useContext(MigrationProviderContext)
  const [documents, setDocuments] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef(1)
  const initialLoadAttempted = useRef(false)
  
  const cacheKey = `${migration?._id?.$oid}-${getData.name}`;

  useEffect(() => {
    if (!initialLoadAttempted.current) {
      initialLoadAttempted.current = true;
      
      if (dataCache.has(cacheKey)) {
        setDocuments(dataCache.get(cacheKey)!);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMigrationInvoices = async () => {
      if (dataCache.has(cacheKey)) {
        setDocuments(dataCache.get(cacheKey)!);
        return;
      }

      try {
        const migrationData = await getData(migration?._id?.$oid);
        const mappedData = mapData(migrationData.data);
        
        dataCache.set(cacheKey, mappedData);
        setDocuments(mappedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    
    fetchMigrationInvoices();
  }, [cacheKey]);

  return (
    <div className="flex flex-grow">
      <DynamicTable 
        config={tableConfig}
        initialData={documents}
        pageSelected={pageSelected}
        setPageSelected={setPageSelected}
        pagesNumber={pagesNumber}
      />
    </div>
  )
})

export default MigrationPopupTab
