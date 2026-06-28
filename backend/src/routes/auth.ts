import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'task-manager-secret-key';
const JWT_EXPIRES_IN = '24h';
const REFRESH_EXPIRES_IN = '7d';

interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

function generateTokens(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  db.prepare('INSERT INTO refresh_tokens (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)').run(
    uuidv4(), userId, refreshToken, expiresAt
  );

  return { token, refreshToken };
}

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    db.prepare('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)').run(
      id, name, email, hashedPassword
    );

    const { token, refreshToken } = generateTokens(id);

    res.status(201).json({
      user: { id, name, email, avatar: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { token, refreshToken } = generateTokens(user.id);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId) as UserRow | undefined;
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  });
});

// Refresh token
router.post('/refresh', (req: Request, res: Response) => {
  const { token: refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token required' });
  }

  const stored = db.prepare(
    'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > datetime(\'now\')'
  ).get(refreshToken) as { user_id: string } | undefined;

  if (!stored) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  // Delete old refresh token
  db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(refreshToken);

  // Generate new tokens
  const tokens = generateTokens(stored.user_id);

  res.json(tokens);
});

// Logout
router.post('/logout', authMiddleware, (req: AuthRequest, res: Response) => {
  db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(req.userId);
  res.json({ message: 'Logged out' });
});

export default router;
