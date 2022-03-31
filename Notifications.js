

export default function useNotification() {
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('leyo la not:');
            console.log(response);
            const noti = response.notification.request.content.data;
            const { id, ruta, tipo } = noti;
            if (ruta == 'DetalleNoticias') {
                getFullPath(ruta)
                //  this.props.navigation.push("DetalleNoticias", { id_noticia: id });
                //return navigationRef.current?.navigate('DetalleNoticias',{id_noticia:id});
                // ...some codes
                // nav.navigate('DetalleNoticias',{id_noticia:id})
            }

        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
}