import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { db } from './db';
import type { User, LoginCredentials, RegisterData } from '../types/auth';

const JWT_SECRET = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function login({ email, password }: LoginCredentials) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email]
  });

  const user = result.rows[0];
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = await createToken(user as User);
  return { user, token };
}

export async function register({ email, password, name }: RegisterData) {
  const existingUser = await db.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: [email]
  });

  if (existingUser.rows.length > 0) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(password);
  const userId = crypto.randomUUID();

  await db.execute({
    sql: `INSERT INTO users (id, email, name, password_hash, role, subscription_tier)
          VALUES (?, ?, ?, ?, 'USER', 'FREE')`,
    args: [userId, email, name, hashedPassword]
  });

  const user = {
    id: userId,
    email,
    name,
    role: 'USER',
    subscriptionTier: 'FREE',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const token = await createToken(user as User);
  return { user, token };
}