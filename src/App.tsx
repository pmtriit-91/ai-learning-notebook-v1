import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLessonProgress } from "./hooks/useLessonProgress";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Roadmap } from "./pages/Roadmap";
import { LessonPage } from "./pages/LessonPage";
import { PromptPlaybook } from "./pages/PromptPlaybook";
import { LearningLog } from "./pages/LearningLog";

function App() {
  const progress = useLessonProgress();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout progress={progress} />}>
          <Route path="/" element={<Dashboard progress={progress} />} />
          <Route path="/roadmap" element={<Roadmap progress={progress} />} />
          <Route path="/lesson/:id" element={<LessonPage progress={progress} />} />
          <Route path="/playbook" element={<PromptPlaybook />} />
          <Route path="/log" element={<LearningLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
