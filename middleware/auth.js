// Authentication logic

export default async function ({ store, redirect }) {

    if(process.client){
        if (!store.state.authUser) {
            await redirect('/login')
        }
    }
}