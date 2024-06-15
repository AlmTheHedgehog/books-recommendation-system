import numpy as np
import pandas as pd
import sklearn as sk

from sklearn.neighbors import NearestNeighbors
from scipy.spatial.distance import euclidean, cosine, dice, chebyshev
from sklearn.preprocessing import OneHotEncoder, QuantileTransformer, FunctionTransformer
from sklearn.neighbors import NearestNeighbors
from sklearn.compose import ColumnTransformer
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn.decomposition import TruncatedSVD  
from Transformer import TextFilter

class RecommandationSystem:
    cat = ['category']
    numeric = ['book_depository_stars']
    mood = ['Happy', 'Angry', 'Surprise', 'Sad', 'Fear']

    def __init__(self):       
        self.__path = None 
        self.data = None
        self.__data_api = None
        self.__trans_data = None
        self.__cat_indices = None
        self.__con_indices = None
        self.__mood_indices = None
        self.__text_indices = None
        self.__prep = None
        self.__model_mood = None
        self.__model = None
            
    def init(self, path, drop_columns):
        self.__path = path
        self.__load_data_csv()
        self.__data_api = self.data.drop(drop_columns, axis=1)
        self.__transform_data()
        self.__model = NearestNeighbors(n_neighbors=15, metric=self.__custom_distance_maker(mood=False), n_jobs=-1)
        self.__model.fit(self.__trans_data)
        self.__model_mood = NearestNeighbors(n_neighbors=15, metric=self.__custom_distance_maker(), n_jobs=-1)
        self.__model_mood.fit(self.__trans_data)

    def get_recommandations(self, id, happy=0, sad=0, surprise=0, angry=0, fear=0):
        query = self.data.iloc[[id]]
        trans_query = self.__prep.transform(query)
            #the mood attributes will be important when we have user data but because in the dummy
            #  model we do not have any data we only consider the mood of the books and not of the user 
        if happy + sad + surprise + angry + fear > 0:
            dist, indices = self.__model_mood.kneighbors(trans_query)
        else:
            dist, indices = self.__model.kneighbors(trans_query)
        return self.__data_api.iloc[indices[0]]

    def __load_data_csv(self):
        self.data = pd.read_csv(self.__path)


    
    def __transform_data(self):
        cat_transformer = Pipeline(steps=[('onehot', OneHotEncoder())])

        text_transformer = Pipeline(steps=[('filter', TextFilter()),
                                        ('text', CountVectorizer()),
                                        ('svd', TruncatedSVD(n_components=4))])
        
        numeric_transformer = Pipeline(steps=[('numeric', QuantileTransformer())])
        
        nothing_transformer = Pipeline(steps=[('nothing', FunctionTransformer(lambda x: x))])

        self.__prep = ColumnTransformer(transformers=[('cat', cat_transformer, self.cat),
                                            ('numeric', numeric_transformer, self.numeric),
                                            ('mood', nothing_transformer, self.mood),
                                            ('text', text_transformer, 'name')                                           
                                            ], sparse_threshold=0)
        
        self.__trans_data = self.__prep.fit_transform(self.data)

        #calc indices
        uniques = []
        for c in self.cat:
            uniques.append(self.data[c].nunique()) 

        cat_start = 0
        cat_end = cat_start + sum(uniques)
        con_start = cat_end
        con_end = con_start + len(self.numeric)
        mood_start = con_end
        mood_end = mood_start + len(self.mood)
        text_start = mood_end
        text_end = self.__trans_data.shape[1]

        self.__cat_indices =  list(range(cat_start, cat_end))
        self.__con_indices =  list(range(con_start, con_end))
        self.__mood_indices = list(range(mood_start, mood_end))
        self.__text_indices = list(range(text_start, text_end))


    def __custom_distance_maker(self, mood =True):
        def custom_distance(x,y):            
            x_cat = x[self.__cat_indices]
            y_cat = y[self.__cat_indices]
            x_con = x[self.__con_indices]
            y_con = y[self.__con_indices]            
            x_text = x[self.__text_indices]
            y_text = y[self.__text_indices]

            d_con = euclidean(x_con,y_con)
            d_cat = dice(x_cat,y_cat)
            d_text = cosine(x_text,y_text)
            d_mood = 0

            if mood:
                x_mood = x[self.__mood_indices]
                y_mood = y[self.__mood_indices]
                d_mood = chebyshev(x_mood, y_mood)
            return  d_con + d_cat + d_mood + d_text
        return custom_distance
    
