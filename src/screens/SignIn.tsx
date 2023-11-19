import { Center, Heading, Image, Input, ScrollView, Text, VStack } from "native-base";
import BackgroundImg from '../assets/background.png';
import { Controller, useForm } from 'react-hook-form';
import { useState } from "react";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "src/routes/auth.routes";

type FormData = {
    email: string;
    password: string;
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<AuthNavigatorRoutesProps>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

    function handleNewAccount() {
        navigation.navigate('signUp');
      }
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center >
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Acesse a conta
                    </Heading>

                    <VStack space={4} w='full'>

                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: 'Informe o e-mail' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Informe a senha' }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            title="Acessar"
                            //    onPress={handleSubmit(handleSignIn)}
                            isLoading={isLoading}
                        />
                    </VStack>
                </Center>
                <Center mt={24}>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>

                    <Button
                        title="Criar Conta"
                        variant="outline"
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}