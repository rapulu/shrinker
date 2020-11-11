package db 

import(
	"sync"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//Const to hold required database config
const(
	CONNECTIONLINK = "mongodb+srv://rapulu:publicpassword123@cluster0.mp7yi.mongodb.net/testDB?retryWrites=true&w=majority"
	DB = "testDB"
	TABLE = "url"
)

/*ClientInstance used create single object of mongo Client
Initialized and exposed through GetMongoClient*/
var clientInstance *mongo.Client

//ClientInstanceError during the creation of single object mongo client
var clientInstanceError error

//MongoOnce used to execute client creation procedure once
var MongoOnce sync.Once

//GetMongoClient Initialized and exposed through GetMongoClient
func GetMongoClient() (*mongo.Client, error){
	MongoOnce.Do(func() {
		clientOption := options.Client().ApplyURI(CONNECTIONLINK)

		client, err := mongo.Connect(context.TODO(), clientOption)

		if err != nil {
			clientInstanceError = err
		}

		// Check the connection
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			clientInstanceError = err
		}
		clientInstance = client
	})
	return clientInstance, clientInstanceError
}
