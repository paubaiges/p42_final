# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

from markupsafe import escape
from flask import Flask, render_template, request
from platformdirs import user_runtime_path
from flask import jsonify
import json
from detectionbeat import compareAudio

app = Flask(__name__,template_folder='src')

def save_json(dictionary, name_file):
    with open(name_file, 'w') as fp:
        json.dump(dictionary, fp, sort_keys=True, indent=4)

def load_json(name_file):
    data = None
    with open(name_file, 'r') as fp:
        data = json.load(fp)
    return data

def analyse_exercise(file_path,id_song,name):
    a = compareAudio(file_path,id_song)
    rankings = load_json("rankings.json")
    rankings[name] = {"score":a}
    save_json(rankings, "rankings.json")
    return a

def add_ranking(user_name, id_pista, a):
    ranking = load_json("rankings.json")
    if user_name not in ranking:
        ranking[user_name] = {}

    if id_pista not in ranking[user_name] or ranking[user_name][id_pista] < a:
        ranking[user_name][id_pista] = a

    save_json(ranking, "rankings.json")


def get_ranking():
    ranking = load_json("ranking.json")

    output_ranking = []
    for user_name, pistas in ranking.items():
        number_exercises_finished = 0 
        accum_points = 0
        for n_pista, value_pista in pistas.items():
            number_exercises_finished += 1
            accum_points += value_pista
        output_ranking.append((user_name, accum_points, number_exercises_finished))

    output_ranking.sort(key=lambda y: y[1])
    
    return jsonify(output_ranking)

@app.route("/analyse/<id_song>")
def sign(id_song):
    if request.method == 'PUT':
        f = request.files['file']
        filePath = "./temp/"+ secure_filename(f.filename)
        f.save(filePath)
        feedback = analyse_exercise(id_song, filePath)
    return jsonify(feedback)

@app.route("/signup_user/<name>")
def sign_up(name):
    users = load_json("users.json")
    print(users)
    if name not in users:
        users[name] = {}
        save_json(users, "users.json")
    return f"Done"

@app.route("/addscore/<name>/<pista>/<score>")
def addscore(name, score):
    users = load_json("users.json")
    users[name] = {"score":score}
    print(users)
    save_json(users, "users.json")
    return f"Done"

@app.route("/play_pista/<name>/<pista>")
def play_pista(name, pista):
    users = load_json("users.json")
    users[name] = {"pista":pista}
    print(users)
    save_json(users, "users.json")
    return f"Done"

@app.route("/list_users")
def list_users():
    return jsonify(load_json("users.json"))



@app.route('/upload', methods=['POST'])
def upload():
    #print(1)
    if request.method == 'POST':
        #print(2)
        f = request.files['wavfile']
        i = request.files['id']
        i.save('./i.txt')
        #print(3)
        f.save('./new_audio3.wav')
        #print(4)
        print(i)
        #score = analyse_exercise()
        # a partir de aqui analizamos el audio y damos feedback
        # TODO TENEIS QUE CARGAR EL ID REAL en vez de 1
        f = open ('i.txt','r')
        mensaje = f.read()
        print(mensaje)
        f.close()
        a = compareAudio('./new_audio3.wav', mensaje)
        # TODO rankings
        # rankings = load_json("rankings.json")
        # rankings[name] = {"score":a}
        # save_json(rankings, "rankings.json")
        print(f'Score: {a}')
    return jsonify(a), 200
    
        