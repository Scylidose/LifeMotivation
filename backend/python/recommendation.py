import pandas as pd
import sqlite3
import json

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

class RecommendationSystem:
    def __init__(self, db_path):
        self.conn = sqlite3.connect(db_path)
        self.nltk_setup()
        self.label_encoder = LabelEncoder()
        self.tfidf_vectorizer = TfidfVectorizer()
        self.scaler = StandardScaler()

    
    def nltk_setup(self):
        nltk.download('stopwords')
        self.stop_words = set(stopwords.words('english'))
        self.stemmer = PorterStemmer()
    
    def load_data(self):
        objectives_query = "SELECT * FROM objectives"
        actions_query = "SELECT * FROM actions"
        
        self.objectives_df = pd.read_sql_query(objectives_query, self.conn)
        self.actions_df = pd.read_sql_query(actions_query, self.conn)

        self.objectives_df.columns = self.objectives_df.columns.map(lambda x: f"{x}_objective")

        self.merged_df = pd.merge(self.actions_df, self.objectives_df, left_on='objectiveId', right_on='id_objective', how='inner')

        self.conn.close()
    
    def clean_text(self, text):
        text = text.lower()
        tokens = word_tokenize(text)
        tokens = [word for word in tokens if word.isalnum()]
        tokens = [word for word in tokens if word not in self.stop_words]
        tokens = [self.stemmer.stem(word) for word in tokens]
        return ' '.join(tokens)
    

    def drop_data(self):
        self.merged_df = self.merged_df.drop(columns=['author_objective', 'id_objective', 'consistencyStreak', 'objectiveId', 'daysOfWeek'])
        self.merged_df = self.merged_df.drop(columns=['publishedDateTime_objective', 'intendedFinishDateTime_objective', 'realFinishDateTime_objective', 'publishedDateTime'])

    def parse_days_of_week(self, json_str):
        return json.loads(json_str.replace('false', 'false').replace('true', 'true'))


    def preprocess_data(self):
        self.merged_df['comment'] = self.merged_df['comment'].fillna('')

        self.merged_df['title_process'] = self.merged_df['title'].apply(self.clean_text)
        self.merged_df['description'] = self.merged_df['description'].apply(self.clean_text)
        self.merged_df['comment'] = self.merged_df['comment'].apply(self.clean_text)
        self.merged_df['title_objective'] = self.merged_df['title_objective'].apply(self.clean_text)
        self.merged_df['description_objective'] = self.merged_df['description_objective'].apply(self.clean_text)
        
        self.merged_df['author'] = self.label_encoder.fit_transform(self.merged_df['author'])

        mean_diff = (self.merged_df['intendedDuration'] - self.merged_df['realDuration']).mean()
        self.merged_df['realDuration'].fillna(self.merged_df['intendedDuration'], inplace=True)

        self.merged_df['daysOfWeek'] = self.merged_df['daysOfWeek'].apply(self.parse_days_of_week)

        days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        for day in days:
            self.merged_df[day] = self.merged_df['daysOfWeek'].apply(lambda x: x[day])


    def create_tfidf_features(self):
        self.tfidf_data = self.tfidf_vectorizer.fit_transform(self.merged_df['title_process'] + ' ' + self.merged_df['description'] + ' ' + self.merged_df['comment'] + ' ' + self.merged_df['title_objective'] + ' ' + self.merged_df['description_objective'])
        self.tfidf_df = pd.DataFrame(self.tfidf_data.toarray(), columns=self.tfidf_vectorizer.get_feature_names_out(input_features=self.merged_df['title']))


    def scale_numerical_features(self):
        numerical_columns = ['importance', 'frequency', 'difficulty', 'intendedDuration', 'realDuration', 'priority_objective', 'complexity_objective']
        self.merged_df[numerical_columns] = self.scaler.fit_transform(self.merged_df[numerical_columns])

        
    def compute_similarity(self):
        self.similarities = cosine_similarity(self.tfidf_data, self.tfidf_data)
    
    def recommend(self, input_document_index, num_recommendations=5):
        similarity_scores = list(enumerate(self.similarities[input_document_index]))
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        similar_indices = [i for i, _ in similarity_scores if i != input_document_index]
        return similar_indices[:num_recommendations]

    def run_recommendation(self, input_document_index):
        self.load_data()
        self.preprocess_data()
        self.create_tfidf_features()
        self.scale_numerical_features()
        self.drop_data()
        self.compute_similarity()
        
        recommended_indices = self.recommend(input_document_index)
        
        recommended_id = []

        for idx in recommended_indices:
            recommended_id.append(self.actions_df['id'][idx])

        return recommended_id
