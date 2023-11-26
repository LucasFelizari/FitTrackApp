import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, useToast, VStack } from "native-base";
import { useCallback, useState } from "react";
import { HistoryCard } from "../components/HistoryCard";
import { ScreenHeader } from "../components/ScreenHeader";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";
import { HistoryByDayDto } from "../dtos/HistoryByDayDto";

export function History() {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const [exercises, setExercises] = useState<HistoryByDayDto[]>([]);

    async function fetchHistory() {
        try {
            setIsLoading(true);
            const response = await api.get('/history');
            setExercises(response.data);
            console.log(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Erro ao carregar o histórico';

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            })
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []))

    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />

            <SectionList
                sections={exercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item} />}
                renderSectionHeader={({ section }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
                        {section.title}
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: "center" }}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Não há exercícios registrados ainda. {`\n`}
                        Vamos começar?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}