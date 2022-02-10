let SidebarItem = ({ icon, element, onClick = () => {}, className }) => {
  return (
    <div
      class={`flex items-center w-full h-auto p-2 space-x-2 cursor-pointer rounded hover:shadow dark:hover:bg-gray-800 active:shadow-none dark:active:shadow-none select-none ${className}`}
      onClick={() => onClick()}
    >
      <div>{icon}</div>
      <div>{element}</div>
    </div>
  );
};

export default SidebarItem;
