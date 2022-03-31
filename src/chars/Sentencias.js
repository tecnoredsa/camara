import React, { useState, useEffect, useRef } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    graphStyle,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import * as global from "../../components/Global";
import Loading from '../../components/Cargando';
import { Select, Text, CheckIcon, Box, Badge, Divider, TextArea, Button, Stack, Icon, Center, NativeBaseProvider, Modal, FormControl, Input, HStack, Spinner, Heading, Circle, Square, Flex, Image } from "native-base"
const screenWidth = Dimensions.get("window").width + 80;
const chartConfig = {
    backgroundColor: "#FFA07A",
    backgroundGradientFrom: "#BCA1A1",
    backgroundGradientTo: "#523E3E",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
};

export default function App() {
    const [datos, setDatos] = useState([])
    const [etapas, setEtapas] = useState([])
    const [asig, setAsig] = useState([])
    const [tipo, setTipo] = useState(0)
    const [cargando, setCargando] = useState(true)


    const fetchUser = async (value) => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'tipo': value };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_estadisticas_gene_sentencias', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json()
        setDatos(result.acuerdos);
        setEtapas(result.data_char1.data_char);
        setAsig(result.data_char2.data_char2);
        setCargando(false);
    }


    useEffect(() => {
        fetchUser(0);
    }, [])

    function CambiaTipo(value) {
        setCargando(true);
        fetchUser(value);
    }

    const data_aux = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.04, 0.06, 0.08]
    };
    if (cargando) {
        return (
            <Loading texto={'Cargando'} />
        )
    } else {
        return (
            <NativeBaseProvider>

                <Box
                    width="100%"
                    height="100%"
                    rounded="xl"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                >
                    <Center>
                        <Box w="3/4" maxW="300">
                            <Select selectedValue={tipo} minWidth="200" accessibilityLabel="Seleccione una opción para filtrar" placeholder="Seleccione una opción para filtrar" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setTipo(itemValue) & CambiaTipo(itemValue)}>
                                <Select.Item label="Últimos 5 días" value="0" />
                                <Select.Item label="Último mes" value="1" />
                                <Select.Item label="Últimos 5 meses" value="2" />
                                <Select.Item label="Año actual" value="3" />
                                <Select.Item label="Año anterior" value="4" />
                                <Select.Item label="Últimos 6 años" value="5" />
                            </Select>
                        </Box>
                        <Divider my="2" />
                    </Center>

                    <ScrollView vertical={true}>
                        <Center>


                            <Badge colorScheme="info" mb="2" variant="outline">Total de sentencias {datos.total}</Badge>
                            <LineChart
                                data={{
                                    labels: datos.label,
                                    datasets: [
                                        {
                                            data: datos.data
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                //yAxisLabel="-"
                                // yAxisSuffix="k"
                                yAxisInterval={2} // optional, defaults to 1
                                chartConfig={chartConfig}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />

                            <Divider my="2" />
                            <Badge colorScheme="info" mb="2" variant="outline" >Tipos de sentencias</Badge>

                            <ScrollView style={styles.scrollView} horizontal={true}>
                                <PieChart
                                    data={etapas}
                                    width={screenWidth}
                                    height={330}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"#E8E8E8"}
                                    paddingLeft={"0"}
                                    center={[15, 10]}
                                    absolute
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </ScrollView>

                            <Divider my="2" />

                            <Divider my="2" />
                            <Badge colorScheme="info" mb="2" variant="outline" >Tipos de sentencias</Badge>
                            <ScrollView style={styles.scrollView} horizontal={true}>
                                <PieChart
                                    data={asig}
                                    width={screenWidth}
                                    height={330}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"#E8E8E8"}
                                    paddingLeft={"0"}
                                    center={[15, 10]}
                                    absolute
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16
                                    }}
                                />
                            </ScrollView>



                        </Center>
                    </ScrollView>
                </Box>
            </NativeBaseProvider>
        );
    }
}


const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 0,
        width: '100%',
    }
});