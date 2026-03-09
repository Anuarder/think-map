use crate::models::{Project, ProjectSummary};
use crate::AppState;
use chrono::Utc;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub fn create_project(name: String, state: State<AppState>) -> Result<Project, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let id = Uuid::new_v4().to_string();
    let now = Utc::now().to_rfc3339();

    db.execute(
        "INSERT INTO projects (id, name, canvas_data, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5)",
        rusqlite::params![id, name, "{}", now, now],
    )
    .map_err(|e| e.to_string())?;

    Ok(Project {
        id,
        name,
        canvas_data: "{}".to_string(),
        created_at: now.clone(),
        updated_at: now,
    })
}

#[tauri::command]
pub fn get_project(id: String, state: State<AppState>) -> Result<Project, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    db.query_row(
        "SELECT id, name, canvas_data, created_at, updated_at FROM projects WHERE id = ?1",
        rusqlite::params![id],
        |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                canvas_data: row.get(2)?,
                created_at: row.get(3)?,
                updated_at: row.get(4)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn list_projects(state: State<AppState>) -> Result<Vec<ProjectSummary>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    let mut stmt = db
        .prepare("SELECT id, name, updated_at FROM projects ORDER BY updated_at DESC")
        .map_err(|e| e.to_string())?;

    let projects = stmt
        .query_map([], |row| {
            Ok(ProjectSummary {
                id: row.get(0)?,
                name: row.get(1)?,
                updated_at: row.get(2)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;

    Ok(projects)
}

#[tauri::command]
pub fn update_project(
    id: String,
    name: Option<String>,
    canvas_data: Option<String>,
    state: State<AppState>,
) -> Result<Project, String> {
    if name.is_none() && canvas_data.is_none() {
        return get_project(id, state);
    }

    let db = state.db.lock().map_err(|e| e.to_string())?;
    let now = Utc::now().to_rfc3339();

    let mut set_clauses = Vec::new();
    let mut params: Vec<Box<dyn rusqlite::types::ToSql>> = Vec::new();

    if let Some(ref n) = name {
        set_clauses.push(format!("name = ?{}", params.len() + 1));
        params.push(Box::new(n.clone()));
    }

    if let Some(ref data) = canvas_data {
        set_clauses.push(format!("canvas_data = ?{}", params.len() + 1));
        params.push(Box::new(data.clone()));
    }

    set_clauses.push(format!("updated_at = ?{}", params.len() + 1));
    params.push(Box::new(now));

    let id_idx = params.len() + 1;
    params.push(Box::new(id.clone()));

    let sql = format!(
        "UPDATE projects SET {} WHERE id = ?{}",
        set_clauses.join(", "),
        id_idx,
    );

    let param_refs: Vec<&dyn rusqlite::types::ToSql> = params.iter().map(|p| p.as_ref()).collect();
    db.execute(&sql, param_refs.as_slice())
        .map_err(|e| e.to_string())?;

    db.query_row(
        "SELECT id, name, canvas_data, created_at, updated_at FROM projects WHERE id = ?1",
        rusqlite::params![id],
        |row| {
            Ok(Project {
                id: row.get(0)?,
                name: row.get(1)?,
                canvas_data: row.get(2)?,
                created_at: row.get(3)?,
                updated_at: row.get(4)?,
            })
        },
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_project(id: String, state: State<AppState>) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;

    db.execute(
        "DELETE FROM projects WHERE id = ?1",
        rusqlite::params![id],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}
