# This file will contain the logic for parsing the uploaded files and extracting the transaction data from them.

import csv
from datetime import datetime
from io import StringIO
from typing import List
from app.schemas.transaction import TransactionCreate


class FileParser:
    @staticmethod
    def parse_csv(file_content: str, reportId: int) -> List[TransactionCreate]:
        transactions = []
        # Use StringIO to read the file content as a file-like object
        csv_file = StringIO(file_content)
        reader = csv.DictReader(csv_file)
        # This is just temporary since not every bank has the same format for their csv files, we will need to make this more flexible in the future to support different formats.
        for row in reader:
            # If empty row, assume we have reached the end of the file and break the loop
            if not row['Transaction Date'] or not row['Transaction Date'].strip():
                continue
            transactions.append(TransactionCreate(
                report_id=reportId,
                amount=float(row['Debit'].strip()),
                category=row['Category'].strip(),
                description=(row.get('Description') or "").strip(),
                date = datetime.strptime(row['Transaction Date'].strip(), '%Y-%m-%d')
            ))
        return transactions
        