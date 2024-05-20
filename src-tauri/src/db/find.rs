use futures::TryStreamExt;
use mongodb::{
  bson, 
  bson::Document, 
  options::FindOptions,
  Client
};

#[derive(serde::Deserialize)]
pub struct Page {
  size: u8,
  number: u32
}

#[tauri::command]
pub async fn find(
  client: tauri::State<'_, Client>,
  collection: String,
  filter: bson::Document,
  page: Page,
  sort: bson::Document 
) -> Result<Vec<Document>, String> {
  let db = client.default_database().unwrap();
  let target_collection = db.collection::<Document>(&collection);
  
  let opt = FindOptions::builder()
    // Pagination
    .skip(u64::from((page.number - 1) * u32::from(page.size)))
    .limit(i64::from(page.number * u32::from(page.size)))
    // Sort
    .sort(sort)
    .build();

  let mut cursor = target_collection
    .find(filter, opt)
    .await
    .unwrap();

  let mut results = Vec::new();
  while let Some(result) = cursor.try_next().await.unwrap() {
    results.push(result);
  }

  Ok(results)
}