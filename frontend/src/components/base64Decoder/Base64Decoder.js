import { Box, Divider, Textarea, Text, Button, useClipboard } from '@chakra-ui/react';
import ajax from 'helpers/ajaxHelper';
import React from 'react';

const Base64Decoder = () => {
  const [base64decodedValue, setBase64decodedValue] = React.useState('');
  const { onCopy, setValue, hasCopied } = useClipboard('');

  const handleChange = (event) => {
    ajax
      .post('api/basic-devtools/v1/base64/decode', {
        encodedValue: event.target.value,
      })
      .then((data) => {
        setBase64decodedValue(data.data.plainText);
        setValue(data.data.plainText);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <Text>Decode from Base64 format</Text>
      <br />
      <Divider />
      <br />
      <Textarea placeholder='Type (or paste) here...' size='lg' onChange={handleChange} />
      <br />
      <br />
      <Divider />
      <br />
      <Box display='flex' flexDirection={'column'} alignItems={'right'}>
        <Button size='md' onClick={onCopy} variant='ghost'>
          {hasCopied ? 'Copied!' : 'Copy'}
        </Button>
        <br />
        <Textarea disabled={true} placeholder='Result goes here...' value={base64decodedValue} />
      </Box>
    </Box>
  );
};

export default Base64Decoder;
