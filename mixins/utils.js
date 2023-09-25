export default {
    methods: {
        getStatusName(status) {
            switch (status) {
                case 'ban':
                    return 'Bloquer'
                    break;
                case 'publish':
                    return 'Publier'
                    break;
                case 'pending':
                    return 'En attente'
                    break;
                case 'reject':
                    return 'Rejeté'
                    break;
                case 'approve':
                    return 'Approuvé'
                    break;
                
                case 'canceled':
                    return 'Annuler'
                    break;
            
                default:
                    return '---'
                    break;
            }
        },
        getStatusBadge(status){
            switch (status) {
                case 'ban':
                    return 'danger'
                    break;
                case 'reject':
                    return 'danger'
                    break;
                case 'publish':
                    return 'success'
                    break;
                case 'approve':
                    return 'success'
                    break;
                case 'pending':
                    return 'info'
                    break;
                case 'canceled':
                    return 'info'
                    break;
            
                default:
                    return 'info'
                    break;
            }
        },

        getGradeName (grade){
            switch (grade) {
                case 'owner':
                    return 'Propriétaire'
                    break;
                case 'customer':
                    return 'Client'
                    break;
                case 'administrator':
                    return 'Gérant'
                    break;
                default:
                    return 'Client'
                    break;
            }
        },

        getGradeBadge(grade){
            switch (grade) {
                case 'owner':
                    return 'primary'
                    break;
                case 'customer':
                    return 'info'
                    break;
                case 'administrator':
                    return 'success'
                    break;
            
                default:
                    return 'info'
                    break;
            }
        },

        getOnlineName (online){
            switch (online) {
                case true:
                    return 'En ligne'
                    break;

                default:
                    return 'Déconnecté'
                    break;
            }
        },

        getOnlineBadge(online){
            switch (online) {
                case true:
                    return 'success'
                    break;
                
                default:
                    return 'secondary'
                    break;
            }
        },

        async getFormatedArrays (arr=[], keys=[]){
            let re = []
            arr.forEach(element => {
                let obj = {}
                for (let index = 0; index < keys.length; index++) {
                    const el = keys[index];
                    if(element[el]) obj[el] = element[el]
                }
                re.push(obj)
            });

            return await re
        }
    }
}
