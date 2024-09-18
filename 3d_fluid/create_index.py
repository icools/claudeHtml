import os
from datetime import datetime

# Get the current timestamp
timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

# Get the list of .html files in the current directory
html_files = sorted([f for f in os.listdir('.') if f.endswith('.html')])

# Ensure the 'index' directory exists
if not os.path.exists('index'):
    os.makedirs('index')

# Create the index file
index_filename = f'index/index{timestamp}.html'
with open(index_filename, 'w', encoding='utf-8') as index_file:
    index_file.write('<html><body>\n')
    for html_file in html_files:
        file_name_without_extension = os.path.splitext(html_file)[0]
        index_file.write(f'<p><a href="{html_file}">{file_name_without_extension}</a></p>\n')
    index_file.write('</body></html>')

# Replace the current index.html with the newly created index file
os.replace(index_filename, 'index.html')

print(f'Index file created and set as index.html: {index_filename}')