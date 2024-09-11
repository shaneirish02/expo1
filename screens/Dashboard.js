import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveTask = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in both title and description.');
      return;
    }

    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, title, description } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask = {
        id: Math.random().toString(),
        title,
        description,
        createdAt: new Date().toLocaleString(),
        isDone: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle('');
    setDescription('');
    setModalVisible(false);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.taskCard, item.isDone && styles.taskCardDone]}>
      <View style={styles.taskHeader}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
          <Ionicons
            name={item.isDone ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={item.isDone ? "#A3D9A5" : "#2E8B57"}
          />
        </TouchableOpacity>
        <Text style={[styles.taskTitle, item.isDone && styles.taskTitleDone]}>
          {item.title}
        </Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => editTask(item)}>
            <Ionicons name="pencil-outline" size={20} color="#2E8B57" style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Ionicons name="trash-outline" size={20} color="#2E8B57" style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.taskDescription, item.isDone && styles.taskDescriptionDone]}>
        {item.description}
      </Text>
      <Text style={styles.taskDate}>Created at {item.createdAt}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/2.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.header}>TO DO LIST</Text>
        <Text style={styles.subHeader}>LIST OF TODO</Text>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.taskList}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Task Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                placeholder="Task Description"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                <Text style={styles.saveButtonText}>{editingTask ? 'Update Task' : 'Add Task'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setTitle('');
            setDescription('');
            setEditingTask(null);
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 20,
  },
  taskList: {
    paddingBottom: 100,
  },
  taskCard: {
    backgroundColor: '#A3D9A5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3, // Adjust as needed
  },
  taskCardDone: {
    backgroundColor: 'rgba(211, 211, 211, 0.9)', // Gray with 90% transparency
    elevation: 0, // Remove elevation to avoid border effect
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    color: '#2E8B57',
    marginVertical: 10,
  },
  taskDescriptionDone: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskDate: {
    fontSize: 12,
    color: '#2E8B57',
    opacity: 0.8,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 15,
  },
  deleteIcon: {
    marginLeft: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2E8B57',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
