import { useState } from 'react';
import Draggable from 'react-draggable';

function Note({
  id,
  content,
  position,
  onDelete,
  onUpdateContent,
}: {
  id: number;
  content: string;
  position: any;
  onDelete: Function;
  onUpdateContent: Function;
}): any {
  const [noteContent, setNoteContent] = useState(content) as [string, Function];

  const handleContentChange = (event: { target: { value: any } }) => {
    setNoteContent(event.target.value);
    onUpdateContent(id, event.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Draggable bounds=".notes-container" handle=".handle">
      <div className="note">
        <div className="handle">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16ZM60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
            />
          </svg>
        </div>
        <textarea
          className="note-content"
          value={noteContent as any}
          onChange={handleContentChange}
          placeholder="Start Typing..."
        />
        <button className="delete-btn" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
            />
          </svg>
        </button>
      </div>
    </Draggable>
  );
}

export default Note;
