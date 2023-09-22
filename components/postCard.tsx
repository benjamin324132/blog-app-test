import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Post} from '../types';
import moment from 'moment';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  const [showFull, setShowFull] = useState(false);

  const content = showFull ? post.content : post.content.slice(0,70);

  return (
    <TouchableOpacity onPress={() => setShowFull(prev => !prev)}>
      <View style={styles.card}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.author}>{post.author}</Text>
        <Text style={styles.author}>Fecha: {moment(post.createdAt).format('DD/MM/yyyy')}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    padding: 8,
    backgroundColor: '#ebeae8',
    borderRadius: 8,
    marginBottom: 10,
    gap: 2
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  author: {
    fontSize: 15,
    fontWeight: '500',
    color: '#a6a6a6',
  },
  content: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
  },
});
