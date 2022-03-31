import { Fab, Icon, Box, Center, NativeBaseProvider } from "native-base"
import React from "react"
import { MaterialIcons } from "@expo/vector-icons"
export const Example = () => {
    return (
        <Box h={400} w="100%">
            <Fab
                borderRadius="full"
                colorScheme="primary.300"
                placement="bottom-right"
                icon={
                    <Icon
                        color="white"
                        as={<MaterialIcons name="lightbulb" />}
                        size="4"
                    />
                }
                label="Quick Start"
            />
        </Box>
    )
}
