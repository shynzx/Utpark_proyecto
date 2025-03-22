import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSession } from '../../ctx';
import { useNavigation } from 'expo-router';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync('PRAGMA user_version');
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE tasks (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL);
    `);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Sistema básico de tareas</Text>
    </View>
  );
}

function TasksContent() {
  const db = useSQLiteContext();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM tasks');
      setTasks(result);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const addTask = async () => {
    if (task.trim() === '') return;
    try {
      await db.runAsync('INSERT INTO tasks (text) VALUES (?)', task);
      setTask('');
      await loadTasks();
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
      await loadTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [db]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea..."
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default function TasksScreen() {
  const { signOut } = useSession();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, signOut]);

  return (
    <SQLiteProvider databaseName="tasks.db" onInit={migrateDbIfNeeded}>
      <View style={styles.container}>
        <Header />
        <TasksContent />
      </View>
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EAEAEA',
  },
  headerButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: '#E74C3C',
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2A2A2A',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  taskText: {
    fontSize: 16,
    color: '#EAEAEA',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
