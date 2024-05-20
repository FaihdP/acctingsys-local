use mongodb::{
  bson::Document, results::UpdateResult, Client
};

#[tauri::command]
pub async fn update(
  client: tauri::State<'_, Client>,
  collection: String,
  filter: Document,
  object: Document,
) -> Result<UpdateResult, ()> {
  let db = client.default_database().unwrap();
  let target_collection = db.collection::<Document>(&collection);
  
  let insert_result = target_collection.update_many(filter, object, None).await.unwrap();

  Ok(insert_result)
}