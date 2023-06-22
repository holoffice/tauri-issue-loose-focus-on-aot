// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::WindowBuilder;

fn main() {
    let app = tauri::Builder::default()
        .build(tauri::generate_context!())
        .unwrap();

    WindowBuilder::new(
        &app.handle(),
        "window-2",
        tauri::WindowUrl::App("index.html".into()),
    )
    .inner_size(200.0, 300.0)
    .build()
    .unwrap();

    app.run(|_handle, _e| {})
}
