var chakram = require('chakram'),
    expect = chakram.expect;

describe("API Testing for https://github.com/typicode/jsonplaceholder", function() {
   
    it("should return 1 post", function() {

        var expectedJson = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
        
        var post = chakram.get("http://jsonplaceholder.typicode.com/posts/1");
        
        expect(post).to.have.json(expectedJson);
        
        return chakram.wait();
    });
    
    it("should return all posts", function() {
        
        var allPosts = chakram.get("http://jsonplaceholder.typicode.com/posts");
        
        expect(allPosts).to.have.status(200);
        //TODO: Figure out how to check the length of a JSON
        
        return chakram.wait();
    });
    
    it("should create 1 post", function() {
        
        var postToBeCreated = {
            "data": {
                "title": "foo",
                "body": "bar",
                "userId": 1
            }
        };
        
        var expectedJson = {
            "data": {
                "title": "foo",
                "body": "bar",
                "userId": 1
            },
                "id": 101
        };
        
        var createdPost = chakram.post("http://jsonplaceholder.typicode.com/posts", postToBeCreated);
        
        return expect(createdPost).to.comprise.of.json(expectedJson);
    });
    
    it("should update 1 post", function() {
        
        var postToBeUpdated = {
            "data": {
                "id": 1,
                "title": "foo",
                "body": "bar",
                "userId": 1
            }
        };
        
        var expectedJson = {
            "data": {
                "id": 1,
                "title": "foo",
                "body": "bar",
                "userId": 1
            },
                "id": 1
        };
        
        var updatedPost = chakram.put("http://jsonplaceholder.typicode.com/posts/1", postToBeUpdated);
        
        return expect(updatedPost).to.comprise.of.json(expectedJson);
    });
    
    it("should delete 1 post", function() {
        
        var expectedJson = {};
        
        var deletedPost = chakram.delete("http://jsonplaceholder.typicode.com/posts/1");
        
        return expect(deletedPost).to.comprise.of.json(expectedJson);
    })
});