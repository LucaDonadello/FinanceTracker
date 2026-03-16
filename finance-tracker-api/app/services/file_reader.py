# This file will contain the logic to read the uploaded files and pass the content to the file parser to extract the transaction data from them.

class FileReader:
    @staticmethod
    def read_csv(file_path) -> str:
        with open(file_path, 'r') as f:
            return f.read()