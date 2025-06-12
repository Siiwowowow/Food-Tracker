import React, { useState } from 'react';

const NotesSection = ({ notes, setNotes, isOwner, currentUser }) => {
    const [newNote, setNewNote] = useState('');

    const handleAddNote = async () => {
        if (!newNote.trim()) return;

        try {
            setNotes([...notes, {
                text: newNote,
                postedDate: new Date().toISOString(),
                postedBy: currentUser.uid
            }]);
            
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div className='mt-8 p-4 border-t'>
            <h2 className='text-2xl font-bold mb-4'>Notes</h2>
            
            {/* Display existing notes */}
            <div className='space-y-4 mb-6'>
                {notes.map((note, index) => (
                    <div key={index} className='p-3 bg-gray-50 rounded-lg'>
                        <p className='text-gray-700'>{note.text}</p>
                        <p className='text-xs text-gray-500 mt-1'>
                            Posted on: {new Date(note.postedDate).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Add Note Form */}
            <div className='bg-gray-100 p-4 rounded-lg'>
                <h3 className='font-semibold mb-2'>Add a Note</h3>
                <textarea
                    className='w-full p-2 border rounded mb-2'
                    rows='3'
                    placeholder='Write your note here...'
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />
                <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-500'>
                        {isOwner ? 'You can add notes to this item' : 'Only the owner can add notes'}
                    </span>
                    <button
                        onClick={handleAddNote}
                        disabled={!isOwner}
                        className={`px-4 py-2 rounded ${isOwner ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotesSection;