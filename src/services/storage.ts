import { invoke } from '@tauri-apps/api/core';
import type { ChatMessage, Project, ProjectSummary } from '../types';

export function createProject(name: string): Promise<Project> {
  return invoke<Project>('create_project', { name });
}

export function getProject(id: string): Promise<Project> {
  return invoke<Project>('get_project', { id });
}

export function listProjects(): Promise<ProjectSummary[]> {
  return invoke<ProjectSummary[]>('list_projects');
}

export function updateProject(
  id: string,
  name?: string,
  canvasData?: string,
): Promise<Project> {
  return invoke<Project>('update_project', {
    id,
    name: name ?? null,
    canvas_data: canvasData ?? null,
  });
}

export function deleteProject(id: string): Promise<void> {
  return invoke<void>('delete_project', { id });
}

export function createMessage(
  projectId: string,
  role: 'user' | 'assistant',
  content: string,
): Promise<ChatMessage> {
  return invoke<ChatMessage>('create_message', {
    project_id: projectId,
    role,
    content,
  });
}

export function getMessages(projectId: string): Promise<ChatMessage[]> {
  return invoke<ChatMessage[]>('get_messages', { project_id: projectId });
}

export function updateMessageLinks(id: string, linkedNodeIds: string[]): Promise<void> {
  return invoke<void>('update_message_links', {
    id,
    linked_node_ids: JSON.stringify(linkedNodeIds),
  });
}

export function getSetting(key: string): Promise<string | null> {
  return invoke<string | null>('get_setting', { key });
}

export function setSetting(key: string, value: string): Promise<void> {
  return invoke<void>('set_setting', { key, value });
}
