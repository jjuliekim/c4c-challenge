// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import React, { FormEvent, useCallback, useState } from 'react';
import axios from "axios";
import {Button, Container, Input, Text} from "@chakra-ui/react";
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);

type Shortened = {
  original: string;
  short: string;
};

export function App() {
  const [urls, setUrls] = useState<Array<Shortened>>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const response = await axios.post(`http://localhost:3333/api/shorten`, {
        original: inputUrl,
      })

      const newUrl = response.data as Shortened;

      setUrls([newUrl, ...urls]);
      setInputUrl('');
    },
    [urls, setUrls, inputUrl, setInputUrl]
  );

  return (
    <Container textAlign={"center"} backgroundColor={"blue.50"}>
      <Text fontSize={"4xl"}>URL Shortener</Text>
      <form onSubmit={onSubmit}>
        <Text>Enter URL</Text>
        <Input
          marginBlock={10}
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="www.long-url-here.com"
        />
        <Text></Text>
        <Button type="submit">
          Generate Link
        </Button>
      </form>

      <ul>
        {urls.map((u) => (
          <li>
            {u.short} -- {u.original}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default App;
