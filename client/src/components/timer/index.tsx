import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './index.css';

function Timer({ id, position, onDelete }: { id: number; position: any; onDelete: Function }): any {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [time, setTime] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    setTime(sessionType === 'Work' ? workTime * 60 : breakTime * 60);
  }, [workTime, breakTime, sessionType]);

  useEffect(() => {
    let interval: any = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (sessionType === 'Work') {
        setSessionType('Break');
        setTime(breakTime * 60);
      } else {
        setSessionType('Work');
        setTime(workTime * 60);
        setSessionCount((prevCount) => prevCount + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, sessionType, workTime, breakTime]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Work');
    setTime(workTime * 60);
    setSessionCount(0);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  ///
  const handleDelete = () => {
    onDelete(id);
  };
  ///
  return (
    <Draggable bounds=".notes-container" handle=".handle">
      <div className="timer">
        <div className="handle">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M76 92a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm52-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 32a16 16 0 1 0-16-16a16 16 0 0 0 16 16ZM60 148a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm68 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
            />
          </svg>
        </div>
        <button className="delete-btn" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
            />
          </svg>
        </button>

        <div className="pomodoro-container">
          <h2 className="hack-effect">Pomodoro Timer</h2>

          <h2 className="session-type hack-effect">{sessionType}</h2>
          <div className="time">{formatTime(time)}</div>
          <div className="session-count">Sessions Completed: {sessionCount}</div>
          <div className="controls">
            {!isActive && (
              <button className="start-button" onClick={startTimer}>
                Start
              </button>
            )}
            {isActive && (
              <button className="pause-button" onClick={pauseTimer}>
                Pause
              </button>
            )}
            <button className="reset-button" onClick={resetTimer}>
              Reset
            </button>
          </div>

          <div className="settings">
            <div className="setting">
              <label>Work Time (minutes):</label>
              <input type="number" min="1" value={workTime} onChange={(e) => setWorkTime(parseInt(e.target.value))} />
            </div>
            <div className="setting">
              <label>Break Time (minutes):</label>
              <input type="number" min="1" value={breakTime} onChange={(e) => setBreakTime(parseInt(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Timer;
