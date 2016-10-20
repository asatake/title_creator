#!/usr/bin/python
# encoding: utf-8

import xml.etree.ElementTree as ET
import csv
import re

word_list = []
filename = 'dictionary.csv'
i = 0

# JMdict
tree = ET.parse('JMdict_e')
root = tree.getroot()

es = root.findall('.//entry')

word_list.append(('id', 'en', 'ja'))
for j in es:
    try:
        ja = j.find('.//keb').text
    except:
        ja = j.find('.//reb').text
    en = j.find('.//gloss').text
    word_list.append((i, en, ja))
    i += 1

# JMdict writing
with open(filename, 'w') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerows(word_list)


# utx_pack(Medical)
word_list = []
with open('./medutx1.05.utx', 'r') as f:
    for j in f.readlines():
        if re.search('^#.*', j) is None:
            x = j.rstrip('\n').split('\t')
            en = x[0]
            ja = x[1]
            word_list.append((i, en, ja))
            i += 1

# utx writing
with open(filename, 'a') as f:
    writer = csv.writer(f, lineterminator='\n')
    writer.writerows(word_list)
