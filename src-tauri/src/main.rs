// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate app;
mod services;
mod db;
mod api;

use services::execute_migration_task;
use services::end_migration;
use db::find;
use db::save;
use db::update;
use db::delete;
use api::get_api_credentials;

use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use tauri::AppHandle;
use std::env;
use std::sync::OnceLock;

pub static APP_HANDLE: OnceLock<AppHandle> = OnceLock::new();

fn get_client_db() -> Client {
  let db_url = env::var("MONGODB_URL")
    .expect("ERROR: MONGODB_URL variable not found");

  let options = ClientOptions::parse(db_url.as_str())
    .expect("ERROR: Invalid database url");

  return Client::with_options(options).unwrap();
}   

fn main() {
  dotenv().ok();
  let client = get_client_db();
  
  tauri::Builder::default()
    .manage(client.clone())
    .invoke_handler(
      tauri::generate_handler![find, save, update, delete, get_api_credentials, end_migration]
    )
    .build(tauri::generate_context!())
    .expect("Error while running Tauri application")
    .run(|app_handle, event| match event {
      tauri::RunEvent::Ready => {
        APP_HANDLE.set(app_handle.clone()).expect("Failed to set global app handle");
        // Comenzar la tarea de migración después de iniciar la aplicación
        tauri::async_runtime::spawn(execute_migration_task(app_handle.clone()));
      },
      _ => {}
    })
}
