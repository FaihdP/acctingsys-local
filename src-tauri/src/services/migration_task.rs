use std::env;
use std::sync::atomic::{AtomicBool, Ordering};

use bson::{bson, doc, Document};
use chrono::{DateTime, Duration as ChronoDuration, Local, NaiveTime, Timelike, Datelike, TimeZone};
use mongodb::Client;
use tauri::{AppHandle, Manager};
use tokio::time::{sleep, Duration};
use crate::APP_HANDLE;

static IS_MIGRATION_RUNNING: AtomicBool = AtomicBool::new(false);

pub async fn execute_migration_task(app_handle: AppHandle) {
  let db_client = app_handle.state::<Client>();
  
  let (hour, minute, second) = get_execution_time(&db_client).await;
  println!("Programmed execution time: {:02}:{:02}:{:02}", hour, minute, second);

  loop {
    let now = Local::now();
    let mut next_execution = Local.with_ymd_and_hms(
      now.year(), 
      now.month(), 
      now.day(), 
      hour, 
      minute, 
      second
    ).unwrap();

    if IS_MIGRATION_RUNNING.load(Ordering::SeqCst) { 
      if now > next_execution + ChronoDuration::minutes(10) {
        IS_MIGRATION_RUNNING.store(false, Ordering::SeqCst);
      }
      continue; 
    }
    
    if now > next_execution { 
      next_execution = next_execution + ChronoDuration::days(1); 
    }
    
    let wait_duration = next_execution - now;
    let wait_secs = wait_duration.num_seconds() as u64;
    
    println!("Next execution: {:?}", next_execution);
    println!("Waiting {} seconds", wait_secs);
    
    sleep(Duration::from_secs(wait_secs)).await;
    
    println!("Executing task at {:?}", Local::now());
    

    if let Some(app_handle) = APP_HANDLE.get() {
      app_handle
        .emit_all(
          "start_migration", 
          bson!({ "message": "N/A" })
        ).unwrap();
      IS_MIGRATION_RUNNING.store(true, Ordering::SeqCst);
    }
  }
}

async fn get_execution_time(db_client: &Client) -> (u32, u32, u32) {
  let db = db_client.default_database().unwrap();
  let coll = db.collection::<Document>("configs");
  let default_time = get_default_execution_time();
  
  if let Ok(Some(doc)) = coll.find_one(doc! { "tag": "migration_execution_hour" }, None).await {
    match doc.get("value") {
      Some(bson::Bson::String(time_str)) => {
        if !(time_str.len() >= 8) { return default_time; }
        if let Ok(dt) = DateTime::parse_from_rfc3339(time_str) {
          let local_dt = dt.with_timezone(&Local);
          (local_dt.hour(), local_dt.minute(), local_dt.second())
        } else {
          if let Ok(time) = NaiveTime::parse_from_str(&time_str[0..8], "%H:%M:%S") {
            (time.hour(), time.minute(), time.second())
          } else {
            default_time
          }
        }
      },
      _ => default_time
    }
  } else {
    println!("ERROR: Failed to find migration execution time configuration");
    return default_time;
  }
}

fn get_default_execution_time() -> (u32, u32, u32) {
  let hour = env::var("DEFAULT_MIGRATION_EXECUTION_HOUR")
    .expect("ERROR: DEFAULT_MIGRATION_EXECUTION_HOUR variable not found");
  let minute = env::var("DEFAULT_MIGRATION_EXECUTION_MINUTE")
    .expect("ERROR: DEFAULT_MIGRATION_EXECUTION_MINUTE variable not found");
  let second = env::var("DEFAULT_MIGRATION_EXECUTION_SECOND")
    .expect("ERROR: DEFAULT_MIGRATION_EXECUTION_SECOND variable not found");
  
  (
    hour.parse::<u32>().unwrap(), 
    minute.parse::<u32>().unwrap(), 
    second.parse::<u32>().unwrap()
  )
}

#[tauri::command]
pub async fn end_migration() {
  let db_client = APP_HANDLE.get().unwrap().state::<Client>();
  let now = Local::now();
  let (hour, minute, second) = get_execution_time(&db_client).await;
  let execution_datetime = Local.with_ymd_and_hms(
    now.year(), 
    now.month(), 
    now.day(), 
    hour, 
    minute, 
    second
  ).unwrap();
  

  loop {
    if now == execution_datetime { sleep(Duration::from_secs(1)).await; }
    IS_MIGRATION_RUNNING.store(false, Ordering::SeqCst);
    break;
  }

}