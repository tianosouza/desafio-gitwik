import React, { useState, useCallback } from 'react';
import gitLogo from '../assets/github.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = useCallback(async () => {

    if (!currentRepo) {
      // Se o campo estiver vazio, exiba uma mensagem ou tome alguma ação apropriada.
      alert('Digite o nome do repositório antes de buscar.');
      return
    }
    
    
      const { data, status } = await api.get(`repos/${currentRepo}`);

      if (status === 400) {
              console.log(status)
        // alert("Este repositório é privado")
      }
      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);
        
        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }
      }

      alert('Repositório ja na lista de encontrado!');
  
  }, [currentRepo, repos]);

  const handleRemoveRepo = useCallback(id => {
    setRepos(prev => prev.filter(repo => repo.id !== id));
  }, []);

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
