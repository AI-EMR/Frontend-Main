import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={`
      peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
      transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 
      focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 
      data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-gray-200 
      dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-900 
      dark:data-[state=checked]:bg-primary-500 dark:data-[state=unchecked]:bg-gray-600
      ${className}`}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={`
        pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 
        transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0
        dark:bg-gray-100
      `}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";

export { Switch }; 