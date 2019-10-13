# Dataset: https://www.kaggle.com/nasa/meteorite-landings

import apache_beam as beam
from apache_beam import pipeline
from apache_beam.io.textio import ReadFromText
import apache_beam.transforms.window as window
import json



def parse(record):
    tokens = record.split("\t")
    #print('****tokens: %s => %s' % (tokens[1], tokens[0]))
    yield "{'message': %s, 'state': %s }" % (tokens[1], tokens[0])

def execute():
    with beam.Pipeline('DirectRunner') as p:
        (p 
            | 'ReadFile'      >> ReadFromText(file_pattern='./data/SMSSpamCollection')
            | 'Deduplicate'   >> beam.RemoveDuplicates()
            | 'Parse'         >> beam.FlatMap(parse)
            | 'Write'         >> beam.io.WriteToText('./data/Output.jsonl') 
        )
    #p.run()

if __name__ == "__main__":
    execute()

