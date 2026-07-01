import { Link, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

function Navbar() {
  const { createNote } = useNotes();
  const navigate = useNavigate();

  function handleNewNote() {
    const id = createNote();
    navigate(`/editor/${id}`);
  }

  return (
    <nav style={{
      background: '#fff',
      padding: '0 32px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #eee',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#2d2d2d'
      }}>
        📝 NoteWise
      </Link>

      <button
        onClick={handleNewNote}
        style={{
          background: '#2d2d2d',
          color: 'white',
          border: 'none',
          padding: '9px 18px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        + New Note
      </button>
    </nav>
  );
}

export default Navbar;