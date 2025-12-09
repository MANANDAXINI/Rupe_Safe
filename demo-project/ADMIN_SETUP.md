# Admin Panel Setup Guide

## Overview
Your admin panel has been successfully created with the following features:
- ✅ Admin authentication and protected routes
- ✅ Dashboard with statistics
- ✅ Service management (add/edit/delete)
- ✅ Blog management with rich text editor
- ✅ Sign out functionality (top bar and sidebar)

## Getting Started

### 1. Database Setup
Make sure your database is configured in your `.env` file with `DATABASE_URL`.

### 2. Run Database Migrations
```bash
npx prisma migrate dev --name add_admin_features
```

### 3. Create Your First Admin User
Run the setup script to create an admin account:
```bash
node scripts/create-admin.js
```

Follow the prompts to enter:
- Admin email
- Admin password
- Admin name (optional)

### 4. Access the Admin Panel

1. **Sign In**: Navigate to `/auth/signin` and sign in with your admin credentials
2. **Admin Panel**: After signing in, go to `/admin` to access the admin dashboard

## Admin Panel Features

### Dashboard (`/admin`)
- View statistics (total services, blogs, published blogs)
- Quick action buttons to manage content

### Service Management (`/admin/services`)
- View all services
- Add new services with:
  - Title
  - Description
  - Icon (emoji or text)
  - Multiple features
- Edit existing services
- Delete services

### Blog Management (`/admin/blogs`)
- View all blog posts (published and drafts)
- Create new blogs with:
  - Title (auto-generates slug)
  - Rich text editor with formatting:
    - Bold, italic, headings
    - Bullet and numbered lists
    - Blockquotes
    - Links
    - Images
  - Excerpt
  - Cover image
  - Publish/draft toggle
- Edit existing blogs
- Delete blogs
- Preview blogs

## Rich Text Editor Features

The blog editor includes:
- **Text Formatting**: Bold, italic
- **Headings**: H1, H2, H3
- **Lists**: Bullet points and numbered lists
- **Blockquotes**: For quotes and callouts
- **Links**: Add hyperlinks to text
- **Images**: Insert images via URL
- **Undo/Redo**: Full editing history

## Security

- All admin routes are protected by middleware
- Only users with `isAdmin: true` can access admin panel
- JWT-based authentication with HTTP-only cookies
- API routes verify admin status before allowing operations

## Troubleshooting

### Can't access admin panel
- Make sure you've created an admin user using the setup script
- Verify you're signed in with an admin account
- Check that `isAdmin` is set to `true` in the database

### TypeScript errors
```bash
npx prisma generate
npm run typecheck
```

### Database issues
```bash
npx prisma studio  # Open database browser
npx prisma migrate reset  # Reset database (WARNING: deletes all data)
```

## Next Steps

1. Customize the admin panel styling to match your brand
2. Add more features as needed (user management, analytics, etc.)
3. Set up image upload functionality for blog images
4. Create public-facing blog pages to display your content

## File Structure

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── page.tsx            # Dashboard
│   ├── services/
│   │   ├── page.tsx        # Service list
│   │   └── new/
│   │       └── page.tsx    # Add service form
│   └── blogs/
│       ├── page.tsx        # Blog list
│       └── new/
│           └── page.tsx    # Create blog form
├── api/
│   ├── admin/
│   │   ├── services/       # Service API routes
│   │   └── blogs/          # Blog API routes
│   └── auth/
│       └── signout/        # Sign out route
components/
├── admin/
│   ├── AdminSidebar.tsx    # Sidebar navigation
│   ├── RichTextEditor.tsx  # Blog editor
│   ├── ServiceList.tsx     # Service list component
│   └── BlogList.tsx        # Blog list component
lib/
├── auth.ts                 # Auth utilities
└── prisma.ts               # Prisma client
middleware.ts               # Route protection
prisma/
└── schema.prisma           # Database schema
scripts/
└── create-admin.js         # Admin setup script
```

Enjoy your new admin panel! 🎉
