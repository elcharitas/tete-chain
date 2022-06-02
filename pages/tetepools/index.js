import { Flex, Text } from "@chakra-ui/react";
import Page from "../../components/Layouts/Page";
import PoolModule from "../../components/Modules/PoolModule";

export default function index({ sidebar }) {
    return (
        <>
            <Page title="Tete Pools" sidebar={sidebar}>
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
                            Tete Pools
                        </Text>
                    </Flex>
                </Flex>
                <PoolModule />
            </Page>
        </>
    );
}
