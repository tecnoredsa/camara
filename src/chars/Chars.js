import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, useWindowDimensions, Text } from 'react-native';
import Footer from '../../components/Footerl';
import { NativeBaseProvider } from "native-base"
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
const screenWidth = Dimensions.get("window").width + 80;
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChartsExp from './Expedientes';
import ChartsPromo from './Promociones';
import ChartsAcuerdo from './Acuerdos';
import ChartsSentencias from './Sentencias';
import Libro from './Libro';


const renderScene = ({ route }) => {
    switch (route.key) {
        case 'first':
            return <ChartsExp />;
        case 'second':
            return <ChartsPromo />;
        case 'third':
            return <ChartsAcuerdo />;
        case 'fourth':
            return <ChartsSentencias />;
        case 'five':
                return <Libro />;
        default:
            return null;
    }
};


export default function TabViewExample({ navigation }) {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Expedientes' },
        { key: 'second', title: 'Promocion' },
        { key: 'third', title: 'Acuerdos' },
        { key: 'fourth', title: 'Sentencias' },
        { key: 'five', title: 'Libro' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color, margin: 1, fontSize: 10, }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'rgb(151, 132 , 102)' }}
            renderIcon={({ route, focused, color }) => (
                <Ionicons
                    name={focused ? 'bar-chart' : 'bar-chart-outline'}
                    color={color}
                />
            )}
        />
    );

    return (
        <NativeBaseProvider>
            <TabView
                renderTabBar={renderTabBar}
                getLabelText={({ route }) => route.title}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

            />
            <Footer navigation={navigation} />
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 0,
        width: '100%',
    }
});