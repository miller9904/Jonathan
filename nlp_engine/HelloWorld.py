import cgi
import cgitb
cgitb.enable()
print("Content-type: text/html;charset=utf-8")
form = cgi.FieldStorage()
for query in form:
    print(query.value)
