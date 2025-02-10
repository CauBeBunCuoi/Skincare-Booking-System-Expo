import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles';

const RegisterScreen = () => {
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
            <Text>Register Screen</Text>
        </View>

    );
}

export default RegisterScreen;