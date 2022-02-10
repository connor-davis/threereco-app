let SidebarHeader = ({ center, left, right }) => {
  return (
    <div class="flex justify-between items-center">
      {left && <div>{left}</div>}
      {center && <div>{center}</div>}
      {right && <div>{right}</div>}
    </div>
  );
};

export default SidebarHeader;
