import React from 'react';
import { StyleSheet, ScrollView, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from './header';



const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground 
            source={require('../assets/mbg2.png')} 
            style={styles.background}
        >
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('LiveTV')}>
                    <Card style={styles.card}>
                        <Card.Cover source={require('../assets/lsit.png')} />
                        <Card.Content>
                            <Text style={styles.title}>Live TV</Text>
                            <Text style={styles.description}>
                                Always be sensitive to new news. You can find your opportunity there.
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Movies')}>
                    <Card style={styles.card}>
                        <Card.Cover source={require('../assets/movies.png')} />
                        <Card.Content>
                            <Text style={styles.title}>Movies</Text>
                            <Text style={styles.description}>
                                Subtitle variant. This is a card using title and subtitle with specified variants.
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Series')}>
                    <Card style={styles.card}>
                        <Card.Cover source={require('../assets/series.png')} />
                        <Card.Content>
                            <Text style={styles.title}>Series</Text>
                            <Text style={styles.description}>
                                Description for another card. This card contains some other content that is different.
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Others')}>
                    <Card style={styles.card}>
                        <Card.Cover source={require('../assets/others.png')} />
                        <Card.Content>
                            <Text style={styles.title}>Other category for IPTV</Text>
                            <Text style={styles.description}>
                                We also offer a variety of other content.
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Card style={styles.card}>
                        <Card.Cover source={require('../assets/setting.png')} />
                        <Card.Content>
                            <Text style={styles.title}>Settings</Text>
                            <Text style={styles.description}>
                                We place the utmost importance on your tastes and preferences. Various settings await.
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    card: {
        marginBottom: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default HomeScreen;
