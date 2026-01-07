from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app) 

MONGO_URI = "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/oop?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['oop']
tasks_collection = db['Customers']

@app.route('/customer', methods=['GET'])
def get_tasks():
    tasks = list(tasks_collection.find())
    for task in tasks:
        task['_id'] = str(task['_id'])
    return jsonify(tasks)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3007))
    app.run(host='0.0.0.0', port=port)