import {
  Box,
  Button,
  Divider,
  FormLabel,
  Switch,
  Text,
  Textarea,
  useClipboard,
} from '@chakra-ui/react';
import React from 'react';

const Dedupe = () => {
  const [transformedValue, setTransformedValue] = React.useState('');
  const { onCopy, setValue, hasCopied } = useClipboard('');
  const [inputValue, setInputValue] = React.useState('');
  const [sortOutput, setSortOutput] = React.useState(false);
  const [keepBlanks, setKeepBlanks] = React.useState(false);
  const [ignoreCapitals, setIgnoreCapitals] = React.useState(false);
  const [resultSummary, setResultSummary] = React.useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSortOutputChange = () => {
    setSortOutput(!sortOutput);
  };

  const handleKeepBlanksChange = () => {
    setKeepBlanks(!keepBlanks);
  };

  const handleIgnoreCapitalsChange = () => {
    setIgnoreCapitals(!ignoreCapitals);
  };

  function sortValues(uniques) {
    uniques.sort(function (x, y) {
      const a = String(x).toUpperCase();
      const b = String(y).toUpperCase();
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  }

  const perform = () => {
    let txt = inputValue;
    txt = txt.replace(new RegExp('>', 'g'), '&gt;');
    txt = txt.replace(new RegExp('<', 'g'), '&lt;');
    let masterarray = txt.split('\n');
    const itemsInInitialArray = masterarray.length;
    let dedupe = [];
    let i = 0;
    let editedArray = [];
    while (i < itemsInInitialArray) {
      masterarray[i] = masterarray[i].replace(new RegExp('\t', 'g'), '    ');
      if (!keepBlanks) {
        masterarray[i] = masterarray[i].replace(/^\s+/, '');
      } else {
        if (masterarray[i].match(/^ +/)) {
          let spc = masterarray[i].match(/^ +/);
          spc[0] = spc[0].replace(/ /g, ' ');
          masterarray[i] = masterarray[i].replace(/^\s+/, spc[0]);
        }
      }

      let ulc;
      if (ignoreCapitals) {
        ulc = masterarray[i].toLowerCase();
      } else {
        ulc = masterarray[i];
      }
      editedArray[ulc] = ulc;
      dedupe[ulc] = '0';
      i++;
    }
    i = 0;
    let uniques = [];
    for (let key in dedupe) {
      if (editedArray[key] !== '') {
        uniques.push(editedArray[key]);
      }
      dedupe[key] = 'dontprint';
      i++;
    }
    if (sortOutput) {
      sortValues(uniques);
    }
    const uniqueElements = uniques.length;
    const dedupedList = uniques.join('\n');
    const itemsRemoved = itemsInInitialArray - uniqueElements;
    setResultSummary(
      itemsInInitialArray +
        ' original lines, ' +
        itemsRemoved +
        ' removed, ' +
        uniqueElements +
        ' remaining.',
    );
    setTransformedValue(dedupedList);
    setValue(dedupedList);
  };

  return (
    <Box>
      <Text>Dedupe</Text>
      <br />
      <Divider />
      <br />
      <Box display='flex' flexDirection={'row'} alignItems={'center'}>
        <Box display='flex' flexDirection={'column'} alignItems={'right'} width={'100%'}>
          <Textarea placeholder='Type (or paste) here...' rows={25} onChange={handleInputChange} />
        </Box>
        <Box display='flex' flexDirection={'column'} mx='15px' alignItems={'center'} minW={'75px'}>
          <Box display='flex' flexDirection={'row'}>
            <FormLabel htmlFor='ignore-capitals' mb='0'>
              Case Insensitive (converts to lower case)
            </FormLabel>
            <Switch isChecked={ignoreCapitals} onChange={handleIgnoreCapitalsChange} />
          </Box>
          <br />
          <Divider />
          <br />
          <Box display='flex' flexDirection={'row'}>
            <FormLabel htmlFor='keep-blanks' mb='0'>
              Keep blanks at line starts
            </FormLabel>
            <Switch isChecked={keepBlanks} onChange={handleKeepBlanksChange} />
          </Box>
          <br />
          <Divider />
          <br />
          <Box display='flex' flexDirection={'row'}>
            <FormLabel htmlFor='sort-results' mb='0'>
              Sort results
            </FormLabel>
            <Switch isChecked={sortOutput} onChange={handleSortOutputChange} />
          </Box>
          <br />
          <Divider />
          <br />
          <Button colorScheme='teal' size='md' onClick={perform} variant='outline'>
            Perform
          </Button>
        </Box>
        <Box display='flex' flexDirection={'column'} alignItems={'right'} width={'100%'}>
          <Button size='md' onClick={onCopy} variant='ghost'>
            {hasCopied ? 'Copied!' : 'Copy'}
          </Button>
          <br />
          <Text>{resultSummary}</Text>
          <Textarea
            disabled={true}
            placeholder='Result goes here...'
            value={transformedValue}
            rows={23}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dedupe;
