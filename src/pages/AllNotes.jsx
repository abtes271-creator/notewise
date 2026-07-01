import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';

function AllNotes() {
  const { notes, createNote, getAllTags } = useNotes();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const tags = getAllTags();

  // Filter notes by title or content matching the search text
  const filteredNotes = notes.filter(note => {
    const text = (note.title + ' ' + note.content).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  function handleNewNote() {
    const id = createNote();
    navigate(`/editor/${id}`);
  }

  if (notes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>📝</p>
        <h2 style={{ marginBottom: '8px' }}>No notes yet</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>
          Start writing your first note.
        </p>
        <button
          onClick={handleNewNote}
          style={{
            background: '#2d2d2d',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          + Create Note
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
        My Notes
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '14px',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          outline: 'none',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}
      />

      {/* Tag chips */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {tags.map(tag => (
            <span
              key={tag}
              onClick={() => navigate(`/tags/${tag}`)}
              style={{
                fontSize: '12px',
                padding: '5px 12px',
                borderRadius: '20px',
                background: '#fff',
                border: '1px solid #ddd',
                cursor: 'pointer'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Notes grid */}
      {filteredNotes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#bbb', padding: '60px 0' }}>
          No notes match "{search}"
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllNotes;