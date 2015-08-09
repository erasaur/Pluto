import os
import json

writepath='emoji_processed.json'

myData = json.loads(open("emoji_pretty.json").read())


f = open("myfile.json", "w")
f.write("tryingnow\n")
f.close()
with open(writepath, 'w') as outfile:
	json.dump(myData, outfile)

