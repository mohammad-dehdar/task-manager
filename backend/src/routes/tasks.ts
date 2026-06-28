import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  due_date: string | null;
  project_id: string | null;
  project_name: string | null;
  created_at: string;
  updated_at: string;
}

function formatTask(row: TaskRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    status: row.status,
    dueDate: row.due_date,
    projectId: row.project_id,
    projectName: row.project_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const { status, priority, projectId, search } = req.query;

  let query = `SELECT t.*, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id WHERE 1=1`;
  const params: string[] = [];

  if (status) { query += ' AND t.status = ?'; params.push(status as string); }
  if (priority) { query += ' AND t.priority = ?'; params.push(priority as string); }
  if (projectId) { query += ' AND t.project_id = ?'; params.push(projectId as string); }
  if (search) { query += ' AND t.title LIKE ?'; params.push(`%${search}%`); }

  query += ' ORDER BY t.created_at DESC';
  const tasks = db.prepare(query).all(...params) as TaskRow[];
  res.json(tasks.map(formatTask));
});

router.get('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const task = db.prepare(`SELECT t.*, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id WHERE t.id = ?`).get(req.params.id) as TaskRow | undefined;
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(formatTask(task));
});

router.post('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const { title, description, priority, status, dueDate, projectId } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const id = uuidv4();
  db.prepare(`INSERT INTO tasks (id, title, description, priority, status, due_date, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(id, title, description || null, priority || 'medium', status || 'todo', dueDate || null, projectId || null);

  const task = db.prepare(`SELECT t.*, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id WHERE t.id = ?`).get(id) as TaskRow;
  res.status(201).json(formatTask(task));
});

router.patch('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const { title, description, priority, status, dueDate, projectId } = req.body;
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Task not found' });

  db.prepare(`UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), priority = COALESCE(?, priority), status = COALESCE(?, status), due_date = COALESCE(?, due_date), project_id = COALESCE(?, project_id), updated_at = datetime('now') WHERE id = ?`).run(title, description, priority, status, dueDate, projectId, req.params.id);

  const task = db.prepare(`SELECT t.*, p.name as project_name FROM tasks t LEFT JOIN projects p ON t.project_id = p.id WHERE t.id = ?`).get(req.params.id) as TaskRow;
  res.json(formatTask(task));
});

router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Task not found' });
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
  res.json({ message: 'Task deleted' });
});

export default router;
