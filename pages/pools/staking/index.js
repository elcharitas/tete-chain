import { Flex, SimpleGrid, Text } from "@chakra-ui/react";

import Page from "../../../components/Layouts/Page";
import StakeModule from "../../../components/Modules/StakeModule";
import SearchField from "../../../components/Layouts/Navigation/SearchField";

export default function index({ sidebar }) {
    return (
        <>
            <Page title=" NFT Staking" sidebar={sidebar}>
                <Flex
                    direction="column"
                    justifyContent="space-between"
                    color="white"
                >
                    <Flex
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text my="2" id="live" fontSize="2xl" fontWeight="bold">
                            NFT Staking
                        </Text>
                        <SearchField />
                    </Flex>

                    <Text
                        pl="2"
                        mt="4"
                        id="live"
                        fontSize="md"
                        fontWeight="thin"
                    >
                        Crypto Punk
                    </Text>
                </Flex>
                <StakeModule />
            </Page>
        </>
    );
}
