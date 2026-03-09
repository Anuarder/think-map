use rusqlite::Connection;
use sha2::{Digest, Sha256};
use std::sync::Mutex;
use tauri::Manager;

mod commands;
mod database;
mod models;

pub struct AppState {
    pub db: Mutex<Connection>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_stronghold::Builder::new(|password| {
                let mut hasher = Sha256::new();
                hasher.update(password);
                hasher.finalize().to_vec()
            })
            .build(),
        )
        .setup(|app| {
            let home_dir = app.path().home_dir().map_err(|e| e.to_string())?;
            let app_data_dir = home_dir.join(".think");
            std::fs::create_dir_all(&app_data_dir)?;

            let db_path = app_data_dir.join("think.db");
            let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;
            database::initialize_schema(&conn).map_err(|e| e.to_string())?;

            app.manage(AppState {
                db: Mutex::new(conn),
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::projects::create_project,
            commands::projects::get_project,
            commands::projects::list_projects,
            commands::projects::update_project,
            commands::projects::delete_project,
            commands::messages::create_message,
            commands::messages::get_messages,
            commands::messages::update_message_links,
            commands::settings::get_setting,
            commands::settings::set_setting,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
