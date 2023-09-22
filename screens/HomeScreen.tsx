import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Post, RootStackParamList} from '../types';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import PostCard from '../components/postCard';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>('');

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        post =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.author.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(currentState => {
        if (currentState.isConnected) {
          getPosts();
          setIsOnline(true);
        } else {
          loadLocalPosts();
        }
      });

      return () => unsubscribe();
    }, []),
  );

  const getPosts = async () => {
  
    try {
      const {data} = await axios.get(`${BASE_URL}/api/v1/posts`);
      setPosts(data);
      setFilteredPosts(data);
      console.log("Get posts", data)
      const values = JSON.stringify(data);
      await AsyncStorage.setItem('@posts', values);
    } catch (error) {
      Alert.alert('Algo salio mal');
      console.log(error);
    }
  };

  const loadLocalPosts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@posts');
      const values = jsonValue != null ? (JSON.parse(jsonValue) as Post[]) : [];
      setPosts(values);
      setFilteredPosts(values);
    } catch (error) {
      Alert.alert('Algo salio mal');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          onChangeText={value => setSearch(value)}
          defaultValue={search}
        />
        {isOnline ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('AddScreen')}>
            <Text style={styles.textBtn}>Nuevo Post</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {!isOnline ? <Text>No hay conexion</Text> : null}
      <FlatList
        style={{width: '100%'}}
        data={filteredPosts}
        renderItem={({item}) => <PostCard post={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    columnGap: 10,
    width: '100%',
    paddingVertical: 15,
  },
  input: {
    backgroundColor: '#ededed',
    flex: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#3d8df5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    color: 'white',
  },
});
