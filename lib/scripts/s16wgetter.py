#!/usr/bin/python

""" 
    Section 16 filing downloader
    To Use: ./s16wgetter <optional cik list, space separated>         to see the wget commands
            or
            ./s16wgetter <optional cik list, space separated> | sh    to download the filings
	    cd to directory
	    clear out output folder
	    python s16wgetter.py <optional cik list, space separated> | sh
	    python s16wgetter.py 0001144354 | sh
"""
import sys
import os

# master.idx files from: ftp://ftp.sec.gov/edgar/full-index/<4 digit year>/QTR<1-4>/master.idx
master_idx_files = []
for filename in os.listdir(sys.argv[2]):
    master_idx_files.append(os.path.join(sys.argv[2], filename))
    
def pad_cik(cik):
    c = cik
    if len(c) < 10:
        padding = 10 - len(c)
        new_c = ''
        while padding > 0:
            new_c = new_c + "0"
            padding = padding - 1
        new_c = new_c + c
        c = new_c
    return c

import commands
for file in master_idx_files:
    f = open(file)
    lines = f.readlines()
    for line in lines:
        if len(line.split('|')) != 5:
            continue
        form_type = line.split('|')[2]
        type = form_type.replace('/A', '')
        if type != '3' and type != '4' and type != '5':
            continue

        cik = pad_cik(line.split('|')[0])
        if len(sys.argv[2:]) > 1:
            found_cik = False
            for cik_arg in sys.argv[2:]:
                if pad_cik(cik_arg) == cik:
                    found_cik = True
                    break
            if not found_cik:
                continue

        path = line.split('|')[4]
        accession_number = path.split('/')[3].replace('.txt', '').strip()
        split_path = path.split('/')
        outputDir = sys.argv[1]

        url = "www.sec.gov/%s/%s/%s/%s/edgar.xml -O %s/%s.xml" % (
        split_path[0], split_path[1], split_path[2], accession_number.replace('-', ''), outputDir, accession_number)
        print url
        # os.system(url)
        print

        url = "wget -nv https://www.sec.gov/Archives/%s/%s/%s/%s/edgar.xml -O %s/%s.xml" % (
        split_path[0], split_path[1], split_path[2], accession_number.replace('-', ''), outputDir, accession_number)
        commands.getstatusoutput(url)
        print url
        os.system(url)
        print
if f:
    f.close()
print "finished"
sys.stdout.flush()
