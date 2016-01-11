var expect = require('chai').expect,
    app = require('../server').app,
    path = require('path'),
    request = require('supertest'),
    jade = require('jade'),
    UsersController = require('../server/controllers/UsersController');

var viewsPath = path.normalize(__dirname + '/../server/views');

describe("UsersController", function () {
    describe("#getRegister()", function () {
        it("should return register template", function (done) {
            request(app)
                .get('/register')
                .expect(200)
                .end(function (err, res) {
                    var html = jade.renderFile(viewsPath + '/users/register.jade');
                    expect(res.text).to.equal(html);
                    done();
                });
        });
    });

    describe("#postRegister()", function () {
        it("should redirect after registration", function (done) {
            request(app)
                .post('/register')
                .send(
                    {
                        username: 'johh',
                        password: '123123',
                        confirmPassword: '13123'
                    })
                .expect(302)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(302);
                    done();
                });
        });
    });
});
