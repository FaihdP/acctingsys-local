use mongodb::{
  bson::Document, results::DeleteResult, Client
};

#[tauri::command]
pub async fn delete(
  client: tauri::State<'_, Client>,
  collection: String,
  filter: Document,
) -> Result<DeleteResult, ()> {
  let db = client.default_database().unwrap();
  let target_collection = db.collection::<Document>(&collection);
  
  let insert_result = target_collection.delete_many(filter, None).await.unwrap();

  Ok(insert_result)
}