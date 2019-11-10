const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

describe('Staffs',  () => {
    describe("GET /staff", () => {
        it("should return all the staffs", done => {
            request(server)
                .get("/staff")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    const result = _.map(res.body, staff => {
                        return {name: staff.name, gender: staff.gender,position: staff.position,number: staff.number};
                    });
                    expect(result).to.deep.include({name: "Bob", gender:"male",position:"waiter",number:"08"});
                    expect(result).to.deep.include({name: "Dan", gender:"male",position:"waiter",number:"09"});
                    done(err);
                });
        });
    });
    describe("GET /staff/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching staff", () => {
                request(server)
                    .get("/staff/5dc7cdda8ad3cd34ec7ce5e1")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        //console.log(res.body)
                        expect(res.body[0]).to.deep.include({name: "Bob", gender:"male",position:"waiter",number:"08"});
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return the NOT found message", () => {
                request(server)
                    .get("/staff/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)

                    .expect({message: "Staff NOT Found!"}, (err, res) => {

                    });
            });
        });
    });
    describe("POST /staff", () => {
        describe("when the id is valid", () => {
            it("should return confirmation message and update datastore", () => {
                const staff = {
                    name: "Judy",
                    gender: "female",
                    position: "waitress",
                    number: "05",
                    upvotes: 1
                };
                return request(server)
                    .post("/staff")
                    .send(staff)
                    .expect(200)
                    .then(res => {
                        expect({message: "Staff Added!"});

                        const result = _.map(res.body, staff => {
                            return {
                                name : staff.name,
                                gender : staff.gender,
                                position : staff.position,
                                number : staff.number,
                                upvotes: staff.upvotes,
                            };
                        });
                        expect(result).to.deep.include({
                            name: "Judy",
                            gender: "female",
                            position: "waitress",
                            number: "05",
                            upvotes: 1
                        });
                    });

            });

        });

    });
    describe("DELETE /staff/:id", () =>{
        describe("when the id is valid", () => {
            it("should delete the matching staff", () => {
                return request(server)

                    .delete(`/staff/5dc68c17e9db485c148fcf33`)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Staff Successfully Deleted!"
                        });

                    });
            });

            after(() => {
                return request(server)
                    .get("/staff")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then(res => {
                        //expect(res.body.length).equals(1);
                        const result = _.map(res.body, staff => {
                            return {
                                name : staff.name,
                                gender : staff.gender,
                                position : staff.position,
                                number : staff.number,
                            };
                        });
                        expect(result).to.deep.include({
                            name: "Judy",
                            gender: "female",
                            position: "waitress",
                            number: "05",
                            });
                    });
            });
        });

        describe("when the id is invalid", () => {
            it("should return the NOT found message", () => {
                request(server)
                    .delete("/staff/999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({ message: "Staff NOT DELETED!" }, (err, res) => {
                    });

            });

        });

    });
    describe("PUT /staff/:id/vote", () => {
        describe("when the id is valid", () => {
            it("should return a message and the staff upvoted by 1", () => {
                return request(server)
                    .put(`/staff/5dc7cdda8ad3cd34ec7ce5e1/vote`)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Staff Successfully Upvoted!"
                        });
                        expect(resp.body.data).to.deep.include({
                            _id: '5dc7cdda8ad3cd34ec7ce5e1',
                        });
                    });
            });
            after(() => {
                return request(server)
                    .get(`/staff/5dc7cdda8ad3cd34ec7ce5e1`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then(res => {
                        expect(res.body[0]).to.include({ _id: '5dc7cdda8ad3cd34ec7ce5e1' });
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return a 404 and a message for invalid staff id", () => {
                return request(server)
                    .put("/staff/9999/vote")
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Staff NOT Found!"
                        });
                    });
            });
        });
    });
});