use bson::{bson, Bson};
use serde::{Deserialize, Serialize};

use futures::TryStreamExt;
use mongodb::{
  bson::{self, Document}, 
  options::{CountOptions, FindOptions},
  Client
};

#[derive(Deserialize)]
pub struct Page {
  size: u8,
  number: u32
}

#[derive(Serialize, Deserialize)]
pub struct FindResults {
  pages_number: u32,
  data: Vec<Document>
}

#[tauri::command]
pub async fn find(
  client: tauri::State<'_, Client>,
  collection: String,
  filter: bson::Document,
  page: Page,
  sort: bson::Document,
  fields: Option<bson::Document>
) -> Result<FindResults, String> {
  let db = client.default_database().unwrap();
  let target_collection: mongodb::Collection<Document> = db.collection::<Document>(&collection);
  let count_options = CountOptions::builder().build();
  let find_options = FindOptions::builder()
    // Pagination
    .skip(u64::from((page.number - 1) * u32::from(page.size)))
    .limit(i64::from(page.number * u32::from(page.size)))
    .projection(fields)
    // Sort
    .sort(sort)
    .build();

  let pages_number = (target_collection
    .count_documents(filter.clone(), count_options)
    .await
    .unwrap() as f32 / page.size as f32).ceil() as u32;

  let mut cursor = target_collection
    .find(filter.clone(), find_options)
    .await
    .unwrap();

  let mut results = Vec::new();
  while let Some(result) = cursor.try_next().await.unwrap() {
    results.push(result);
  }

  let find_results: Bson = bson!({
    "pages_number": pages_number,
    "data": results
  });

  Ok(bson::from_bson(find_results).unwrap())
}