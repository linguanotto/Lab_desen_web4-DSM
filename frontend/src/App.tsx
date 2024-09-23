import { useState, useEffect } from "react";
import { fetchUsers, addUser, deleteUser } from "./api/api"; // Importando as funções da API
import "./App.css";
import { User } from "./types/User"; // Importando o tipo User

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const newUser = await addUser(nome, email);
      setUsers([...users, newUser]);
      setNome("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="App">
      <h1>Clientes</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Cadastrar</button>
      </div>

      <div className="user-list">
        {users.map((user) => (
          <div className="user-card">
            <div className="user-content">
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Status:</strong> {user.status || "ATIVO"}
              </p>
            </div>
            <div className="user-actions">
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="delete-btn"
              >
                <span role="img" aria-label="delete">
                  ❌
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
