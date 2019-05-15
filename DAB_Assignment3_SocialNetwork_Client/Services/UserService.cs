using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using SocialNetwork.Model;

namespace SocialNetwork.Services
{
    public class UserExistsException : Exception
    {
        public UserExistsException()
        {}

        public UserExistsException(string msg): base(msg)
        {}
    }

    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserService(IConfiguration configuration)
        {
            var mongoClient = new MongoClient(configuration.GetConnectionString("SocialNetworkDb"));
            var database = mongoClient.GetDatabase("SocialNetworkDb");
            _usersCollection = database.GetCollection<User>("User");
        }
        public List<User> Get()
        {
            return _usersCollection.Find(user => true).ToList();
        }

        public User Get(string id)
        {
            return _usersCollection.Find<User>(user => user.UserId == id).FirstOrDefault();
        }

        public User Get(string email,string password)
        {
            return _usersCollection.Find<User>(user => 
                user.Email == email && user.Password == password).FirstOrDefault();
        }


        public User GetUser(string email)
        {
            return _usersCollection.Find<User>(user =>
                user.Email == email).FirstOrDefault();
        }

        public User Create(User user)
        {
            var userExists = _usersCollection.Find(u => u.Email == user.Email).FirstOrDefault();
            if (userExists != null)
                throw new UserExistsException($"Email already in use {user.Email}");
            _usersCollection.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn)
        {
            _usersCollection.ReplaceOne(user => user.UserId == id, userIn);
        }

        public void Remove(User userIn)
        {
            _usersCollection.DeleteOne(user => user.UserId == userIn.UserId);
        }

        public void Remove(string id)
        {
            _usersCollection.DeleteOne(user => user.UserId == id);
        }
    }

}