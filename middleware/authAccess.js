export default async function({store, redirect}) {
  const user = await store.getters['auth/currentUser'];

  if (!user) {
    redirect('/signin')
  }
}
