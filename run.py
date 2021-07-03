from chatbot import app
from flask import Flask , render_template, url_for, flash, redirect, request, abort, jsonify
import processor

@app.route('/about', methods=["GET", "POST"])
def about():
    return render_template('about.html', **locals())

@app.route('/chatbot', methods=["GET", "POST"])
def chatbotResponse():

    if request.method == 'POST':
        the_question = request.form['question']

        response = processor.chatbot_response(the_question)

    return jsonify({"response": response })

if __name__ == '__main__':
    app.run(debug=True)
