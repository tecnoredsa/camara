import React, { useRef, useState, useEffect } from "react"
import { SafeAreaView, Button, View } from "react-native"
import Wizard from "react-native-wizard"
import Usuario from '../Citas_publicas/Usuario';
import Calendario from '../Citas_publicas/Calendario';
import Footer from '../../components/Footerl';
import { NativeBaseProvider, ScrollView, Center, Text, HStack, Spinner, Heading } from "native-base"

export default ({ navigation }) => {
    const wizard = useRef()
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [isLastStep, setIsLastStep] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    //USUARIOS
    const [nombre, setData] = useState(null);
    const [error_nombre, setErrorNombre] = useState(null);
    const [apellido_p, setApellidoP] = useState(null);
    const [error_apellido, setErrorApellido] = useState(null);
    const [apellido_m, setApellidoM] = useState(null);
    const [email, setEmail] = useState(null);
    const [error_email, setErrorEmail] = useState(null);
    const [abogado, setAbogado] = useState(null);
    const [error_abogado, setErrorAbogado] = useState(null);
    const [sexo, setSexo] = useState(null);
    const [error_sexo, setErrorSexo] = useState(null);
    //persona moral
    const [razon_social, setRazon] = useState(null);
    const [error_razon, setErroRazon] = useState(null);
    const [rfc, setRfc] = useState(null);
    const [autorizado, setAutorizado] = useState(null);
    const [error_autorizado, setErrorAurorizado] = useState(null);
    //autoridad
    const [telefono, setTelefono] = useState(null);
    const [error_telefono, setErrorTelefono] = useState(null);
    const [error_tipo, setErrorTipo] = useState(null);
    const [tipo_p, setTipoPersona] = useState(null);
    const [fisica, setFisica] = useState(false);
    const [moral, setMoral] = useState(false);

    const [autoridad, setAutoridad] = useState(false);

    const [showAbogado, setShowAbogado] = useState(false);
    const [cedula, setCedula] = useState(null);
    const [error_cedula, setErrorCedula] = useState(null);

    //CALENDARIO
    const [dias, setDias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [inicial, setInicial] = useState()
    const [final, setFinal] = useState()
    const [fecha, setFecha] = useState()
    const [hora, setHora] = useState();
    const [horas, setHoras] = useState([]);
    const [tramites, setTramites] = useState([]);
    const [tramite, setTramite] = useState([]);
    //errores
    const [error_fecha, setErrorFecha] = useState(null);
    const [error_hora, setErrorHora] = useState(null);
    const [error_tramite, setErrorTramite] = useState(null);
    const [error_guardar, setErrorGuardar] = useState(null);
    //
    

    async function guardarCita() {
        const data = { 'tipoPersona': tipo_p, 'nombre': nombre, 'apellidoPaterno': apellido_p, 'apellidoMaterno': apellido_m, 'sexo': sexo,
                       'abogado':abogado,'cedulaAbogado':cedula,'razonSocial':razon_social,'rfc':rfc,'nombre_moral':autorizado,'correo':email,
                       'celular':telefono,'fecha':fecha,'hora':hora,'id_tramite':tramite };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_guardar_cita_publica', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        if(json_ == 3 || json_ == 2 || json_ == 1){
            if(json_ == 2){
                setErrorGuardar('Lo sentimos cuentas con 2 inasistencias en los ultimos 15 días, necesitas esperar un lapso de 15 días naturales, desde la última cita con inasistencia para poder volver a solicitar otra cita');

            }else if(json_ == 1){
                setErrorGuardar('Lo sentimos cuentas con una cita pendiente, necesitas cancelarla para poder volver a solicitar otra cita');

            }else{

                setErrorGuardar('Lo sentimos no se ha podido guardar la cita, favor de validar la fecha y volver a intentar');
            }

        }else{
            setGuardando(true);
            setErrorGuardar('');
            setData(null);
            setApellidoP(null);
            setApellidoM(null);
            setEmail(null);
            setAbogado(null);
            setSexo(null);
            setRazon(null);
            setRfc(null);
            setAutorizado(null);
            setTelefono(null);
            setTipoPersona(null);
            setFisica(false);
            setMoral(false);
            setShowAbogado(false);
            setCedula(null);
            setFecha(null);
            setHora(null);

            alert('Cita guardada correctamente');
            setGuardando(false);
            navigation.navigate('DetalleCitasPublica', { folio:json_.cita.folio, id_cita: json_.cita.id }); 
        }
    }




    async function ValidarCita() {
        if (tipo_p == null || tipo_p == "") {
            setErrorTipo('Favor de ingresar el tipo de persona');
            return false;
        } else {
            setErrorTipo('');
        }

        if (tipo_p == "FISICA") {
            if (nombre == null || nombre == "") {
                setErrorNombre('Favor de ingresar el nombre');
                return false;
            } else {
                setErrorNombre('');
            }

            if (apellido_p == null || apellido_p == "") {
                setErrorApellido('Favor de ingresar el apellido');
                return false;
            } else {
                setErrorApellido('');
            }

            if (abogado == null || abogado == "") {
                setErrorAbogado('Favor de especificar sí es abogado');
                return false;
            } else {
                setErrorAbogado('');
            }

            if (abogado == "SI") {
                if (cedula == null || cedula == "") {
                    setErrorCedula('Favor de ingresar la cédula profesional');
                    return false;
                } else {
                    setErrorCedula('');
                }

            }

        }else if(tipo_p == "AUTORIDAD"){
            if (nombre == null || nombre == "") {
                setErrorNombre('Favor de ingresar el nombre de la autoridad');
                return false;
            } else {
                setErrorNombre('');
            }

            if (razon_social == null || razon_social == "") {
                setErrorAurorizado('Favor de ingresar el autorizado a presentarse');
                return false;
            } else {
                setErrorAurorizado('');
            }

        } else {
            //es moral
            if (razon_social == null || razon_social == "") {
                setErroRazon('Favor de ingresar la razón social');
                return false;
            } else {
                setErroRazon('');
            }

            if (razon_social == null || razon_social == "") {
                setErrorAurorizado('Favor de ingresar el autorizado a presentarse');
                return false;
            } else {
                setErrorAurorizado('');
            }
        }

        if (email == null || email == "") {
            setErrorEmail('Favor de ingresar el email');
            return false;
        } else {
            setErrorEmail('');
        }
        if (telefono == null || telefono == "") {
            setErrorTelefono('Favor de ingresar el teléfono');
            return false;
        } else {
            setErrorTelefono('');
        }

        if (sexo == null || sexo == "") {
            setErrorSexo('Favor de ingresar el sexo');
            return false;
        } else {
            setErrorSexo('');
        }

        if (fecha == null || fecha == "") {
            setErrorFecha('Seleccione una fecha');
            return false;
        } else {
            setErrorFecha('');
            if (hora == null || hora == "") {
                setErrorHora('Seleccione un horario');
                return false;
            } else {
                setErrorHora('');
                if (tramite == null || tramite == "") {
                    setErrorTramite('Seleccione un tipo de tramite');
                    return false;
                } else {
                    setErrorTramite('');
                }
            }
        }
        guardarCita();
    }
    async function fetchData() {
        tipos_citas();
        const response = await fetch('https://sit-zac.org.mx/getCalendario');
        const json = await response.json();
        for (let dia of json.calendario) {
            if (dia.tipo == "INHABIL") {
                setDias(dias => [dia, ...dias]);
            }
        }
        var today = new Date(),
            date = today.getFullYear();
        setInicial(String(today));
        setFinal(String(date) + "-12-31");
        setCargando(false);
    }

    async function tipos_citas() {
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_traer_tipos_citas', {
            method: 'get',
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        setTramites(json_.tipos)
    }

    const stepList = [
        {
            content: <Usuario error_tipo={error_tipo} nombre={nombre} error_nombre={error_nombre} setData={setData} apellido_p={apellido_p} error_apellido={error_apellido} setApellidoP={setApellidoP} apellido_m={apellido_m} setApellidoM={setApellidoM}
                email={email} error_email={error_email} setEmail={setEmail} abogado={abogado} error_abogado={error_abogado} setAbogado={setAbogado} sexo={sexo} error_sexo={error_sexo} setSexo={setSexo} razon_social={razon_social} error_razon={error_razon} setRazon={setRazon}
                rfc={rfc} setRfc={setRfc} autorizado={autorizado} error_autorizado={error_autorizado} setAutorizado={setAutorizado} telefono={telefono} error_telefono={error_telefono} setTelefono={setTelefono} tipo_p={tipo_p} setTipoPersona={setTipoPersona}
                fisica={fisica} setFisica={setFisica} moral={moral} setMoral={setMoral} showAbogado={showAbogado} setShowAbogado={setShowAbogado} cedula={cedula} error_cedula={error_cedula} setCedula={setCedula} autoridad={autoridad} setAutoridad={setAutoridad} />,
        },
        {
            content: <Calendario ValidarCita={ValidarCita} dias={dias} setDias={setDias} cargando={cargando} setCargando={setCargando} inicial={inicial} setInicial={setInicial} final={final} setFinal={setFinal}
                fecha={fecha} setFecha={setFecha} hora={hora} setHora={setHora} horas={horas} setHoras={setHoras} tramites={tramites} setTramites={setTramites} tramite={tramite} setTramite={setTramite}
                error_fecha={error_fecha} setErrorFecha={setErrorFecha} error_hora={error_hora} setErrorHora={setErrorHora} error_tramite={error_tramite} setErrorTramite={setErrorTramite}  error_guardar={error_guardar} guardando={guardando} />,
        }
    ]


    useEffect(() => {
        fetchData();
    }, [])

    if (cargando) {
        return (
            <NativeBaseProvider>

                <Center mt="3" flex={1} px="3">
                    <HStack space={3} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando calendario...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    } else {
        return (
            <NativeBaseProvider>
                <ScrollView h="100%" r="100%">
                    <View style={{ flexDirection: "column" }}>
                        <Wizard
                            ref={wizard}
                            steps={stepList}
                            isFirstStep={val => setIsFirstStep(val)}
                            isLastStep={val => setIsLastStep(val)}
                            onNext={() => {
                               // console.log("Next Step Called")
                            }}
                            onPrev={() => {
                                //console.log("Previous Step Called")
                            }}
                            currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                                setCurrentStep(currentStep)
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row", margin: 18, alignItems: "center", justifyContent: "center" }}>
                    {stepList.map((val, index) => (
                        <View
                            key={"step-indicator-" + index}
                            style={{
                                width: 10,
                                marginHorizontal: 6,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: index === currentStep ? "#fc0" : "#000",
                            }}
                        />
                    ))}
                </View>
                <SafeAreaView style={{}}>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",

                            borderBottomColor: "#dedede",
                            borderBottomWidth: 1,
                        }}>
                        <Button disabled={isFirstStep} title="Ant" onPress={() => wizard.current.prev()} />


                        <Text>Paso {currentStep + 1}.</Text>
                        <Button disabled={isLastStep} title="Sig" onPress={() => wizard.current.next()} />
                    </View>


                </SafeAreaView>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        )
    }
}