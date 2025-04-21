// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate app;

use app::db;
use bson::bson;
use db::find;
use db::save;
use db::update;
use db::delete;
use app::api::get_api_credentials;
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use tauri::AppHandle;
use tauri::Manager;
use tokio::time::interval;
use std::env;
use std::sync::OnceLock;
use std::time::Duration;
use std::time::Instant;

static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();

fn get_client_db() -> Client {
  let db_url = env::var("MONGODB_URL")
    .expect("ERROR: MONGODB_URL variable not found");

  let options = ClientOptions::parse(db_url.as_str())
    .expect("ERROR: Invalid database url");

  return Client::with_options(options).unwrap();
}

async fn migration_recurring_task() {
  let mut interval = interval(Duration::from_secs(60)); // 10 segundos

  loop {
    interval.tick().await;
    println!("Ejecutando tarea en {:?}", Instant::now());
    if let Some(app_handle) = APP_HANDLE.get() {
      app_handle.emit_all("start_migration", bson!({ "message": "Hola from rust" })).unwrap();
    }    
  }
}

fn main() {
  dotenv().ok();
  // tauri::async_runtime::spawn(migration_recurring_task());
  tauri::Builder::default()
    .manage(get_client_db())
    .invoke_handler(
      tauri::generate_handler![
        find::find, 
        save::save, 
        update::update, 
        delete::delete,
        get_api_credentials::get_api_credentials,
      ]
    )
    .build(tauri::generate_context!())
    .expect("Error while running Tauri application")
    .run(|_app_handle, event| match event {
      tauri::RunEvent::Ready => APP_HANDLE.set(_app_handle.clone()).expect("Failed to set global app handle"),
      _ => {}
    })
}
