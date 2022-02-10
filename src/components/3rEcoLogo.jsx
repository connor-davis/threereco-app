import Logo from '../assets/3rEco.png';

let UpDumpLogo = ({ className }) => {
  return (
    <div class="flex justify-center items-center">
      <img src={Logo} class={className || 'w-20 h-20'} />
    </div>
  );
};

export default UpDumpLogo;
