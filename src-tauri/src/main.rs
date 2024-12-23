// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate app;

use app::db;
use db::find;
use db::save;
use db::update;
use db::delete;
use app::api::get_credentials;
use dotenv::dotenv;
use mongodb::{options::ClientOptions, Client};
use std::env;

fn get_client_db() -> Client {
  let db_url = env::var("MONGODB_URL")
    .expect("ERROR: MONGODB_URL variable not found");

  let options = ClientOptions::parse(db_url.as_str())
    .expect("ERROR: Invalid database url");

  return Client::with_options(options).unwrap();
}

fn main() {
  dotenv().ok();
  tauri::Builder::default()
    .manage(get_client_db())
    .invoke_handler(
      tauri::generate_handler![
        find::find, 
        save::save, 
        update::update, 
        delete::delete,
        get_credentials::get_credentials,
      ]
    )
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
