const { api, expect } = require('../spec_helper');
const User            = require('../../models/user');

describe('User Controller Test', () => {
  let gUser;
  let myToken;

  beforeEach(done => {
    User
      .remove()
      .then(() => done())
      .catch(done);
  });

  beforeEach(done => {
    User
      .create({
        username: 'kanye',
        email: 'kanye@kanye.com',
        password: 'password',
        passwordConfirmation: 'password'
      })
      .then(user => {
        gUser = user;
      })

      .catch(done);
  });

  afterEach(done => {
    User
      .remove()
      .then(() => done())
      .catch(done);
  });

  describe('GET /api/users', () => {

    beforeEach(done => {
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: gUser.email,
          password: 'password'
        })
        .end((err, res) => {
          myToken = res.body.user.token;
        })
        .catch(done);
    });

    it('should return a 200 response', function(done) {
    // this.skip();
      api
        .post('/api/users')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+myToken)
        .send({
          email: gUser.email,
          password: 'password'
        })
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status)
            .to.eq(200);
          done();
        });
    });



  });
});
