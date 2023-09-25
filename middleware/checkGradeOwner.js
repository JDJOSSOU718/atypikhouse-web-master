
export default async function ({ store, redirect }) {
    
    if (process.client) {
        if (!store.state.authUser.grade === 'owner') {
            await redirect(404, '/el?e=rnf')
        }
    }
}