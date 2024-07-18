import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ImageBackground, Alert } from 'react-native';
import { List, Avatar, IconButton, Searchbar, Divider, ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { parseM3U } from '../utils/m3uParser';

const PlaylistScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMedia, setCurrentMedia] = useState(null);

  const playlistUrl = useSelector((state) => state.auth.user.playlist);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPlaylist = async () => {
      try {
        console.log('Start fetching playlist:', playlistUrl);
        
        // Fetch the playlist using axios
        const response = await axios.get(playlistUrl, {
          responseType: 'text' // Ensure we get the response as text
        });

        if (!isMounted) return; // Exit if the component is unmounted

        console.log('Response received:', response.status);

        // Parse the response data (you'll need to ensure parseM3U is efficient)
        const parsedPlaylist = parseM3U(response.data);

        console.log('Parsed playlist:', parsedPlaylist.length, 'items');

        // Filter the parsed playlist
        const filteredPlaylist = parsedPlaylist.filter(item => 
          item.groupTitle.toLowerCase() !== 'movies' && 
          item.groupTitle.toLowerCase() !== 'series' && 
          item.groupTitle.toLowerCase() !== 'live tv'
        );

        console.log('Filtered playlist:', filteredPlaylist.length, 'items');

        // Update state with the filtered playlist
        setPlaylist(filteredPlaylist);

      } catch (error) {
        console.error('Error fetching playlist:', error);
        Alert.alert('Error', 'Failed to fetch playlist: ' + error.message);
      } finally {
        if (isMounted) {
          console.log('Final playlist state:', playlist.length, 'items');
          setLoading(false);
        }
      }
    };

    fetchPlaylist();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };

  }, [playlistUrl]); // Ensure this useEffect runs when playlistUrl changes

  const onChangeSearch = query => setSearchQuery(query);

  const playMedia = (mediaUrl) => {
    setCurrentMedia(mediaUrl);
  };

  const renderItem = ({ item }) => (
    <View>
      <List.Item
        title={item.title}
        description={`Duration: ${item.groupTitle}`}
        left={() => item.tvgLogo ? (
          <Avatar.Image size={40} source={{ uri: item.tvgLogo }} />
        ) : (
          <Avatar.Icon size={40} icon={()=><Icon name='video-camera' size={24} />} />
        )}
        right={() => (
          <IconButton
            icon={() => <Icon name="play" size={24} color="black" />}
           onPress={() => playMedia(item.url)}
          />
        )}
      />
      <Divider />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/mbg2.png')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <FlatList
          data={playlist.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={item => item.url}
        />
        {currentMedia && (
          <Video
            source={{ uri: currentMedia }}
            style={styles.videoPlayer}
            controls={true}
            resizeMode="contain"
            onEnd={() => setCurrentMedia(null)}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    margin: 10,
  },
  searchbar: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    height: 300,
    marginTop: 16,
  },
});

export default PlaylistScreen;
