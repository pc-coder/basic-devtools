import { Box, Button, Divider, Text, Textarea, useClipboard } from '@chakra-ui/react';
import ajax from 'helpers/ajaxHelper';
import React from 'react';

const Base64Encoder = () => {
  const [base64encodedValue, setBase64encodedValue] = React.useState('');
  const { onCopy, setValue, hasCopied } = useClipboard('');

  const handleChange = (event) => {
    ajax
      .post('api/basic-devtools/v1/base64/encode', {
        plainText: event.target.value,
      })
      .then((data) => {
        setBase64encodedValue(data.data.encodedValue);
        setValue(data.data.encodedValue);
      })
      .catch((error) => {
        console.log(error);
        setBase64encodedValue('');
        setValue('');
      });
  };

  return (
    <Box>
      <Text>Encode to Base64 format</Text>
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
        <Textarea disabled={true} placeholder='Result goes here...' value={base64encodedValue} />
      </Box>
    </Box>
  );
};

export default Base64Encoder;
