# GitHub Profile Finder

A modern, responsive web application built with React and Vite that allows users to search and explore GitHub profiles. View user information, contribution calendars, and browse through their repositories with ease.

## 🚀 Features

- **Profile Search**: Search for any GitHub user by username
- **User Information**: Display avatar, bio, followers count, and public repositories
- **Contribution Calendar**: Visualize user's GitHub contribution activity using an interactive heatmap
- **Repository Browser**: Browse all public repositories with pagination
- **Repository Search**: Filter repositories by name within the results
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Theme**: Modern dark UI with Tailwind CSS styling

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **GitHub Integration**: GitHub REST API
- **Calendar Visualization**: react-github-calendar

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- GitHub Personal Access Token (for API access)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RoshanKumar9421/Github-profile-finder.git
   cd Github-profile-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add your GitHub Personal Access Token:
   ```env
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

   > **Note**: To get a GitHub token, go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens) and generate a new token with `repo` scope.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173` to view the application.

## 📖 Usage

1. Enter a GitHub username in the search field
2. Click the "Search" button
3. View the user's profile information and contribution calendar
4. Browse through their repositories using the pagination controls
5. Use the repository search to filter results by name

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Linting

```bash
npm run lint
```

## 📱 Preview Production Build

```bash
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing user and repository data
- [react-github-calendar](https://github.com/grubersjoe/react-github-calendar) for the contribution calendar component
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
