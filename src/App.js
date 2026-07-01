import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './context/NotesContext';
import Navbar from './components/Navbar';
import AllNotes from './pages/AllNotes';
import Editor from './pages/Editor';
import ReadingView from './pages/ReadingView';
import TagBrowser from './pages/TagBrowser';
import NotFound from './pages/NotFound';

function App() {
  return (
    <NotesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllNotes />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/note/:id" element={<ReadingView />} />
          <Route path="/tags/:tag" element={<TagBrowser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;