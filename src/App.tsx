import { useState, useRef, useEffect } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PageContextProvider } from '@/contexts/pageContext';
import User from '@/components/user';
import { ForwardRefDemo, type ForwardRefDemoHandles } from '@/components/forwardRefDemo';

function App() {
  const [count, setCount] = useState(0);
  console.log('count', count);

  const forwardRefDemoRef = useRef<ForwardRefDemoHandles | null>(null);
  useEffect(() => {
    forwardRefDemoRef.current?.focus();
  }, []);
  const onFocusChange = (isFocused: boolean) => {
    console.log('isFocused', isFocused, forwardRefDemoRef.current?.getValue());
  };

  return (
    <>
      <PageContextProvider>
        <User />
        <ForwardRefDemo ref={forwardRefDemoRef} onFocusChange={onFocusChange} />
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
          <button
            onClick={() => {
              console.log('forwardRefDemoRef.getValue()', forwardRefDemoRef.current?.getValue());
            }}
          >
            invoke forwardRefDemoRef
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </PageContextProvider>
    </>
  );
}

export default App;
