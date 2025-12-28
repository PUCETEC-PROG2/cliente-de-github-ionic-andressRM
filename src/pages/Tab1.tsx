import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonLoading, IonToast, useIonViewWillEnter 
} from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { getRepos } from '../services/GithubService'; // Importamos el servicio
import { GitHubRepo } from '../interfaces/types';    // y la interfaz
import './Tab1.css';

const Tab1: React.FC = () => {
  // Estado para guardar los repositorios reales
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // CAMBIO CLAVE: Usamos useIonViewWillEnter en lugar de useEffect
  // Esto hara que la función se ejecute cadavez que se entra a la pestana
  useIonViewWillEnter(() => {
    cargarRepositorios();
  });

  const cargarRepositorios = async () => {
    try {
      setLoading(true);
      const data = await getRepos(); // Llama a la API
      setRepos(data); // Actualiza la lista
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los repositorios.');
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Indicador de Carga */}
        <IonLoading isOpen={loading} message="Actualizando lista..." duration={2000} />
        
        {/* Aviso de Error */}
        <IonToast 
          isOpen={!!error} 
          message={error} 
          duration={3000} 
          color="danger"
          onDidDismiss={() => setError('')}
        />

        {/* Lista Dinámica Real */}
        <IonList>
          {repos.map((repo) => (
            <RepoItem 
              key={repo.id}       // React necesita una ID única
              name={repo.name}    // Nombre real del repo
            />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;