const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let datastore = require("../../../models/food");

describe('Foods',  () => {

    describe("GET /food", () => {
        it("should return all the foods", done => {
            request(server)
                .get("/food")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    const result = _.map(res.body, food => {
                        return {name: food.name, price: food.price};
                    });
                    expect(result).to.deep.include({name: "test1", price: 100});
                    done(err);
                });
        });
    });
    describe("GET /food/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching food", () => {
                request(server)
                    .get("/food/5dc82f8fbd3b40a0bc116cb9")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        //console.log(res.body)
                        expect(res.body[0]).to.deep.include({name: "test1", price: 100});
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return the NOT found message", () => {
                request(server)
                    .get("/food/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)

                    .expect({message: "Food NOT Found!"}, (err, res) => {

                    });
            });
        });
    });
    describe("POST /food", () => {
        describe("when the id is valid", () => {
            it("should return confirmation message and update datastore", () => {
                const food = {
                    name: "hamburger",
                    price: 13,
                    upvotes: 1
                };
                return request(server)
                    .post("/food")
                    .send(food)
                    .expect(200)
                    .then(res => {
                        expect({message: "Food Added!"});

                        const result = _.map(res.body, food => {
                            return {
                                name: food.name,
                                price: food.price,
                                upvotes: food.upvotes,
                            };
                        });
                        expect(result).to.deep.include({
                            name: "hamburger",
                            price: 13,
                            upvotes: 1
                        });
                    });

            });

        });

    });
    describe("DELETE /food/:id", () =>{
        describe("when the id is valid", () => {
            it("should delete the matching food", () => {
                return request(server)

                    .delete(`/food/5dc84500381919a9886ff266`)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Food Successfully Deleted!"
                        });

                    });
            });

            after(() => {
                return request(server)
                    .get("/food")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then(res => {
                        //expect(res.body.length).equals(1);
                        const result = _.map(res.body, food => {
                            return {
                                name: food.name,
                                price: food.price,
                            };
                        });
                        expect(result).to.deep.include({name:'hamburger',price:13});
                    });
            });
        });

        describe("when the id is invalid", () => {
            it("should return the NOT found message", () => {
                request(server)
                    .delete("/food/999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({ message: "Food NOT DELETED!" }, (err, res) => {
                    });

            });

        });

    });
    describe("PUT /food/:id/vote", () => {
        describe("when the id is valid", () => {
            it("should return a message and the food upvoted by 1", () => {
                return request(server)
                    .put(`/food/5dc82f8fbd3b40a0bc116cb9/vote`)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Food Successfully Upvoted!"
                        });

                    });
            });
            after(() => {
                return request(server)
                    .get(`/food/5dc82f8fbd3b40a0bc116cb9`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then(res => {
                        expect(res.body[0]).to.include({ _id: '5dc82f8fbd3b40a0bc116cb9' });
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return a 404 and a message for invalid food id", () => {
                return request(server)
                    .put("/food/9999/vote")
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Food NOT Found!"
                        });
                    });
            });
        });
    });

});