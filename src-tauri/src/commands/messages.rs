use crate::models::ChatMessage;
use crate::AppState;
use chrono::Utc;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub fn create_message(
    project_id: String,
    role: String,
    content: String,
    state: State<AppState>,
) -> Result<ChatMessage, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let id = Uuid::new_v4().to_string();
    let now = Utc::now().to_rfc3339();

    db.execute(
        "INSERT INTO messages (id, project_id, role, content, linked_node_ids, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        rusqlite::params![id, project_id, role, content, "[]", now],
    )
    .map_err(|e| e.to_string())?;

    Ok(ChatMessage {
        id,
        project_id,
        role,
        content,
        linked_node_ids: "[]".to_string(),
        created_at: now,
    })
}

#[tauri::command]
pub fn get_messages(
    project_id: String,
    state: State<AppState>,
) -> Result<Vec<ChatMessage>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    let mut stmt = db
        .prepare(
            "SELECT id, project_id, role, content, linked_node_ids, created_at FROM messages WHERE project_id = ?1 ORDER BY created_at ASC",
        )
        .map_err(|e| e.to_string())?;

    let messages = stmt
        .query_map(rusqlite::params![project_id], |row| {
            Ok(ChatMessage {
                id: row.get(0)?,
                project_id: row.get(1)?,
                role: row.get(2)?,
                content: row.get(3)?,
                linked_node_ids: row.get(4)?,
                created_at: row.get(5)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;

    Ok(messages)
}

#[tauri::command]
pub fn update_message_links(
    id: String,
    linked_node_ids: String,
    state: State<AppState>,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    db.execute(
        "UPDATE messages SET linked_node_ids = ?1 WHERE id = ?2",
        rusqlite::params![linked_node_ids, id],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}
