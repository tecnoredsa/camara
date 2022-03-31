import React from "react"
import { Input, Icon, Stack, Center, NativeBaseProvider,Button } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { StyleSheet } from "react-native";

export const Example = () => {
  return (
    <Stack space={4} w="100%" mb="2.5" mt="1.5"  alignItems="center">
      <Input  
       placeholderTextColor={'#8898AA'}
      style={styles.input} 
        w={{
          base: "75%",
          md: "25%",
        }}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
            <Button size="xs" rounded="none" w="1/6" h="full" onPress={()=>{alert('hola');}}>
             Buscar
            </Button>
          }
          placeholder="En que podemos ayudarte?"
      />    
    </Stack>
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
    input:{

    }

})