import { createSignal } from 'solid-js';
import ArrowDown from '../../icons/arrowDown';
import ArrowUp from '../../icons/arrowUp';

let DropDown = ({ children, text }) => {
  let [active, setActive] = createSignal(false);

  return (
    <div class="flex flex-col space-y-2" onClick={() => setActive(!active())}>
      <div class="flex items-center justify-between">
        <div>{text()}</div>
        <div>{active() ? <ArrowDown /> : <ArrowUp />}</div>
      </div>

      {active() && children}
    </div>
  );
};

export default DropDown;
