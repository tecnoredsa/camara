import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'


export default function VerBoletin({ route, navigation }) {
    const { boletin } = route.params
    return (
        <PDFReader
            source={{
                uri: 'https://www.sit-zac.org.mx/BOLETINELECTRONICO/'+boletin,
            }}
        />
    )
}
