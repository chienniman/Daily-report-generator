import pandas as pd

input_file = 'src.csv'
output_file = 'demo.csv'
columns_to_exclude = ['PTDPNA', 'PRDTCODE', 'PUPRNA']
foo_value = 'test'

df = pd.read_csv(input_file,encoding='BIG5')

for column in df.columns:
    if column not in columns_to_exclude:
        df[column] = foo_value

df.to_csv(output_file, index=False)