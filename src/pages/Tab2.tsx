import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonTextarea, IonButton, IonIcon } from '@ionic/react';
import { saveOutline } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nuevo Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/*contenedor de estilos */}
        <div className="form-container">
          <IonList className="form-field">
            <IonItem>
              <IonInput 
                label="Nombre del repositorio" 
                labelPlacement="floating" 
                placeholder="Ej: App de Delivery" 
              />
            </IonItem>

            <IonItem>
              <IonTextarea 
                label="Descripción" 
                labelPlacement="floating" 
                placeholder="Descripción del proyecto" 
                rows={4} 
              />
            </IonItem>
          </IonList>

          <div className="form-field" style={{ padding: '0' }}>
            <IonButton expand="block" shape="round">
              <IonIcon slot="start" icon={saveOutline} />
              Guardar Repositorio
            </IonButton>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;