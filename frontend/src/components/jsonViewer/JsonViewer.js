import {Box, Divider, Textarea, Text, Button, Switch, useClipboard, FormControl, FormLabel} from '@chakra-ui/react';
import React from 'react';

const JsonViewer = () => {
    const [transformedValue, setTransformedValue] = React.useState('');
    const {onCopy, setValue, hasCopied} = useClipboard('');
    const [isInvalidInput, setIsInvalidInput] = React.useState(false);
    const [parsedJson, setParsedJson] = React.useState('');

    const handleChange = (event) => {
        try {
            const parsedInputValue = JSON.parse(event.target.value);
            setParsedJson(parsedInputValue);
            setIsInvalidInput(false);
        } catch (e) {
            setParsedJson('');
            setTransformedValue('');
            setIsInvalidInput(true);
        }
    };

    const onBeautifyBtnClick = () => {
        if (isInvalidInput) {
            return;
        }
        const prettifiedValue = JSON.stringify(parsedJson, null, 2);
        setTransformedValue(prettifiedValue);
        setValue(prettifiedValue);
    };

    const onMinifyBtnClick = () => {
        if (isInvalidInput) {
            return;
        }
        const minifiedValue = JSON.stringify(parsedJson, null, 0);
        setTransformedValue(minifiedValue);
        setValue(minifiedValue);
    };

    return (
        <Box>
            <Text>JSON Viewer</Text>
            <br/>
            <Divider/>
            <br/>
            <Box display='flex' flexDirection={'row'} alignItems={'center'}>
                <Box display='flex' flexDirection={'column'} alignItems={'right'} width={'100%'}>
                    <Textarea isInvalid={isInvalidInput} placeholder='Type (or paste) here...' rows={25}
                              onChange={handleChange}/>
                </Box>
                <Box display='flex' flexDirection={'column'} mx='15px' alignItems={'center'}>
                    <Button colorScheme='teal' size='md' onClick={onBeautifyBtnClick} variant='outline'>
                        Beautify
                    </Button>
                    <br/>
                    <Button colorScheme='teal' size='md' onClick={onMinifyBtnClick} variant='outline'>
                        Minify
                    </Button>
                </Box>
                <Box display='flex' flexDirection={'column'} alignItems={'right'} width={'100%'}>
                    <Button size='md' onClick={onCopy} variant='ghost'>
                        {hasCopied ? 'Copied!' : 'Copy'}
                    </Button>
                    <br/>
                    <Textarea disabled={true} placeholder='Result goes here...' value={transformedValue} rows={23}/>
                </Box>
            </Box>
        </Box>
    );
};

export default JsonViewer;
