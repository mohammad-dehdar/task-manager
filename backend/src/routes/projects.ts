import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  color: string;
  task_count: number;
  created_at: string;
  updated_at: string;
}

function formatProject(row: ProjectRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    color: row.color,
    taskCount: row.task_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const projects = db.prepare(`SELECT p.*, COUNT(t.id) as task_count FROM projects p LEFT JOIN tasks t ON p.id = t.project_id GROUP BY p.id ORDER BY p.created_at DESC`).all() as ProjectRow[];
  res.json(projects.map(formatProject));
});

router.get('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const project = db.prepare(`SELECT p.*, COUNT(t.id) as task_count FROM projects p LEFT JOIN tasks t ON p.id = t.project_id WHERE p.id = ? GROUP BY p.id`).get(req.params.id) as ProjectRow | undefined;
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(formatProject(project));
});

router.post('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const { name, description, color } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const id = uuidv4();
  db.prepare(`INSERT INTO projects (id, name, description, color) VALUES (?, ?, ?, ?)`).run(id, name, description || null, color || '#fd6519');

  const project = db.prepare(`SELECT p.*, 0 as task_count FROM projects p WHERE p.id = ?`).get(id) as ProjectRow;
  res.status(201).json(formatProject(project));
});

router.patch('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const { name, description, color } = req.body;
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Project not found' });

  db.prepare(`UPDATE projects SET name = COALESCE(?, name), description = COALESCE(?, description), color = COALESCE(?, color), updated_at = datetime('now') WHERE id = ?`).run(name, description, color, req.params.id);

  const project = db.prepare(`SELECT p.*, COUNT(t.id) as task_count FROM projects p LEFT JOIN tasks t ON p.id = t.project_id WHERE p.id = ? GROUP BY p.id`).get(req.params.id) as ProjectRow;
  res.json(formatProject(project));
});

router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Project not found' });
  db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
  res.json({ message: 'Project deleted' });
});

export default router;
