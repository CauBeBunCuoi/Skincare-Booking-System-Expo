import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles';

const ServiceListScreen = () => {
    // STATES
    const [loading, setLoading] = useState(true);
    // HOOKS
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        // setAttributes();
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <Text>Service List Screen</Text>
        </View>

    );
}

export default ServiceListScreen;