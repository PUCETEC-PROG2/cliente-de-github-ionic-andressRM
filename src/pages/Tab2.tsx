import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonInput, IonTextarea, IonButton, 
  IonLoading, IonToast 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createRepo } from '../services/GithubService';
import './Tab2.css';

const Tab2: React.FC = () => {
  const history = useHistory();

  // Estado del formulario
  const [repoFormData, setRepoFormData] = useState({
    name: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const saveRepo = async () => {
    // 1. Validación
    if (!repoFormData.name.trim()) {
      setMessage("¡El nombre del repositorio es obligatorio!");
      return;
    }

    try {
      setLoading(true);
      // 2. Llamada al servicio (POST)
      await createRepo(repoFormData);
      
      setLoading(false);
      setMessage("Repositorio creado con éxito");

      // 3. Limpiar formulario
      setRepoFormData({ name: '', description: '' });

      // 4. Redirección automática a la lista
      setTimeout(() => {
        history.push('/tab1');
      }, 1000);

    } catch (error) {
      
      console.error("Error al crear repo:", error); 
      
      setLoading(false);
      setMessage("Error: Es posible que el nombre ya exista.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Creando en GitHub..." />
        <IonToast 
          isOpen={!!message} 
          message={message} 
          duration={3000} 
          onDidDismiss={() => setMessage('')} 
          color={message.includes("Error") ? "danger" : "success"}
        />

        <div className="form-container">
          <IonList>
            <IonItem>
              <IonInput 
                label="Nombre del Repositorio" 
                labelPlacement="floating" 
                placeholder="ej. mi-proyecto-ionic"
                value={repoFormData.name}
                onIonInput={e => setRepoFormData({...repoFormData, name: e.detail.value!})}
              />
            </IonItem>

            <IonItem>
              <IonTextarea 
                label="Descripción" 
                labelPlacement="floating" 
                placeholder="Breve descripción del proyecto"
                rows={4}
                value={repoFormData.description}
                onIonInput={e => setRepoFormData({...repoFormData, description: e.detail.value!})}
              />
            </IonItem>
          </IonList>

          <div style={{ padding: '20px' }}>
            <IonButton expand="block" onClick={saveRepo}>
              Guardar Repositorio
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;