import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles';

const TherapistSelectionScreen = () => {
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
            <h1>Therapist Selection Screen</h1>
        </View>

    );
}

export default TherapistSelectionScreen;