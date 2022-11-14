import { firebase } from '../lib/Firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import {useState} from 'react'
 
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { GITHUB_URLS } from '../constants/Constants';
import { dummyAvatar } from '../constants/Constants';

/**
 * Renders Header
 * @returns JSX.Element
 */
export default function NavBar (): JSX.Element {

   	const { colorMode, toggleColorMode } = useColorMode();
	const [user, setUser] = useState<UserCredential | null> (null)

  	return (
    	<>
      		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        		<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          			
				{/* LOGO */}
				<Box fontFamily={'sans-serif'} fontSize = {'1xl'}>
          		  LGU TIME TABLE
          		</Box>

          		<Flex alignItems={'center'}>
            		<Stack direction={'row'} spacing={7}>
              			
						<Button onClick={toggleColorMode}>
              			  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              			</Button>

						{/* Drop down Menu */}
            			<Menu>
                			<MenuButton
                			  as={Button}
                			  rounded={'full'}
                			  variant={'link'}
                			  cursor={'pointer'}
                			  minW={0}
							>
                			  	<Avatar 
							  		size={'sm'} 
							  		src={user ? user.user.photoURL ? user.user.photoURL : dummyAvatar :dummyAvatar}
                			  	/>
							</MenuButton>

							{/* Menu Options */}
                			<MenuList alignItems={'center'}>
								<br />

								<Center>
                					<Avatar
                					  size={'2xl'}
                					  src={user ? user.user.photoURL ? user.user.photoURL : dummyAvatar :dummyAvatar}
                					/>
                				</Center><br />

								<Center>
            						<p>{user ? user.user.displayName : 'Anonymous'}</p>
          						</Center><br />
								<MenuDivider />

          						<MenuItem>
								 <a href = {`${GITHUB_URLS.frontend}`} target = "_blank">About US</a>
								</MenuItem>
          						<MenuItem>
								  <a href = {`${GITHUB_URLS.frontend}`} target = "_blank">Contribute</a>
								</MenuItem>
          						<MenuItem 
								    color= {user ? 'red.400': 'blue.400'}
									onClick = {(e)=>{
									if (user)
									{
										signOut (firebase.firebaseAuth)
										setUser (null)
									}
									else 
									{
										signInWithPopup (firebase.firebaseAuth, new GoogleAuthProvider())
										.then ((data:UserCredential)  => setUser (data))
									}
								}}>{user ? 'Logout': 'Login'}</MenuItem>
        					</MenuList>
        				</Menu>
        			</Stack>
    	    	</Flex>
    		</Flex>
       </Box>
    </>
  );
}
