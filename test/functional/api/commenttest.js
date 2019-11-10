const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

describe('Comments',  () => {
    describe("GET /comment", () => {
        it("should return all the comments", done => {
            request(server)
                .get("/comment")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    const result = _.map(res.body, comment => {
                        return {title: comment.title, content: comment.content};
                    });
                    expect(result).to.deep.include({title: "Unlike", content: "ghjk"});
                    expect(result).to.deep.include({title: "like", content: "wert"});
                    done(err);
                });
        });
    });
    describe("POST /comment", () => {
        describe("when the id is valid", () => {
            it("should return confirmation message and update datastore", () => {
                const comment = {
                    title: "Unlike",
                    content: "dfg"

                };
                return request(server)
                    .post("/comment")
                    .send(comment)
                    .expect(200)
                    .then(res => {
                        expect({message: "Comment Added!"});

                        const result = _.map(res.body, comment => {
                            return {
                                title: comment.title,
                                content: comment.content,
                            };
                        });
                        expect(result).to.deep.include({
                            title: "Unlike",
                            content: "dfg"
                        });
                    });

            });

        });

    });
});