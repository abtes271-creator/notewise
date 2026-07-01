import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  // Load notes from localStorage on startup
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notewise_notes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notewise_notes', JSON.stringify(notes));
  }, [notes]);

  // Create a new blank note, return its id so we can navigate to it
  function createNote() {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote.id;
  }

  // Update an existing note's fields
  function updateNote(id, updates) {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }

  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  function getNoteById(id) {
    return notes.find(note => note.id === Number(id));
  }

  // Collect every unique tag across all notes
  function getAllTags() {
    const tagSet = new Set();
    notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }

  return (
    <NotesContext.Provider value={{
      notes,
      createNote,
      updateNote,
      deleteNote,
      getNoteById,
      getAllTags,
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}