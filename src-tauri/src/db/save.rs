use mongodb::{
  bson::Document, results::{InsertManyResult}, Client
};

#[tauri::command]
pub async fn save(
  client: tauri::State<'_, Client>,
  collection: String,
  objects: Vec<Document>,
) -> Result<InsertManyResult, ()> {
  let db = client.default_database().unwrap();
  let target_collection = db.collection::<Document>(&collection);
  let insert_result = target_collection.insert_many(objects, None).await.unwrap();

  Ok(insert_result)
}