import { db } from './firebase-config'

export const addDocument = collection => data => {
  return db
    .ref(collection)
    .push({ status: 1, ...data })
    .then(snap => returnObject(202, 'Documento agregado', { id: snap.key }))
    .catch(e => 404)
}

export const getDocument = collection => id => {
  return db
    .ref(collection)
    .child(id)
    .once('value')
    .then(snapshot => ({ id: snapshot.key, ...snapshot.val() }))
    .catch(e => 404)
}

export const getDocumentsByModel = model => {
  let data = []
  return db
    .ref(model)
    .once('value')
    .then(snapshot => {
      data = []
      snapshot.forEach(document => {
        data.push({ id: document.key, ...document.val() })
      })
      return data
    })
    .catch(e => e)
}

export const updateDocument = collection => ({ id, ...data }) => {
  return db
    .ref(collection)
    .child(id)
    .update({ ...data })
    .then(snap => returnObject(202, 'Documento actualizado'))
    .catch(() => 404)
}

function returnObject(status, message, params) {
  return { status, message, params }
}
