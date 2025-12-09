import jwt from 'jsonwebtoken';

// --- Constants ---
export const USER_TOKEN_SECRET = process.env.JWT_SECRET || 'your-default-user-secret-key';
export const ADMIN_TOKEN_SECRET = process.env.ADMIN_JWT_SECRET || 'your-default-admin-secret-key';
export const USER_TOKEN_NAME = 'token';
export const ADMIN_TOKEN_NAME = 'admin-token';

// --- Standard User Authentication Functions ---
export function generateUserToken(user: { id: string; email: string }) {
    return jwt.sign({ id: user.id, email: user.email }, USER_TOKEN_SECRET, { expiresIn: '1d' });
}

export function verifyUserToken(token: string) {
    try {
        return jwt.verify(token, USER_TOKEN_SECRET) as { id: string; email: string };
    } catch (error) {
        return null;
    }
}

// --- Admin Panel Authentication Functions ---
export function generateAdminToken(user: { email: string }) {
    return jwt.sign({ email: user.email, isAdmin: true }, ADMIN_TOKEN_SECRET, { expiresIn: '18h' });
}

export function verifyAdminToken(token: string) {
    try {
        const decoded = jwt.verify(token, ADMIN_TOKEN_SECRET) as { email: string; isAdmin: boolean };
        if (decoded.isAdmin) return decoded;
        return null;
    } catch (error) {
        return null;
    }
}
