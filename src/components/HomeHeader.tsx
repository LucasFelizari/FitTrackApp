import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import defaulUserPhotoImg from '../assets/userPhotoDefault.png';
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export function HomeHeader() {

    const { user, signOut } = useAuth();

    return (
        <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto
                 source={
                    user.avatar  
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
                    : defaulUserPhotoImg
                  }
                size={16}
                alt="Imagem do usuário"
                mr={4}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md" fontFamily={'body'}>
                    Olá,
                </Text>

                <Heading color="gray.100" fontSize="md" fontFamily="heading">
                {user.name}
                </Heading>
            </VStack>
            <TouchableOpacity
            onPress={signOut}
            >
                <Icon
                    as={MaterialIcons}
                    name="logout"
                    color="gray.200"
                    size={7}
                />
            </TouchableOpacity>
        </HStack>
    );
}