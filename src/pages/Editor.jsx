import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useNotes } from '../context/NotesContext';

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoteById, updateNote, deleteNote } = useNotes();

  const note = getNoteById(id);

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(note?.tags || []);
  const [activeTab, setActiveTab] = useState('edit');
  const [saved, setSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track window width for responsive layout
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load note into state when id changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save debounce — saves 800ms after user stops typing
  useEffect(() => {
    if (!note) return;
    const timer = setTimeout(() => {
      updateNote(Number(id), { title, content, tags });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 800);
    return () => clearTimeout(timer);
  }, [title, content, tags]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleTagKeyPress(e) {
    if (e.key === 'Enter' && tagInput.trim()) {
      const newTag = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
      if (!tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setTagInput('');
    }
  }

  function handleRemoveTag(tag) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  function handleDelete() {
    if (window.confirm('Delete this note?')) {
      deleteNote(Number(id));
      navigate('/');
    }
  }

  if (!note) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p style={{ marginBottom: '16px', color: '#888' }}>Note not found.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#2d2d2d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Notes
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>

      {/* Toolbar */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #eee',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title..."
          style={{
            flex: 1,
            fontSize: '18px',
            fontWeight: '700',
            border: 'none',
            outline: 'none',
            color: '#2d2d2d',
            minWidth: '200px'
          }}
        />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {saved && (
            <span style={{ fontSize: '12px', color: '#22c55e' }}>✓ Saved</span>
          )}

          {/* Mobile tab switcher */}
          {isMobile && (
            <div style={{
              display: 'flex',
              background: '#f5f5f5',
              borderRadius: '8px',
              padding: '3px'
            }}>
              {['edit', 'preview'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: activeTab === tab ? '#fff' : 'transparent',
                    color: activeTab === tab ? '#2d2d2d' : '#888',
                    boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate(`/note/${id}`)}
            style={{
              padding: '7px 14px',
              background: '#f5f5f5',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#555',
              cursor: 'pointer'
            }}
          >
            📖 Reading View
          </button>

          <button
            onClick={handleDelete}
            style={{
              padding: '7px 14px',
              background: '#fff0f0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: '#ef4444',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tag bar */}
      <div style={{
        background: '#fafafa',
        borderBottom: '1px solid #eee',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: '12px',
            padding: '3px 10px',
            borderRadius: '20px',
            background: '#e8f0fe',
            color: '#1a56db',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            #{tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a56db',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px',
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="Add tag (press Enter)..."
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '12px',
            color: '#888',
            background: 'transparent',
            minWidth: '160px'
          }}
        />
      </div>

      {/* Split editor + preview */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        overflow: 'hidden'
      }}>

        {/* Write side */}
        {(!isMobile || activeTab === 'edit') && (
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={`Start writing in markdown...\n\n# Heading 1\n## Heading 2\n\n**bold** and *italic*\n\n- list item\n- another item\n\n> blockquote\n\n\`inline code\``}
            style={{
              width: '100%',
              height: '100%',
              padding: '28px',
              fontSize: '14px',
              lineHeight: '1.8',
              border: 'none',
              borderRight: isMobile ? 'none' : '1px solid #eee',
              outline: 'none',
              resize: 'none',
              background: '#fdfdf8',
              color: '#2d2d2d',
              boxSizing: 'border-box',
              fontFamily: "'Courier New', monospace"
            }}
          />
        )}

        {/* Preview side */}
        {(!isMobile || activeTab === 'preview') && (
          <div style={{
            padding: '28px',
            overflow: 'auto',
            background: '#fff',
            lineHeight: '1.8',
            fontSize: '15px',
            color: '#2d2d2d'
          }}>
            {content ? (
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', borderBottom: '2px solid #eee', paddingBottom: '8px' }}>{children}</h1>,
                  h2: ({children}) => <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '24px 0 12px' }}>{children}</h2>,
                  h3: ({children}) => <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '20px 0 8px' }}>{children}</h3>,
                  p: ({children}) => <p style={{ marginBottom: '14px', lineHeight: '1.8' }}>{children}</p>,
                  strong: ({children}) => <strong style={{ fontWeight: '700' }}>{children}</strong>,
                  em: ({children}) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
                  ul: ({children}) => <ul style={{ paddingLeft: '20px', marginBottom: '14px' }}>{children}</ul>,
                  ol: ({children}) => <ol style={{ paddingLeft: '20px', marginBottom: '14px' }}>{children}</ol>,
                  li: ({children}) => <li style={{ marginBottom: '6px' }}>{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote style={{
                      borderLeft: '4px solid #ddd',
                      paddingLeft: '16px',
                      color: '#888',
                      margin: '14px 0',
                      fontStyle: 'italic'
                    }}>
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => (
                    <code style={{
                      background: '#f0f0f0',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontFamily: 'monospace'
                    }}>
                      {children}
                    </code>
                  ),
                  pre: ({children}) => (
                    <pre style={{
                      background: '#1e1e1e',
                      color: '#f8f8f2',
                      padding: '16px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      marginBottom: '14px',
                      fontSize: '13px'
                    }}>
                      {children}
                    </pre>
                  ),
                  hr: () => <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '24px 0' }} />,
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p style={{ color: '#ccc', fontStyle: 'italic' }}>
                Preview will appear here as you type...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;