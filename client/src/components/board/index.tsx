import { useState } from 'react';
import Note from '../note';
import Sidebar from '../sidebar';
import Timer from '../timer';
import TodosList from '../tasklist/TodosList';
import AmbientSound from '../ambientsound';

interface NoteType {
  id: number;
  content: string;
  position: any;
  onDelete: (id: number) => void;
  onUpdateContent: (id: number, content: string) => void;
}

interface TimerType {
  id: number;
  position: any;
  onDelete: (id: number) => void;
}

interface TaskListType {
  id: number;
  position: any;
  onDelete: (id: number) => void;
}

interface AmbientSoundType {
  id: number;
  position: any;
  onDelete: (id: number) => void;
}

function Board() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [taskLists, setTaskLists] = useState<TaskListType[]>([]);
  const [ambientSounds, setAmbientSounds] = useState<TaskListType[]>([]);

  const addNote = () => {
    const newNote: NoteType = {
      id: Date.now(),
      content: '',
      position: 0,
      onDelete: deleteNote,
      onUpdateContent: updateNoteContent,
    };
    setNotes([...notes, newNote]);
    console.log('added new note!');
  };

  const addTimer = () => {
    const newTimer: TimerType = {
      id: Date.now(),
      position: 0,
      onDelete: deleteTimer,
    };
    setTimers([...timers, newTimer]);
    console.log('added new Timer!');
  };

  const addTaskList = () => {
    const newTaskList: TaskListType = {
      id: Date.now(),
      position: 0,
      onDelete: deleteTaskList,
    };
    setTaskLists([...taskLists, newTaskList]);
    console.log('added new Task List!');
  };

  const addAmbientSound = () => {
    const newAmbientSound: AmbientSoundType = {
      id: Date.now(),
      position: 0,
      onDelete: deleteAmbientSound,
    };
    setAmbientSounds([...taskLists, newAmbientSound]);
    console.log('Added new Ambient Sound!');
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const deleteTimer = (id: number) => {
    const updatedTimers = timers.filter((timer) => timer.id !== id);
    setTimers(updatedTimers);
  };

  const deleteTaskList = (id: number) => {
    const updatedTaskLists = taskLists.filter((taskList) => taskList.id !== id);
    setTaskLists(updatedTaskLists);
  };

  const deleteAmbientSound = (id: number) => {
    const updatedAmbientSounds = ambientSounds.filter((ambientSound) => ambientSound.id !== id);
    setAmbientSounds(updatedAmbientSounds);
  };

  const updateNoteContent = (id: number, content: string) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, content };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="board-container">
      <Sidebar
        onAddNote={addNote}
        onAddTimer={addTimer}
        onAddTaskList={addTaskList}
        onAddAmbientSound={addAmbientSound}
      />
      <div className="board">
        <div className="top-bar bg-white dark:bg-gray-900 truncate ">
          <h2
            className="board-title color-black font-semibold hack-effect hover:bg-black hover:text-white p-2 ease-in-out duration-300"
            data-value="Board Title"
          >
            Board Title
          </h2>
        </div>

        <div className="notes-container">
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              content={note.content}
              position={note.position}
              onDelete={deleteNote}
              onUpdateContent={updateNoteContent}
            />
          ))}
          {timers.map((timer) => (
            <Timer key={timer.id} id={timer.id} position={timer.position} onDelete={deleteTimer} />
          ))}

          {taskLists.map((taskList) => (
            <TodosList key={taskList.id} id={taskList.id} position={taskList.position} onDelete={deleteTaskList} />
          ))}
          {ambientSounds.map((ambientSound) => (
            <AmbientSound
              key={ambientSound.id}
              id={ambientSound.id}
              position={ambientSound.position}
              onDelete={deleteAmbientSound}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
