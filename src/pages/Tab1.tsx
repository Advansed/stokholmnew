import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Login } from '../components/Login';
import { Store } from './Store';
import './Tab1.css';

const Tab1: React.FC = () => {
    const [auth, setAuth] = useState(Store.getState().auth)
    const [name, setName] = useState("")

    Store.subscribe({num: 11, type: "auth", func:()=>{
      setAuth(Store.getState().auth);
    }})

    function Main(props):JSX.Element{
      let elem = <></>

      if(!auth) {
          console.log(auth)
          props.setName("Логин")
          return <Login />
        }
      else 
        return elem
    }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name }</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Main setName= { setName }/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
