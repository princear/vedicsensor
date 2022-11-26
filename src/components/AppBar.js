import { StatusBar,
         Box,
         HStack,
         IconButton,
         Icon,
         Text,
       } from 'native-base';

export default function AppBar() {
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
        <HStack alignItems="center" w="100%">
          <IconButton icon={<Icon size="sm" name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
      </HStack>
    </>;
}
