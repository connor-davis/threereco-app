let DropDownItem = ({ text, onClick = () => {} }) => {
  return (
    <div class="text-gray-900 dark:text-white" onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default DropDownItem;
