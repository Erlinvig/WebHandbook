export default async function({store, redirect}) {
  const user = await store.getters['auth/currentUser'];

  if (user) {
    if (user.status !== 'admin') {
      redirect('/')
    }
  } else {
    redirect('/')
  }
}
