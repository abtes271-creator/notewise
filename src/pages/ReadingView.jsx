import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNotes } from '../context/NotesContext';

function getReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function ReadingView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, deleteNote } = useNotes();

  const note = getNoteById(id);

  if (!note) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p style={{ color: '#888', marginBottom: '16px' }}>Note not found.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#2d2d2d', color: 'white',
            border: 'none', padding: '10px 20px',
            borderRadius: '8px', cursor: 'pointer'
          }}
        >
          ← Back to Notes
        </button>
      </div>
    );
  }

  function handleDelete() {
    if (window.confirm('Delete this note?')) {
      deleteNote(Number(id));
      navigate('/');
    }
  }

  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none',
            color: '#888', cursor: 'pointer', fontSize: '14px'
          }}
        >
          ← All Notes
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate(`/editor/${id}`)}
            style={{
              padding: '7px 14px',
              background: '#f5f5f5', border: 'none',
              borderRadius: '8px', fontSize: '12px',
              fontWeight: '600', color: '#555', cursor: 'pointer'
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '7px 14px',
              background: '#fff0f0', border: 'none',
              borderRadius: '8px', fontSize: '12px',
              fontWeight: '600', color: '#ef4444', cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '36px',
        fontWeight: '800',
        lineHeight: '1.2',
        marginBottom: '16px',
        color: '#1a1a1a'
      }}>
        {note.title || 'Untitled Note'}
      </h1>

      {/* Meta — date + reading time */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        fontSize: '13px',
        color: '#aaa'
      }}>
        <span>📅 {formattedDate}</span>
        <span>⏱ {getReadingTime(note.content)} min read</span>
        <span>📝 {note.content.trim().split(/\s+/).filter(Boolean).length} words</span>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {note.tags.map(tag => (
            <span
              key={tag}
              onClick={() => navigate(`/tags/${tag}`)}
              style={{
                fontSize: '12px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: '#e8f0fe',
                color: '#1a56db',
                cursor: 'pointer'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '40px' }} />

      {/* Rendered markdown content */}
      {note.content ? (
        <ReactMarkdown
          components={{
            h1: ({children}) => <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 16px', borderBottom: '2px solid #eee', paddingBottom: '8px' }}>{children}</h1>,
            h2: ({children}) => <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '32px 0 12px' }}>{children}</h2>,
            h3: ({children}) => <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '24px 0 8px' }}>{children}</h3>,
            p: ({children}) => <p style={{ marginBottom: '18px', lineHeight: '1.9', color: '#333' }}>{children}</p>,
            strong: ({children}) => <strong style={{ fontWeight: '700', color: '#1a1a1a' }}>{children}</strong>,
            em: ({children}) => <em style={{ fontStyle: 'italic', color: '#555' }}>{children}</em>,
            ul: ({children}) => <ul style={{ paddingLeft: '24px', marginBottom: '18px' }}>{children}</ul>,
            ol: ({children}) => <ol style={{ paddingLeft: '24px', marginBottom: '18px' }}>{children}</ol>,
            li: ({children}) => <li style={{ marginBottom: '8px', lineHeight: '1.7', color: '#333' }}>{children}</li>,
            blockquote: ({children}) => (
              <blockquote style={{
                borderLeft: '4px solid #2d2d2d',
                paddingLeft: '20px',
                color: '#666',
                margin: '24px 0',
                fontStyle: 'italic',
                fontSize: '16px'
              }}>
                {children}
              </blockquote>
            ),
            code: ({children}) => (
              <code style={{
                background: '#f0f0f0',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'monospace',
                color: '#e94560'
              }}>
                {children}
              </code>
            ),
            pre: ({children}) => (
              <pre style={{
                background: '#1e1e1e',
                color: '#f8f8f2',
                padding: '20px',
                borderRadius: '10px',
                overflow: 'auto',
                marginBottom: '18px',
                fontSize: '13px',
                lineHeight: '1.6'
              }}>
                {children}
              </pre>
            ),
            hr: () => <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />,
          }}
        >
          {note.content}
        </ReactMarkdown>
      ) : (
        <p style={{ color: '#ccc', fontStyle: 'italic' }}>
          This note has no content yet.{' '}
          <span
            onClick={() => navigate(`/editor/${id}`)}
            style={{ color: '#1a56db', cursor: 'pointer' }}
          >
            Start writing →
          </span>
        </p>
      )}
    </div>
  );
}

export default ReadingView;