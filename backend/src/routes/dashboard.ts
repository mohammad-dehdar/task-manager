import { Router, Response } from 'express';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const totalTasks = (db.prepare('SELECT COUNT(*) as count FROM tasks').get() as any).count;

  const completedToday = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE status = 'done' AND date(updated_at) = date('now')`).get() as any).count;

  const inProgress = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE status = 'in-progress'`).get() as any).count;

  const overdue = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE due_date < datetime('now') AND status != 'done'`).get() as any).count;

  const recentTasks = db.prepare(`SELECT id, title, status, priority, updated_at FROM tasks ORDER BY updated_at DESC LIMIT 5`).all();

  const todoCount = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE status = 'todo'`).get() as any).count;
  const inProgressCount = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE status = 'in-progress'`).get() as any).count;
  const doneCount = (db.prepare(`SELECT COUNT(*) as count FROM tasks WHERE status = 'done'`).get() as any).count;

  const upcomingDeadlines = db.prepare(`SELECT id, title, due_date, priority FROM tasks WHERE due_date IS NOT NULL AND due_date >= datetime('now') AND status != 'done' ORDER BY due_date ASC LIMIT 5`).all();

  res.json({
    stats: { totalTasks, completedToday, inProgress, overdue },
    recentTasks: recentTasks.map((t: any) => ({
      id: t.id,
      title: t.title,
      status: t.status,
      priority: t.priority,
      updatedAt: t.updated_at,
    })),
    tasksByStatus: { todo: todoCount, 'in-progress': inProgressCount, done: doneCount },
    upcomingDeadlines: upcomingDeadlines.map((t: any) => ({
      id: t.id,
      title: t.title,
      dueDate: t.due_date,
      priority: t.priority,
    })),
  });
});

export default router;
