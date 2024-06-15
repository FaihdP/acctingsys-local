use std::env::{self};
use base64::prelude::*;

#[derive(Debug, serde::Serialize)]
pub struct Credentials {
  aws_access_key_id: String,
  aws_secret_access_key: String,
  aws_lambda_region: String
}

pub fn decode(string: String) -> Result<String, String> {
  return Ok(
    String::from_utf8(
      BASE64_STANDARD.decode(string).expect("ASDAS")
    ).expect("ERROR")
  );
}

#[tauri::command]
pub fn get_credentials() -> Result<Credentials, String> {
  let aws_access_key_id = env::var("AWS_ACCESS_KEY_ID")
    .expect("ERROR: AWS_ACCESS_KEY_ID variable not found");
  let aws_secret_access_key = env::var("AWS_SECRET_ACCESS_KEY")
    .expect("ERROR: AWS_SECRET_ACCESS_KEY variable not found");
  let aws_lambda_region = env::var("AWS_LAMBDA_REGION")
    .expect("ERROR: AWS_LAMBDA_REGION variable not found");
  
  let credentials: Credentials = Credentials {
    aws_access_key_id: decode(aws_access_key_id.clone()).unwrap(),
    aws_secret_access_key: decode(aws_secret_access_key.clone()).unwrap(),
    aws_lambda_region: decode(aws_lambda_region.clone()).unwrap(),
  };

  Ok(credentials)
}