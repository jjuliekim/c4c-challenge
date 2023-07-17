// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import React, { FormEvent, useCallback, useState } from 'react';
import axios from "axios";
import {Box, Button, Container, Input, ListItem, Text, UnorderedList} from "@chakra-ui/react";
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
    <Box textAlign={"center"}>
      <Text fontSize={"4xl"} marginBlock={4} color={"blue.800"}>
        URL Shortener
      </Text>
      <form onSubmit={onSubmit}>
        <Text marginBottom={5} fontSize={"lg"}>
          Enter URL
        </Text>
        <Input
          bg={"blue.50"}
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
          }}
          placeholder="www.long-url-here.com"
        />
        <Text></Text>
        <Button type="submit" marginBlock={10}>
          Generate Link
        </Button>
      </form>

      <UnorderedList textAlign={"left"}>
        {urls.map((u) => (
          <ListItem>
            {u.short} -- {u.original}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}

export default App;
