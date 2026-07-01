import { useNavigate } from 'react-router-dom';

// Calculates estimated reading time based on average reading speed
function getReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200)); // 200 words per minute average
  return minutes;
}

// Strips markdown symbols for a clean preview snippet
function getPreviewText(content) {
  return content
    .replace(/[#*_`>~-]/g, '')
    .slice(0, 120)
    .trim();
}

function NoteCard({ note }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/note/${note.id}`)}
      style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #eee',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
        {note.title || 'Untitled Note'}
      </h3>

      <p style={{
        fontSize: '13px',
        color: '#888',
        marginBottom: '14px',
        lineHeight: '1.6',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {getPreviewText(note.content) || 'No content yet...'}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {note.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '20px',
              background: '#f0f0f0',
              color: '#666'
            }}>
              #{tag}
            </span>
          ))}
        </div>
        <span style={{ fontSize: '11px', color: '#bbb' }}>
          {getReadingTime(note.content)} min read
        </span>
      </div>
    </div>
  );
}

export default NoteCard;