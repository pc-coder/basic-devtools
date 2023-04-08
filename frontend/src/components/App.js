import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import Base64Encoder from './base64Encoder/Base64Encoder';
import Base64Decoder from './base64Decoder/Base64Decoder';
import Default from './default/Default';
import SimpleSidebar from './common/Sidebar';
import { Route, Routes } from 'react-router-dom';
import theme from './common/theme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div className='App'>
        <SimpleSidebar>
          <Routes>
            <Route path='app/base64-encoder' element={<Base64Encoder />} />
            <Route path='app/base64-decoder' element={<Base64Decoder />} />
            <Route path='*' element={<Default />} />
          </Routes>
        </SimpleSidebar>
      </div>
    </ChakraProvider>
  );
};

export default App;
