import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const REPOS_PER_PAGE = 10;

export default function GithubProfile() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProfile(null);
      setRepos([]);

      const headers = {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      };

      // Profile
      const profileRes = await fetch(
        `https://api.github.com/users/${username}`,
        { headers }
      );
      if (!profileRes.ok) {
        const err = await profileRes.json();
        throw new Error(err.message || "User not found");
      }
      const profileData = await profileRes.json();

      // Repositories (ALL)
      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      );
      if (!repoRes.ok) throw new Error("Failed to fetch repositories");

      const repoData = await repoRes.json();

      setProfile(profileData);
      setRepos(repoData);
      setPage(1);
      setSearch("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedRepos = filteredRepos.slice(
    (page - 1) * REPOS_PER_PAGE,
    page * REPOS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredRepos.length / REPOS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          GitHub Profile Finder
        </h1>

        {/* SEARCH */}
        <div className="flex gap-3 justify-center mb-6">
          <input
            className="px-4 py-3 rounded-lg bg-[#111827] text-white
                       placeholder-gray-400 border border-gray-700
                       focus:ring-2 focus:ring-indigo-500 outline-none w-72"
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={fetchProfile}
            className="bg-indigo-600 hover:bg-indigo-700
                       px-6 py-3 rounded-lg font-semibold shadow"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-indigo-400">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-400 font-medium">{error}</p>
        )}

        {profile && (
          <>
            {/* PROFILE CARD */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl
                            p-6 mt-10 shadow-xl flex gap-6 items-center">
              <img
                src={profile.avatar_url}
                alt="avatar"
                className="w-32 h-32 rounded-full border-4 border-indigo-500"
              />

              <div>
                <h2 className="text-2xl font-bold">{profile.login}</h2>
                <p className="text-gray-400 mt-1">
                  {profile.bio || "No bio available"}
                </p>

                <div className="flex gap-6 mt-3 text-gray-300">
                  <span>👥 {profile.followers} Followers</span>
                  <span>📦 {profile.public_repos} Repos</span>
                </div>

                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 text-indigo-400 hover:underline"
                >
                  Visit Profile →
                </a>
              </div>
            </div>

            {/* CONTRIBUTION HEATMAP */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl
                            p-6 mt-10 shadow-xl">
              <h3 className="text-xl font-semibold mb-4">
                🔥 Contribution Activity
              </h3>

              <GitHubCalendar
                username={profile.login}
                blockSize={14}
                blockMargin={4}
                fontSize={14}
                colorScheme="dark"
                theme={{
                  dark: [
                    "#161b22",
                    "#0e4429",
                    "#006d32",
                    "#26a641",
                    "#39d353",
                  ],
                }}
              />
            </div>

            {/* REPO SEARCH */}
            <div className="mt-10">
              <input
                className="px-4 py-2 rounded-lg bg-[#111827] text-white
                           border border-gray-700 w-full md:w-1/2"
                placeholder="Search repositories..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* REPOSITORIES */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {displayedRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="bg-[#111827] border border-gray-800
                             p-5 rounded-xl shadow-lg
                             hover:border-indigo-500 transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold text-indigo-400 hover:underline"
                  >
                    {repo.name}
                  </a>

                  <p className="text-gray-400 mt-2">
                    {repo.description || "No description provided"}
                  </p>

                  <div className="flex gap-5 text-sm text-gray-300 mt-4">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>📝 {repo.language || "N/A"}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}