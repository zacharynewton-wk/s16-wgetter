#!/usr/bin/python

import sys
import os

print "This is a test Script"
print sys.argv[1]
for filename in os.listdir('.'):
    print filename
sys.stdout.flush()
