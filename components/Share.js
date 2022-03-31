import React, { useState, useEffect } from 'react';
import { Share } from "react-native";
import { Button, Icon } from "native-base"
import { Ionicons } from "@expo/vector-icons"

export default function compartir(route) {
    const uri = route.uri;
    const title = route.title;


    const onShare = async (title, uri) => {
        try {
            const result = await Share.share({
                title: title.title,
                message: uri.uri,
                url: uri.uri
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Button  onPress={() => onShare({ title }, { uri })}
            colorScheme="success" endIcon={<Icon as={Ionicons} name="share-social-outline" size="sm" />}>Compartir</Button>
    );
};
