import { Box, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiAlignLeft, FiAlignRight, FiEye, FiList } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';

const LinkItems = [
  { name: 'Base64 Encoder', icon: FiAlignLeft, linkPath: '/app/base64-encoder' },
  { name: 'Base64 Decoder', icon: FiAlignRight, linkPath: '/app/base64-decoder' },
  { name: 'JSON Viewer', icon: FiEye, linkPath: '/app/json-viewer' },
  { name: 'Dedupe', icon: FiList, linkPath: '/app/dedupe' },
];

export default function SimpleSidebar({ children }) {
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Basic Tools
        </Text>
      </Flex>
      <Flex alignItems='center' mx='8' justifyContent='center'>
        <ThemeSwitcher />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkPath={link.linkPath}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, linkPath, children, ...rest }) => {
  return (
    <Link href={linkPath} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
