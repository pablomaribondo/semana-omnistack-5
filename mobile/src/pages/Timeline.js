import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import socket from 'socket.io-client';

import api from '../services/api';

import Tweet from '../components/Tweet';

const Timeline = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      subscribeToEvents();
      const response = await api.get('tweets');

      setTweets(response.data);
    })();
  }, []);

  const subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:3000', {
      transports: ['websocket'],
    });
    io.on('tweet', (data) => {
      setTweets((tweetsState) => [data, ...tweetsState]);
    });
    io.on('like', (data) => {
      setTweets((tweetsState) => {
        let tweetsList = [...tweetsState];
        tweetsList = tweetsList.map((tweet) => {
          return tweet._id === data._id ? data : tweet;
        });
        return tweetsList;
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={(tweet) => tweet._id}
        renderItem={({item}) => <Tweet tweet={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Timeline;
