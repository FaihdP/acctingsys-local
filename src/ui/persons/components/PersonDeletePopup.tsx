import DeletePopup from "@ui/core/components/DeletePopup"
import { Dispatch, SetStateAction } from "react"

interface DeleteProductPopupProps {
  isVisible: boolean
  onChangeIsVisible: Dispatch<SetStateAction<boolean>>
  documentsToDelete: string[]
  handleDeleteDocument: (documentsToDelete: string[], userId: string) => Promise<void>
}

export default function PersonDeletePopup({
  isVisible,
  onChangeIsVisible,
  documentsToDelete,
  handleDeleteDocument,
}: DeleteProductPopupProps) {
  if (!isVisible) return null
  return (
    <DeletePopup
      onChangeIsVisible={onChangeIsVisible}
      documentsToDelete={documentsToDelete}
      handleDeleteDocument={handleDeleteDocument}
      texts={{
        documentName: "persona",
        principal: "persona",
        secondary: "La persona ya no podra relacionarse a ninguna factura."
      }}
    />
  )
}