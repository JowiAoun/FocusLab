interface SidebarProps {
  onAddNote: () => void;
  onAddTimer: () => void;
  onAddTaskList: () => void;
  onAddAmbientSound: () => void;
}

const SideBar: React.FC<SidebarProps> = ({ onAddNote, onAddTimer, onAddTaskList, onAddAmbientSound }) => {
  return (
    <div
      className=" fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-white dark:bg-gray-900 shadow-lg items-center justify-center"
    >
      <Divider />
      <button onClick={onAddNote}>
        <SideBarIcon
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
              <path
                fill="currentColor"
                d="M4 0C1.795 0 0 1.795 0 4v18c0 2.205 1.795 4 4 4h13c1.063 0 2.539-1.535 4.25-3.281c.24-.244.47-.473.719-.719c.246-.248.506-.51.75-.75C24.466 19.538 26 18.063 26 17V4c0-2.205-1.795-4-4-4H4zm0 2h18a2 2 0 0 1 2 2v13c0 .995-1.002 1-2 1h-3c-.551 0-1 .449-1 1v3.063c0 .887.002 1.753-.719 1.937H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2.813 6A1.001 1.001 0 0 0 7 10h12a1 1 0 1 0 0-2H7a1 1 0 0 0-.094 0a1.001 1.001 0 0 0-.093 0zm0 5A1.001 1.001 0 0 0 7 15h10a1 1 0 1 0 0-2H7a1 1 0 0 0-.094 0a1.001 1.001 0 0 0-.093 0z"
              />
            </svg>
          }
          text="New Note"
        />
      </button>

      <button onClick={onAddTimer}>
        <SideBarIcon
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17Zm0 1.5a7 7 0 1 0 0 14a7 7 0 0 0 0-14ZM12 8a.75.75 0 0 1 .743.648l.007.102v4.5a.75.75 0 0 1-1.493.102l-.007-.102v-4.5A.75.75 0 0 1 12 8Zm7.147-2.886l.083.06l1.158.964a.75.75 0 0 1-.877 1.212l-.082-.06l-1.159-.964a.75.75 0 0 1 .877-1.212ZM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5Z"
              />
            </svg>
          }
          text="New Timer"
        />
      </button>
      <button onClick={onAddTaskList}>
        <SideBarIcon
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.995 4.097A2.25 2.25 0 0 0 17.75 2H6.25l-.154.005A2.25 2.25 0 0 0 4 4.251v15.498l.005.154A2.25 2.25 0 0 0 6.25 22h7.568l-1.5-1.5H6.25l-.102-.007a.75.75 0 0 1-.648-.743V4.251l.007-.102a.75.75 0 0 1 .743-.648h11.5l.102.007a.75.75 0 0 1 .648.743v11.567l1.159-1.159c.106-.106.22-.2.34-.28V4.25l-.004-.154Zm-3.707 17.902a.692.692 0 0 1-.076 0a.75.75 0 0 1-.493-.219l-2.5-2.502a.75.75 0 0 1 1.062-1.06l1.969 1.971l4.47-4.47a.75.75 0 1 1 1.06 1.061l-5 5a.75.75 0 0 1-.492.219ZM13.84 16.5a2.316 2.316 0 0 0-.182 0h-2.413a.75.75 0 0 1 0-1.5h5.004a.75.75 0 1 1 0 1.5H13.84ZM9 7.752a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm1.496-.002a.75.75 0 0 1 .75-.75h5.004a.75.75 0 1 1 0 1.5h-5.004a.75.75 0 0 1-.75-.75Zm.75 3.25a.75.75 0 0 0 0 1.5h5.004a.75.75 0 1 0 0-1.5h-5.004ZM8 12.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm1 2.998a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
              />
            </svg>
          }
          text="New Task List"
        />
      </button>
      <button onClick={onAddAmbientSound}>
        <SideBarIcon
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g id="evaMusicOutline0">
                <g id="evaMusicOutline1">
                  <path
                    id="evaMusicOutline2"
                    fill="currentColor"
                    d="M19 15V4a1 1 0 0 0-.38-.78a1 1 0 0 0-.84-.2l-9 2A1 1 0 0 0 8 6v8.34a3.49 3.49 0 1 0 2 3.18a4.36 4.36 0 0 0 0-.52V6.8l7-1.55v7.09a3.49 3.49 0 1 0 2 3.17a4.57 4.57 0 0 0 0-.51ZM6.54 19A1.49 1.49 0 1 1 8 17.21a1.53 1.53 0 0 1 0 .3A1.49 1.49 0 0 1 6.54 19Zm9-2A1.5 1.5 0 1 1 17 15.21a1.53 1.53 0 0 1 0 .3A1.5 1.5 0 0 1 15.51 17Z"
                  />
                </g>
              </g>
            </svg>
          }
          text="New Ambient Noise"
        />
      </button>
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }: { icon: any; text: string }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100 z-40">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
