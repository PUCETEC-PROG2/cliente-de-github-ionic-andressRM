import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonLoading, IonButton, IonIcon 
} from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { getUser } from '../services/GithubService'; // Importamos el servicio
import { GitHubUser } from '../interfaces/types';    // Importamos la interfaz
import './Tab3.css';

const Tab3: React.FC = () => {
  // Estado para guardar los datos del usuario que vienen de la API
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect ejecuta esto automáticamente apenas entras a la pantalla
  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      setLoading(true);
      const data = await getUser(); // Llamada a la API de GitHub
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando perfil:", error);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil GitHub</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil GitHub</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Indicador de carga mientras esperamos a GitHub */}
        <IonLoading isOpen={loading} message="Cargando perfil..." />

        {/* Solo mostramos la tarjeta si ya descargamos los datos del usuario */}
        {user && (
          <div className="card-container">
            <IonCard className="card">
              {/* Foto de GitHub */}
              <img alt="Avatar de usuario" src={user.avatar_url} />
              
              <IonCardHeader>
                <IonCardTitle>{user.name || user.login}</IonCardTitle>
                <IonCardSubtitle>@{user.login}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <p>{user.bio || "Sin biografía disponible."}</p>
                
                <div style={{ marginTop: '15px', fontWeight: 'bold', color: 'var(--ion-color-primary)' }}>
                  Repositorios públicos: {user.public_repos}
                </div>
              </IonCardContent>

              {/* Botón decorativo de cerrar sesión */}
              <div style={{ padding: '10px' }}>
                <IonButton expand="block" color="danger" fill="outline">
                  <IonIcon icon={logOutOutline} slot="start" />
                  Cerrar Sesión
                </IonButton>
              </div>
            </IonCard>
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Tab3;