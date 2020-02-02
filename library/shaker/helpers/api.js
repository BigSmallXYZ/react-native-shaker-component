/* globals fetch, XMLHttpRequest */

const API_URL = 'http://localhost:3500'

export const checkIfExists = async ({ projectId }) => {
  return fetch(`${API_URL}/projects/${projectId}/exists`).then(res => res.json())
}

export const getSignedUrl = async ({ projectId, ...restData }) => {
  return fetch(`${API_URL}/helpers/upload/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restData)
  }).then(res => {
    if (res.status !== 200) throw new Error('ERROR')
    return res.json()
  })
}

export const uploadToS3 = ({ signedUrl, uri, mime = 'image/jpeg', filename }) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', signedUrl)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr)
        console.log(xhr.response)
        if (xhr.status === 200) {
          resolve({ url: signedUrl.split('?')[0] })
        } else {
          reject(new Error('Error while sending the image to S3'))
        }
      }
    }
    xhr.setRequestHeader('Content-Type', mime)
    xhr.setRequestHeader('x-amz-acl', 'public-read')
    xhr.send({ uri, type: mime, name: filename })
  })
}

export const saveFeedback = async ({ projectId, ...restData }) => {
  return fetch(`${API_URL}/feedbacks/${projectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(restData)
  }).then(res => {
    if (res.status !== 200) throw new Error('ERROR')
    return res.json()
  })
}
