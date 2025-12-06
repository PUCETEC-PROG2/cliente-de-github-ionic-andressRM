import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {/*foto pendiente */}
          <RepoItem 
            name="Repositorio 1" 
            imagen="https://ionicframework.com/docs/img/demos/card-media.png" 
          />

          {/* fp */}
          <RepoItem name="Repositorio 2" />

          {/* fp */}
          <RepoItem 
            name="Repositorio 3" 
            imagen="https://ionicframework.com/docs/img/demos/card-media.png" 
          />
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;