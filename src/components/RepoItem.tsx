import React from 'react';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';

interface RepoProps {
  name: string;
  imagen?: string; 
}

const RepoItem: React.FC<RepoProps> = ({ name, imagen }) => {
  return (
    <IonItem button>
      <IonThumbnail slot="start">
        {/* montañas por defecto */}
        <img 
          alt="miniatura" 
          src={imagen || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} 
        />
      </IonThumbnail>
      <IonLabel>{name}</IonLabel>
    </IonItem>
  );
};

export default RepoItem;