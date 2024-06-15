import pandas as pd
import numpy as np
from Transformer import TextFilter

class SearchSystem:
    
    def __init__(self):
        self.__search_data = None
        self.__data = None
        self.__filter = None

    def init(self, path, column, drop_columns):
        data = pd.read_csv(path)
        data = data.drop(drop_columns, axis=1)
        self.__data = data
        self.__filter = TextFilter()
        self.__search_data = self.__filter.transform(data[column])

    def search(self, query):       
        query_words = self.__filter.transform_str(query)
        result = []
        for idx, title in enumerate(self.__search_data):
            count = 0
            for query_w in query_words:
                count = count + 1 if query_w in title else count
            result.append([idx, count])
        result = np.array(result)
        result = result[result[:, 1] > 0]
        result = result[result[:, 1].argsort()[::-1]]

        return self.__data.iloc[result[:15, 0]]