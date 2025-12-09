/**
 * Admin Setup Script
 * 
 * This script helps you create your first admin user.
 * Run this script once to set up an admin account.
 * 
 * Usage:
 *   node scripts/create-admin.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
    console.log('\n=== Admin User Setup ===\n');

    try {
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password: ');
        const name = await question('Enter admin name (optional): ');

        if (!email || !password) {
            console.error('Email and password are required!');
            process.exit(1);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('\nUser already exists. Updating to admin...');
            await prisma.user.update({
                where: { email },
                data: { isAdmin: true }
            });
            console.log('✓ User updated to admin successfully!');
        } else {
            // Hash password
            const passwordHash = await bcrypt.hash(password, 12);

            // Create new admin user
            await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    name: name || null,
                    isAdmin: true,
                    provider: 'local'
                }
            });
            console.log('✓ Admin user created successfully!');
        }

        console.log('\nYou can now sign in at /auth/signin with:');
        console.log(`Email: ${email}`);
        console.log('Password: [the password you entered]');
        console.log('\nThen navigate to /admin to access the admin panel.\n');

    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        await prisma.$disconnect();
        rl.close();
    }
}

createAdmin();
