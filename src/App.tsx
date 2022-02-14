import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barChartOutline, ellipse, logoFacebook, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import { useEffect, useState } from 'react';
import { getData, Store } from './pages/Store';
import { Login } from './components/Login';

setupIonicReact();

const App: React.FC = () =>{
  const [ auth, setAuth] = useState(Store.getState().auth)

  async function load(){
    console.log("Склады")
    let res = await getData("Склады", {})
    console.log(res)
    Store.dispatch({type: "stores", stores: res})
    Store.dispatch({type: "param1", Склады: StoreToString(res)})
  }

  useEffect(()=>{
    load();
  },[])

  
function StoreToString(stor): Array<string>{

  return stor.map(function(st){
      if(st.checked) return st.value
      return ""
  })
}

  Store.subscribe({num: 1, type: "auth", func: ()=>{
    load()
    setAuth(Store.getState().auth)
  }})
  
  if(!auth)
    return ( 
      <IonApp>
        <Login />
      </IonApp>
    )
  else
    return (  
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tab1">
                  <IonIcon icon={ barChartOutline} />
                  <IonLabel>Продажи</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2">
                  <IonIcon icon={ellipse} />
                  <IonLabel>Tab 2</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3">
                  <IonIcon icon={square} />
                  <IonLabel>Tab 3</IonLabel>
                </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
};

export default App;
