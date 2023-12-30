import React from 'react';
import * as Sw from '@radix-ui/react-switch';

type Props = React.ComponentPropsWithoutRef<typeof Sw.Root>


const Switch = React.forwardRef<HTMLInputElement, Props>(({...props}, ref) => (
   
  <Sw.Root
    className="w-[34px] h-[20px] bg-background rounded-full relative data-[state=checked]:shadow-[0_1px_4px] data-[state=checked]:shadow-blackA4  data-[state=checked]:bg-muted outline-none cursor-default border-2 border-ring"
    // id="airplane-mode"
    // style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
    {...props}
  >
    <Sw.Thumb className="block w-[14px] h-[14px] bg-white rounded-full shadow-[0_2px_2px] shadow-black transition-transform translate-x-0.5 duration-100 will-change-transform data-[state=checked]:translate-x-[15px]" />
  </Sw.Root>
)
);

Switch.displayName = Sw.Root.displayName
export default Switch;
