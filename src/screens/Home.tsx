import { useToast, VStack } from "native-base";
import { useState } from "react";
import { HomeHeader } from "../components/HomeHeader";

export function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    return (
        <VStack flex={1}>
            <HomeHeader />
        </VStack>
    );
}