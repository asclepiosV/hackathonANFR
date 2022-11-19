import pandas as pd
import csv

df = pd.read_csv("data/Exemplesdonneeschallenge1.csv", sep=";")

dfHorsTelMobile = df.loc[df['ID_SYSTEME'] == 0]
dfAvecTelMobile = df.loc[df['ID_SYSTEME'] == 1]

print(dfHorsTelMobile.to_string())
print(dfAvecTelMobile.to_string())

