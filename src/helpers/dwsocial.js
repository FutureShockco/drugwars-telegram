import client from '@/helpers/client';

function dwsocial(username, payload, cb) {
  client
    .requestAsync('custom_event', { username, payload })
    .then(result => {
      cb(result);
    })
    .catch(err => {
      cb(err);
    });
}

export default dwsocial;
