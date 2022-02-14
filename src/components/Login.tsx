import { IonButton, IonInput } from "@ionic/react"
import { useState } from "react"
import { getData, Store } from "../pages/Store"

import './Login.css'

export function Login():JSX.Element {
    const [ user ] = useState(Store.getState().user)

    async function login(){
        console.log(user)
        let res = await getData("Логин",{})
        if(res.Тип !== undefined){
            Store.dispatch({type: "user", role: res.Тип })
            Store.dispatch({type: "auth", auth: true })
            console.log("Коннект")    
        }
    }

    let elem = <>
        <div className="w-100 h-100 bg-gray">
            <div className="h-20"></div>
            <div className="borders mt-1 ml-1 mr-1 bg-white">
                <div className=""> <b>Вход в программу</b> </div>
                <div className="ml-2 mr-2 mt-1">
                    <IonInput
                        className="l-input"
                        type = "text"
                        placeholder="Логин" 
                        onIonChange={(e)=>{
                            user.user = e.detail.value
                        }}                       
                    />
                </div>
                <div className="ml-2 mr-2">
                    <IonInput
                        className="l-input"
                        type = "password"
                        placeholder="Пароль"                        
                        onIonChange={(e)=>{
                            user.password = e.detail.value
                        }}                       
                    />
                </div>
                <div className="flex fl-right mt-1">
                    <IonButton
                        fill = "outline"
                        onClick={()=>{
                            login()
                        }}
                    >
                        Вход
                    </IonButton>
                </div>
            </div>
        </div>
    </>

    return elem
}