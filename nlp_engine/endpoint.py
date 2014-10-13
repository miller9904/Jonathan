import cgi
import cgitb

cgitb.enable()

print("Content-type: text/html;charset=utf-8")
print()

print("Hello World!")
form = cgi.FieldStorage()
print(form['q'].value)