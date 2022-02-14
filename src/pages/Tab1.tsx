import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import LineChart from '../components/chart';
import { Store } from './Store';
import './Tab1.css';

const Tab1: React.FC = () => {

    function Main(props):JSX.Element{
      const [ upd, setUpd] = useState( 0 )

      Store.subscribe({num : 31, type : "param1", func: ()=>{
        setUpd(upd + 1)
        console.log("usef")
      }})

      console.log(upd)

      let elem = <>
        <LineChart period="Год" upd = { upd }/>
      </>
      return elem
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Продажи </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Main />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
