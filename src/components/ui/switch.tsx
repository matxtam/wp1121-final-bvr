import React from 'react';
import * as Sw from '@radix-ui/react-switch';

type Props = React.ComponentPropsWithoutRef<typeof Sw.Root>


const Switch = React.forwardRef<HTMLInputElement, Props>(({...props}, ref) => (
   
  <Sw.Root
    className="w-[30px] h-[16px] bg-blackA6 rounded-full relative shadow-[0_2px_6px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
    // id="airplane-mode"
    // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
    {...props}
  >
    <Sw.Thumb className="block w-[14px] h-[12px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[16px]" />
  </Sw.Root>
)
);

Switch.displayName = Sw.Root.displayName
export default Switch;
