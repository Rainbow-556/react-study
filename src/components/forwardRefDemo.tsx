import { useEffect, forwardRef, useImperativeHandle, useRef, useState } from 'react';

type ForwardRefDemoProps = {
  title?: string;
  onFocusChange: (focused: boolean) => void;
};

export type ForwardRefDemoHandles = {
  getValue: () => number;
  focus: () => void;
  blur: () => void;
};

export const ForwardRefDemo = forwardRef<ForwardRefDemoHandles, ForwardRefDemoProps>(({ onFocusChange }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(0);
  // useEffect(() => {
  //   const focusListener = () => {
  //     onFocusChange(true);
  //   };
  //   inputRef.current?.addEventListener('focus', focusListener);
  //   const blurListener = () => {
  //     onFocusChange(false);
  //   };
  //   inputRef.current?.addEventListener('blur', blurListener);
  //   return () => {
  //     inputRef.current?.removeEventListener('focus', focusListener);
  //     inputRef.current?.removeEventListener('blur', blurListener);
  //   };
  // }, [onFocusChange]);
  useImperativeHandle(
    ref,
    () => {
      const handle: ForwardRefDemoHandles = {
        getValue() {
          return value;
        },
        focus() {
          inputRef.current?.focus();
        },
        blur() {
          inputRef.current?.blur();
        }
      };
      return handle;
    },
    [value]
  );
  return (
    <div>
      ForwardRefDemo: <input ref={inputRef} type="text" onChange={e => setValue(Number(e.target.value))} />
    </div>
  );
});
