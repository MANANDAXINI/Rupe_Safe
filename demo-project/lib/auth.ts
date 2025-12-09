import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { prisma } from './prisma';
export * from './tokens';
import { USER_TOKEN_NAME, ADMIN_TOKEN_NAME, verifyUserToken, verifyAdminToken } from './tokens';

// --- Password Hashing Functions ---
export function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

// --- Cookie Functions ---
export async function getUserFromCookie() {
    const cookieStore = cookies();
    const token = cookieStore.get(USER_TOKEN_NAME)?.value;
    if (!token) return null;

    const decoded = verifyUserToken(token);
    if (!decoded) return null;

    // Fetch user from DB to ensure they still exist
    try {
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, image: true, isAdmin: true }
        });
        return user;
    } catch {
        return null;
    }
}

export function getAdminFromCookie() {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME)?.value;
    if (!token) return null;
    return verifyAdminToken(token);
}

// --- Auth Protection Helper ---
export function requireAdmin() {
    const admin = getAdminFromCookie();
    if (!admin) {
        throw new Error('Unauthorized');
    }
    return admin;
}