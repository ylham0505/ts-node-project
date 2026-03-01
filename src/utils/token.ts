import jwt from 'jsonwebtoken';

function getJwtSecret(): string {
  const jwtSecretEnv = process.env["JWT_SECRET"];
  if (!jwtSecretEnv) {
    throw new Error("JWT_SECRET env variable is required!");
  }
  return jwtSecretEnv;
}

export function generateToken(userId: string, role: "user" | "admin"): string {
  const payload = { id: userId, role };
  const secret = getJwtSecret();
  const expiresIn = process.env['EXPIRES_IN'] || '7d';
  
  // Явное приведение для обхода проблемы с типами
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}