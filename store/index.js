import Vuex from 'vuex'
import state from'../template-core/store/state'

const createStore = () => {
    return new Vuex.Store({
        state: () =>{
            return{
                ...state,
                customValue:'value'
            }
        },
        actions: ()=>{},
        mutations:()=>{},
        getters:()=>{},
    })
}
export default createStore
