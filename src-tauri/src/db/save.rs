use mongodb::{
  bson::Document, results::InsertOneResult, Client
};

#[tauri::command]
pub async fn save(
  client: tauri::State<'_, Client>,
  collection: String,
  object: Document,
) -> Result<InsertOneResult, ()> {
  let db = client.default_database().unwrap();
  let target_collection = db.collection::<Document>(&collection);
  
  let insert_result = target_collection.insert_one(object, None).await.unwrap();

  Ok(insert_result)
}