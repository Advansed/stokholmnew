import { combineReducers  } from 'redux'
import axios from 'axios'
import { Reducer } from 'react';

var reducers: Array<Reducer<any, any>>;reducers = []

function i_data(){
    var date = new Date();
    let str = date.toISOString().substr(0, 10)
    return str.substr(0, 4)+ "-" + str.substr(5, 2)  + "-" + str.substr(8, 2)
}

export const i_state = {

    auth:               true,
    user:{
        user:           "Администратор",
        password:       "123456",
        role:           "Полный"
    },
    goods: [],
    docs: [],
    dist: [],
    stores: [],
    param1: {
        Номенклатура: "",
        Склады: [],
        Группа: [""]
    },

    basket: [],

    search: {Дата: i_data(), Номенклатура: "", Пользователь: false}

}


for(const [key, value] of Object.entries(i_state)){
    reducers.push(
        function (state = i_state[key], action) {
            switch(action.type){
                case key: {
                    if(typeof(value) === "object"){
                        if(Array.isArray(value)) {
                            return action[key]
                        } else {
                            let data: object; data = {};
                            for(const key1 of Object.keys(value)){ 
                                data[key1] = action[key1] === undefined ? state[key1] : action[key1]
                            }   
                            return data
                        }

                    } else return action[key]
                }
                default: return state;
            }       
        }

    )
}


export async function   postData(method : string, params){

    let res = await axios.post(
          URL1C + method
        , params
        ,{
            auth: {
              username: unescape(encodeURIComponent(Store.getState().user.user)),
              password: unescape(encodeURIComponent(Store.getState().user.password))
            }
          } 
    ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}

export async function   getData(method : string, params){

    let res = await axios.get(
          URL1C + method
        ,{
            auth: {
              username: unescape(encodeURIComponent(Store.getState().user.user)),
              password: unescape(encodeURIComponent(Store.getState().user.password))
            }, params
        } 
    ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}


function                create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var listeners: Array<any>; listeners = []
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            listeners.forEach((elem)=>{
                if(elem.type === action.type){
                    elem.func();
                }
            })
            return action;
        },
        subscribe(listen: any) {
            var ind = listeners.findIndex(function(b) { 
                return b.num === listen.num; 
            });
            if(ind >= 0){
                listeners[ind] = listen;
            }else{
                listeners = [...listeners, listen]
            }
        },
        unSubscribe(index) {
            var ind = listeners.findIndex(function(b) { 
                return b.num === index; 
            });
            if(ind >= 0){
                listeners.splice(ind, 1)
            }        
        }
    };
}

const                   rootReducer = combineReducers({

    auth:                       reducers[0],
    user:                       reducers[1],
    goods:                      reducers[2],
    docs:                       reducers[3],
    dist:                       reducers[4],
    stores:                     reducers[5],
    param1:                     reducers[6],
    basket:                     reducers[7],
    search:                     reducers[8],

})

export const Store   =  create_Store(rootReducer, i_state)

export const URL1C = "http://91.185.236.216:29080/trade/hs/API/V1/"




export function Phone(phone): string {
    if(phone === undefined) return ""
    if(phone === null) return ""
    let str = "+"
    for(let i = 0;i < phone.length;i++){
      let ch = phone.charCodeAt(i)
      if( ch >= 48 && ch <= 57) str = str + phone.charAt(i)
    }
    return str
}

async function          exec(){

}

exec();
