import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonLoading, IonToast, useIonViewWillEnter,
  IonItem, IonLabel, IonButton, IonIcon, IonAlert
} from '@ionic/react';
import { trashOutline, createOutline } from 'ionicons/icons'; // Importamos Lápiz y Basura
import { getRepos, deleteRepo, updateRepo } from '../services/GithubService'; // Importamos updateRepo
import { GitHubRepo } from '../interfaces/types';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Estados para Borrar y Editar
  const [repoToDelete, setRepoToDelete] = useState<GitHubRepo | null>(null);
  const [repoToEdit, setRepoToEdit] = useState<GitHubRepo | null>(null);

  useIonViewWillEnter(() => {
    cargarRepositorios();
  });

  const cargarRepositorios = async () => {
    try {
      const data = await getRepos();
      setRepos(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los repositorios.');
      setLoading(false);
    }
  };

  // Lógica de BORRAR (DELETE)
  const handleBorrar = async () => {
    if (!repoToDelete) return;
    try {
      setLoading(true);
      await deleteRepo(repoToDelete.owner.login, repoToDelete.name);
      setRepos(repos.filter(r => r.id !== repoToDelete.id)); // Actualizamos lista visualmente
      setLoading(false);
      setRepoToDelete(null);
    } catch (err) {
      console.error(err);
      setError('No se pudo borrar. Verifica permisos.');
      setLoading(false);
    }
  };

  // Lógica de EDITAR (PATCH)
  const handleEditar = async (nuevaDesc: string) => {
    if (!repoToEdit) return;
    try {
      setLoading(true);
      // Llamamos a la API (PATCH)
      await updateRepo(repoToEdit.owner.login, repoToEdit.name, { description: nuevaDesc });
      
      // Actualizamos la lista localmente para ver el cambio ya
      const nuevosRepos = repos.map(r => {
        if (r.id === repoToEdit.id) {
          return { ...r, description: nuevaDesc };
        }
        return r;
      });
      setRepos(nuevosRepos);
      
      setLoading(false);
      setRepoToEdit(null);
    } catch (err) {
      console.error(err);
      setError('No se pudo actualizar.');
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
        <IonLoading isOpen={loading} message="Procesando..." />
        <IonToast isOpen={!!error} message={error} duration={3000} color="danger" onDidDismiss={() => setError('')}/>

        {/* ALERTA DE BORRAR */}
        <IonAlert
          isOpen={!!repoToDelete}
          onDidDismiss={() => setRepoToDelete(null)}
          header={'Confirmar'}
          message={`¿Eliminar ${repoToDelete?.name}?`}
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setRepoToDelete(null) },
            { text: 'Eliminar', role: 'confirm', handler: handleBorrar }
          ]}
        />

        {/* ALERTA DE EDITAR (PATCH) */}
        <IonAlert
          isOpen={!!repoToEdit}
          onDidDismiss={() => setRepoToEdit(null)}
          header={'Editar Descripción'}
          inputs={[
            {
              name: 'desc',
              type: 'textarea',
              placeholder: 'Nueva descripción...',
              value: repoToEdit?.description // Carga la descripción actual
            }
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel', handler: () => setRepoToEdit(null) },
            { 
              text: 'Guardar', 
              handler: (data) => handleEditar(data.desc) // Envía la desc
            }
          ]}
        />

        <IonList>
          {repos.map((repo) => (
            <IonItem key={repo.id}>
              <IonLabel>
                <h2>{repo.name}</h2>
                <p>{repo.description || "Sin descripción"}</p>
              </IonLabel>
              
              {/* Botón editar azl */}
              <IonButton fill="clear" color="primary" onClick={() => setRepoToEdit(repo)}>
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>

              {/* Botón borrar red */}
              <IonButton fill="clear" color="danger" onClick={() => setRepoToDelete(repo)}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;