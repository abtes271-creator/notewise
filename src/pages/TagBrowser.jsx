import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';

function TagBrowser() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const { notes, getAllTags } = useNotes();

  const allTags = getAllTags();

  // Filter notes that include this tag
  const taggedNotes = notes.filter(note => note.tags.includes(tag));

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none', border: 'none',
          color: '#888', cursor: 'pointer',
          fontSize: '14px', marginBottom: '24px',
          display: 'block'
        }}
      >
        ← All Notes
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800' }}>
          #{tag}
        </h1>
        <span style={{ color: '#aaa', fontSize: '14px' }}>
          {taggedNotes.length} {taggedNotes.length === 1 ? 'note' : 'notes'}
        </span>
      </div>

      {/* All tags as quick-switch chips */}
      <div style={{
        display: 'flex', gap: '8px',
        flexWrap: 'wrap', marginBottom: '32px'
      }}>
        {allTags.map(t => (
          <span
            key={t}
            onClick={() => navigate(`/tags/${t}`)}
            style={{
              fontSize: '12px',
              padding: '5px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              background: t === tag ? '#2d2d2d' : '#fff',
              color: t === tag ? '#fff' : '#555',
              border: '1px solid',
              borderColor: t === tag ? '#2d2d2d' : '#ddd',
              transition: 'all 0.15s'
            }}
          >
            #{t}
          </span>
        ))}
      </div>

      {/* Notes grid */}
      {taggedNotes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#bbb' }}>
          <p style={{ fontSize: '32px', marginBottom: '12px' }}>🏷️</p>
          <p>No notes tagged with #{tag}</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {taggedNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TagBrowser;