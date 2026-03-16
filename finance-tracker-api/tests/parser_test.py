# This file will be used as test file for the file parser, we will test the parse_csv function to make sure it is working correctly.

import unittest
from app.services.file_parser import FileParser
from app.schemas.transaction import TransactionCreate

class TestFileParser(unittest.TestCase):
    def test_parse_csv(self):
        csv_content = """Transaction Date,Description,Category,Debit
        2021-01-01,Test Transaction 1,Test Category 1,100.00
        2021-01-02,Test Transaction 2,Test Category 2,200.00
        """
        
        FileParser.parse_csv(csv_content, reportId=1)
        expected = [
            TransactionCreate(report_id=1, amount='100.00', category='Test Category 1', description='Test Transaction 1', date='2021-01-01'),
            TransactionCreate(report_id=1, amount='200.00', category='Test Category 2', description='Test Transaction 2', date='2021-01-02')
        ]
        self.assertEqual(FileParser.parse_csv(csv_content, reportId=1), expected)
        
if __name__ == '__main__':
    unittest.main()
    
