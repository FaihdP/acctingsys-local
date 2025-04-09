use std::env::{self};
use base64::prelude::*;

#[derive(Debug, serde::Serialize)]
pub struct APICredentials {
  api_url: String,
  api_key: String,
}

pub fn decode(string: String) -> Result<String, String> {
  return Ok(
    String::from_utf8(
      BASE64_STANDARD.decode(string).expect("ERROR: String can't be decoding")
    ).expect("ERROR: String can't be instanced")
  );
}

#[tauri::command]
pub fn get_api_credentials() -> Result<APICredentials, String> {
  let api_key = env::var("API_KEY")
    .expect("ERROR: API_KEY variable not found");
  let api_url = env::var("API_URL")
    .expect("ERROR: API_URL variable not found");
  
  let credentials: APICredentials = APICredentials {
    api_key: decode(api_key.clone()).unwrap(),
    api_url: decode(api_url.clone()).unwrap(),
  };

  Ok(credentials)
}