import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

import {postSchema} from '../validations';
import z, { ZodError } from 'zod';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';



type Props = NativeStackScreenProps<RootStackParamList, 'AddScreen'>;

const AddScreen: React.FC<Props> = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = async () => {
    try {
      const values = {
        title,
        author,
        content
      }
      postSchema.parse(values);

      const { data } = await axios.post(`${BASE_URL}/api/v1/posts`, values);

      setTitle("");
      setAuthor("");
      setContent("");

    } catch (error) {
      if(error instanceof ZodError){
        Alert.alert("Llenar todos los campos");
        return
      }
      Alert.alert("Algo salio mal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      />

      <TextInput
        placeholder="Author"
        style={styles.input}
        value={author}
        onChangeText={text => setAuthor(text)}
      />

      <TextInput
        placeholder="Content"
        multiline={true}
        numberOfLines={6}
        style={[styles.input, {textAlignVertical: 'top'}]}
        value={content}
        onChangeText={text => setContent(text)}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={onSubmit}>
        <Text style={styles.textBtn}>Crear Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 15,
  },
  input: {
    backgroundColor: '#ededed',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#3d8df5',
    borderRadius: 8,
  },
  textBtn: {
    color: 'white',
    fontSize: 18,
  },
});
