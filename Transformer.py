import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.base import BaseEstimator, TransformerMixin  

class TextFilter(BaseEstimator, TransformerMixin):
    def __init__(self, language='english'):        
        self.language = language
        nltk.download('stopwords')
        nltk.download('punkt')
        self.stop_words = set(stopwords.words(self.language))
    
    def fit(self, X, y=None):
        return self
    
    def transform(self, X, y=None):           
        filtered_title = []
        for title in X:
            tokens = word_tokenize(title)
            filtered_tokens = [word for word in tokens if word.lower() not in self.stop_words]
            filtered_title.append(' '.join(filtered_tokens))
        return filtered_title
    
    def transform_str(self, x):
        tokens = word_tokenize(x)
        filtered_tokens = [word for word in tokens if word.lower() not in self.stop_words]
        return filtered_tokens
    