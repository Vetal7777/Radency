import api from '../shared/utilities/api';

export default class RemindersModel{
    api = api;
    async get(){
        return await api.get('')
            .then(r => r.data);
    }
    edit(id,obj){
        return api.put('/' + id,obj)
            .then(r => r.data);
    }
    add(obj){
        return api.post('',obj)
            .then(r => r.data);
    }
    delete(id){
        return api.delete('/' + id)
            .then(r => r);
    }
}