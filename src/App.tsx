import { LessonProgressProvider } from "./features/roadmap/hooks/useLessonProgress";
import { AppRouter } from "./router";

function App() {
  return (
    <LessonProgressProvider>
      <AppRouter />
    </LessonProgressProvider>
  );
}

export default App;
