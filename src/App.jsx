import { Header } from "./components/Header/Header";
import { Postlist } from "./features/posts/Postlist";
import Popular from "./components/Header/Popular";
import Explore from "./components/Header/Explore";
import { SubRedditPosts } from "./features/posts/subreddits/subredditPosts";

import { Routes, Route } from "react-router-dom";
import { KeyDownSubredditResults } from "./features/SearchBar/KeyDownSubredditResults";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Postlist />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/r/:subRedditName" element={<SubRedditPosts />} />
        <Route path="/search/:query" element={<KeyDownSubredditResults />} />
      </Routes>
    </div>
  );
}

export default App;
