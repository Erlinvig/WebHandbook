export default async function({store, redirect}) {
  const user = await store.getters['auth/currentUser'];

  if (user) {
    if (user.status !== 'admin' && user.status !== 'guest') {
      redirect('/')
    }
  } else {
    redirect('/')
  }
}
