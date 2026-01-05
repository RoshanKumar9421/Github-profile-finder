# GitHub Profile Finder

A React application built with Vite that allows users to search for GitHub profiles, view user information, repositories, and contribution calendars.

## Features

- Search GitHub users by username
- Display user profile information (avatar, bio, followers, repos)
- Show contribution activity using GitHub calendar
- List and search through user repositories
- Pagination for repositories
- Responsive design with Tailwind CSS

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your GitHub Personal Access Token:
   ```
   VITE_GITHUB_TOKEN=your_github_personal_access_token_here
   ```
   You can create a token at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).

4. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- react-github-calendar
- GitHub API

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
